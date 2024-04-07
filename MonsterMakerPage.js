import React, { useState, useEffect } from 'react';
import './questGen.css';
import CrTypeSlider from './crSlider'
import {  allAnimalSubArrs, monsterSubTheme, 
    allDamageTypes, 
    crStatsDictionary, classicMonsterArr,
    lab_lost_appendages, lab_extra_appendages, lab_accessories,
    commonBeastmen, uncommonBeastman, rareBeastman, veryRareBeastman, 
    all_special_subraces, all_lineage_list,
    monsterTypeTheme, biomeType, biomeSubtype} from './dataArrs'
import { hazard_modifier, hazard_types, 
    minor_debuff_modifier, major_debuff_modifier, 
    all_or_nothing_modifier, centered_on_self, distance_dam_mod, 
    main_target_half_burst_mod, radius_dam_mod, cone_ranges, cone_dam_mod,
    misc_aoe_modifier, aoe_radius_ranges, hit_and_burst_aoe_ranges,
    other_boost_200, other_boost_15, other_boost_125, 
    distances_arr, line_dam_mod,line_dam_types,all_aoe_types,
    major_debilitations, minor_debilitations } from './damageArrays'

const MonMaker = ({}) => {
//     const getWinAtInputPercentage = (threshold) => {
//         const d100Roll = Math.random() * 100; // Generate a random number between 0 and 100
//         if (d100Roll < threshold) {
//             return "Win"
// // Kept at 95 so there is always a flat 5% "critical" chance of getting a classic monster from the special monster form, covered in the "else" catchall 
// // Thus, we only have to change the beast threshold, and the remainder of % before 95 becomes 
//         } else {
//             return "Lose"
//         }
//         };
    const getRandomItemSimple = (array) => {
        return array[Math.floor(Math.random() * array.length)];
        };
    const getNumOfRandItems = (num, inputArr) => {
            // Shuffle the array (Fisher-Yates shuffle algorithm)
            for (let i = inputArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [inputArr[i], inputArr[j]] = [inputArr[j], inputArr[i]];
            }
            // Select the first Num elements of the shuffled arr, which are now randomized in order
            const randomNItems = inputArr.slice(0, num);
            return randomNItems;
        };
//  --------------------------------
const getCRLabel = (value) => {
    const specialCases = {
        1:"1/8",
        2:"1/4",
        3:"1/2",
        4:"1",
        5:"2",
        6:"3",
        7:"4",
        8:"5",
        9:"6",
        10:"7",
        11:"8",
        12:"9",
        13:"10",
        14:"11",
        15:"12",
        16:"13",
        17:"14",
        18:"15",
        19:"16",
        20:"17",
        21:"18",
        22:"19",
        23:"20"
    };
return specialCases[value];
};

    const [crValue, setCRValue] = useState(1);
    const [convertedVal, setConvertedVal] = useState(getCRLabel(4));
    // const [valueOfBalanceACandHP, setValueOfBalanceACandHP] = useState(0);
    // const [statAvgArray, setStatAvgArray] = useState([]);

    const handleCRSliderChange = (newValue) => {
        let newConvertedVal = getCRLabel(newValue);
        setCRValue(convertedVal);
        setConvertedVal(newConvertedVal);
    };

    const [avgAC, setavgAC] = useState(null);
    const [avgHP, setavgHP] = useState(null);
    const [avgAtk, setavgAtk] = useState(null);
    const [avgDPR, setavgDPR] = useState(null);
    // const [avgDC, setavgDC] = useState(null);
    // const [avgSAV, setavgSAV] = useState(null);

    const getstatAvgAtCR = () => {
        let outputArray = [];
        let crStatArr = crStatsDictionary[convertedVal];
        if (crStatArr) {
            for (let i = 0; i < crStatArr.length; i++) {
                outputArray.push(crStatArr[i]);
            }  
        } else {
          console.log("CR value not found in dictionary");
        }
        return outputArray;
      };
    const getAvgStatDisplayString = () => {
        let rawNumArr = getstatAvgAtCR()
        let strOutArr = []
        for (let i = 0; i < rawNumArr.length; i++) {
            if (i === 0) {
                strOutArr.push(`CR: ${rawNumArr[i]}`);;
            } else if (i === 1) {
                strOutArr.push(`AC: ${rawNumArr[i]}`);
            } else if (i === 2) {
                strOutArr.push(`HP: ${rawNumArr[i]}`);
            } else if (i === 3) {
                strOutArr.push(`Atk+ ${rawNumArr[i]}`);
            } else if (i === 4) {
                strOutArr.push(`DPR: ${rawNumArr[i]}`);
            } else if (i === 5) {
                strOutArr.push(`DC: ${rawNumArr[i]}`);
            } else if (i === 6) {
                strOutArr.push(`Save: ${rawNumArr[i]}`);
            } else {
                strOutArr.push(`Unexpected juice added to the squeeze`);
            }
        }  
        return strOutArr
    };
// .........................................................................................................
    let outputCRIntsArray = getstatAvgAtCR();
    // let acModSliderArr = [0.95, 0.75, 0.66, 0.50, 0.40, 0.33, 0.25, 0.20, 0, -0.20, -0.25, -0.33, -0.40, -0.50, -0.66, -0.75, -0.95];
    let acModSliderArr = [0.95, 0.75, 0.66, 0.45, 0.33, 0.25, 0.20, 0, -0.20, -0.25, -0.33, -0.45, -0.66, -0.75, -0.95];
    
    const [selectedACModSliderValue, setselectedACModSliderValue] = useState(8);
    const [acModIndex, setacModIndex] = useState(0);
    const [hpModFloat, sethpModFloat] = useState(0);

      // Function to handle slider change
    const handleACModSliderChange = (event) => {
        event.persist(); // Persist the event object
        setselectedACModSliderValue(parseInt(event.target.value));
        sethpModFloat(acModSliderArr[parseInt(event.target.value) - 1]);
        setacModIndex(parseInt(event.target.value) - 8)
    };

//  ----------------------------------------------------------------------------------------------------------------

    const [sliderAtkMod, setSliderAtkMod] = useState(8);
    const [accuracyAdjustedDPR, setAccuracyAdjustedDPR] = useState(0);
    const [finalAccMod, setFinalAccMod] = useState(0);

    const getDiceSplatFromDamage = avgDam => {
        const validDice = ["d4", "d6", "d8", "d10", "d12"];
        const validDiceDict = {
            "d4": 2.5,
            "d6": 3.5,
            "d8": 4.5,
            "d10": 5.5,
            "d12": 6.5
        };
        const allDiceOutArr = [];
        validDice.forEach(dieValStr => {
            const dieValInt = validDiceDict[dieValStr];
            const numDice = Math.floor(avgDam / dieValInt);
            const remainder = Math.floor(avgDam % dieValInt);
            const result = `${numDice}${dieValStr}+${remainder}`;
            allDiceOutArr.push(result);
        });
        return allDiceOutArr;
    };
    const adjustDamFromModifier = atkModNum => {
        const firstNumber = 0.18;
        const growthRatio = 1.4;
        const decimalAtModifierVal = firstNumber * (growthRatio ** (atkModNum - 1));
        const roundedDecimal = decimalAtModifierVal.toFixed(3);
        return parseFloat(roundedDecimal); // Convert string to float
    };
    const getDPRandCleanAccMod = (atkModNum, damAvg) => {
        // subtract 8 to get the modification from slider input
        // let adjusted_atk_mod = (atkModNum - 8)
        
        let subtracted_atkMod = (atkModNum - 8)
        if (subtracted_atkMod == 0) {
            return [0, damAvg]
            // return getDiceSplatFromDamage(damAvg);
        } else if (subtracted_atkMod > 0) {
            // if 
            const accModFinal = (-1)*subtracted_atkMod
            let adjustedDamFloat = adjustDamFromModifier(subtracted_atkMod);
            const testDam = Math.round((1 + adjustedDamFloat) * damAvg, 3);
            return [accModFinal, testDam]
            // console.log(`${accModFinal} ACC DAM/Round average: ${testDam}`);
            // const arrAtTest = getDiceSplatFromDamage(testDam);
            // return arrAtTest;
        } else {
            let adjustedAtkMod = ((-1) * atkModNum) + 8 
            console.log(`atk mod num: ${adjustedAtkMod} `)
            let adjustedDamFloat = adjustDamFromModifier(adjustedAtkMod);
            console.log(`floatMod ${adjustedDamFloat} ---- ${1 -(adjustedDamFloat * damAvg)}???`)
            const avg_damage = Math.round(damAvg + (1 -(adjustedDamFloat * damAvg)), 3)
            return [adjustedAtkMod, avg_damage]
        };

    };
    const handlesliderAtkModChange = (event) => {
        event.persist(); // Persist the event object
        // subtract by 8 to get 0 at the middle of the slider
        setSliderAtkMod(parseInt(event.target.value));
        let accAndModdedDPRArray = getDPRandCleanAccMod(parseInt(event.target.value), avgDPR)
        let finalizedAccuracyMod = accAndModdedDPRArray[0];
        setFinalAccMod(finalizedAccuracyMod);
        let finalModdedDPR = accAndModdedDPRArray[1];
        setAccuracyAdjustedDPR(finalModdedDPR);
    };

    const [inputDPRText, setinputDPRText] = useState(0);
    const [dprDiceSplat, setDprDiceSplat] = useState([]);
    // Step 2: Create an event handler to update the state when the input changes
    const handleDPRDiceInputChange = event => {
        const { value } = event.target;
        // Validate if the input is a valid float number
        if (!isNaN(value) || value === 0) {
            setinputDPRText(value);
            setDprDiceSplat(getDiceSplatFromDamage(value));
        }
    };

    useEffect(() => {
        // Update the items if it has any length (and thus isn't null)
        if (outputCRIntsArray.length > 1) {
            setavgAC(outputCRIntsArray[1]);
            setavgHP(outputCRIntsArray[2]);
            setavgAtk(outputCRIntsArray[3]);
            setavgDPR(outputCRIntsArray[4]);
            // setavgDC(outputCRIntsArray[5]);
            // setavgSAV(outputCRIntsArray[6]);
            // ............ also update values in atk mod slider area if CR changes
                //  de-convert the final accuracy back into the slid
            let accAndModdedDPRArray = getDPRandCleanAccMod(sliderAtkMod, avgDPR)
            let finalizedAccuracyMod = accAndModdedDPRArray[0];
            setFinalAccMod(finalizedAccuracyMod);
            let finalModdedDPR = accAndModdedDPRArray[1];
            setAccuracyAdjustedDPR(finalModdedDPR);
        }
    }, [outputCRIntsArray]);

    // const getDiceOfNSides = (inputNum) => {
    //         // Math.random() generates a random floating-point number between 0 (inclusive) and 1 (exclusive)
    //         // Multiply it by, for example, 6 to get a number between 0 (inclusive) and 6 (exclusive)
    //         // Add 1 to shift the range to 1 (inclusive) to 7 (exclusive)
    //         // Use Math.floor() to round down to the nearest integer
    //         return Math.floor(Math.random() * inputNum) + 1;
    // };
    // const genOfficialLootViaCR  = (inputCR) =>{
    //     if (inputCR < 5) { // for CR 1 to 4 ...
    //         let totalOutputArr = []
    //         let randomCoinNumbers = []; // Array to store random numbers
    //         let sum = 0; // Variable to store the sum
            
    //         // Roll a d6 for each CR level, so CR2 monster gets 2d6
    //         for (let i = 0; i < inputCR; i++) {
    // //  1d6 * 5 gold per CR level
    //             let d6coins = getDiceOfNSides(6);
    //             randomCoinNumbers.push(d6coins);
    //             sum += (d6coins * 5);
    //         }
    //         totalOutputArr.push(sum)
    // // 10% for common potion
    //         let potionRoll1 = getDiceOfNSides(10);
    //         if (potionRoll1 == 10){
    //             totalOutputArr.push("common potion")
    //         }
    //         let scrollRoll1 = getDiceOfNSides(10);
    //         if (scrollRoll1 == 10){
    //             totalOutputArr.push("common scroll")
    //         } 
    //         return totalOutputArr
    //     } else if (inputCR < 9) { //
    //         let totalOutputArr = []
    //         let randomCoinNumbers = []; 
    //         let sum = 0; 
            
    //         // Roll a d6 for each CR level, so CR2 monster gets 2d6
    //         for (let i = 0; i < inputCR; i++) {
    // //  1d6 * 5 gold per CR level
    //             let d6coins = getDiceOfNSides(6);
    //             randomCoinNumbers.push(d6coins);
    //             sum += (d6coins * 5);
    //         totalOutputArr.push(sum)
    //         }
    // // 10% for common potion
    //         let potionRoll1 = getDiceOfNSides(10);
    //         if (potionRoll1 == 10){
    //             totalOutputArr.push("common potion")
    //         }
    //         let scrollRoll1 = getDiceOfNSides(10);
    //         if (scrollRoll1 == 10){
    //             totalOutputArr.push("common scroll")
    //         }
    //         return totalOutputArr
    //     }

    //     // else, assume the CR is like 1
    // };

    const revisedCrTierLootValues = {
        // [DAM average, DC, to-hit modifier]     
            1:[3.5, 13, 4, 10],
            2:[5.5, 13, 5, 25], // cantrip level
            3:[8, 14, 5, 35],
            4:[11, 14, 6, 50], // spell lvl 1
            5:[13.5, 15, 6, 125],
            6:[16.5, 15, 6, 250], // spell lvl 2
            7:[24.5, 16, 7, 550],
            8:[27.5, 16, 7, 1000], // spell lvl 3
            9:[30, 17, 8, 2000],
            10:[33, 17, 8, 3500], // spell lvl 4
            11:[38, 17, 9, 5000],
            12:[44, 17, 9, 7500], // spell lvl 5
            13:[49, 18, 9, 12000],
            14:[55, 18, 9, 18000], // spell lvl 6
            15:[58, 18, 10, 30000],
            16:[60.5, 18, 10, 47000], // spell lvl 7
            17:[62, 19, 10, 70000],
            18:[66, 19, 10, 110000], // spell lvl 8
            19:[74, 20, 10, 175000],
            20:[82.5, 20, 11, 300000] // spell lvl 9
      }
    
      const [sliderValue, setSliderValue] = useState(1);
      const handleGoldSliderChange = (event) => {
        setSliderValue(parseInt(event.target.value));
      };
    
      const lootValueArr = revisedCrTierLootValues[sliderValue];
      const goldValAtCR = lootValueArr[lootValueArr.length-1]
      const goldValCutHalf = lootValueArr ? (goldValAtCR * .5) : null;
      const goldValCutQuarter = lootValueArr ? (goldValAtCR * .75) : null;
      const goldValPlusQuarter = lootValueArr ? (goldValAtCR * 1.25) : null;
      const goldValPlusHalf = lootValueArr ? (goldValAtCR * 1.5) : null;
    
      const damPool = inputDPRText

      //  This handles the parent drop-down within which the other aoe types are found
      const [selectedaoe, setSelectedaoe] = useState('Awaiting selection');
      const aoeTypeParentDropdownChangeHandler = (event) => {
        setSelectedaoe(event.target.value);
      };

      const [selectedRange, setSelectedRange] = useState('Awaiting selection');
      const [rangeMod, setRangeMod] = useState(null);
      const rangeDropdownChangeHandler = (event) => {
        setSelectedRange(event.target.value);
        setRangeMod(distance_dam_mod[event.target.value])
      };
      const rangeAdjustedDAM = (rangeMod * damPool).toFixed(1)
    
      const [selectedLine, setSelectedLine] = useState('Awaiting selection');
      const [lineMod, setLineMod] = useState(null);
      const lineDropdownChangeHandler = (event) => {
        setSelectedLine(event.target.value);
        setLineMod(line_dam_mod[event.target.value])
      };
      const lineAdjustedDAM = (lineMod*damPool).toFixed(1)

      const [selectedCone, setSelectedCone] = useState('Awaiting selection');
      const [coneMod, setConeMod] = useState(null);
      const coneDropdownChangeHandler = (event) => {
        setSelectedCone(event.target.value);
        setConeMod(cone_dam_mod[event.target.value])
      };
      const coneAdjustedDAM = (coneMod*damPool).toFixed(1)

      const [selectedRadius, setSelectedRadius] = useState('Awaiting selection');
      const [radiusMod, setRadiusMod] = useState(null);
      const radiusDropdownChangeHandler = (event) => {
        setSelectedRadius(event.target.value);
        setRadiusMod(radius_dam_mod[event.target.value])
      };
      const radiusAdjustedDAM = (radiusMod*damPool).toFixed(1)

      const [selectedHitNBurst, setSelectedHitNBurst] = useState('Awaiting selection');
      const [hitNBurstMod, setHitNBurstMod] = useState(null);
      const hitNBurstDropdownChangeHandler = (event) => {
        setSelectedHitNBurst(event.target.value);
        setHitNBurstMod(main_target_half_burst_mod[event.target.value])
      };
      const hitNBurstAdjustedDAM = (hitNBurstMod*damPool).toFixed(1)
  
    const aoeTypeParentDropdownsMap = {
        "distant hit and half burst":(
          <div style={{ display: 'flex' }}>
          <h2>Hit'N Burst</h2>
          <select style={{ borderRadius:'5px', margin:'auto 10px', height: '40px' }} onChange={hitNBurstDropdownChangeHandler}>
            <option  value="n/a">N/A</option>
            {hit_and_burst_aoe_ranges.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}
          </select>
          {selectedHitNBurst && (
            <p style={{ color: 'gold' }}>
              {selectedHitNBurst === 'Awaiting selection' ? 
              'Awaiting selection' : 
              `DAM*${hitNBurstMod} = ${(hitNBurstAdjustedDAM)}`
              }
            </p>
          )}
        </div>
          ),
        "radius":(
          <div style={{ display: 'flex' }}>
            <h2>Radius selection</h2>
            <select style={{ borderRadius:'5px', margin:'auto 10px', height: '40px' }} onChange={radiusDropdownChangeHandler}>
              <option  value="n/a">N/A</option>
              {aoe_radius_ranges.map((item, index) => (
                <option key={index} value={item}>{item}</option>
              ))}
            </select>
            {selectedRadius && (
              <p style={{ color: 'gold' }}>
                {selectedRadius === 'Awaiting selection' ? 
                'Awaiting selection' : 
                `DAM*${radiusMod} = ${(radiusAdjustedDAM)}`
                }
              </p>
            )}
        </div>
        ),
        "single-target":(
            <div style={{ display: 'flex' }}>
            <h2>Range selection</h2>
            <select style={{ borderRadius:'5px', margin:'auto 10px', height: '40px' }} onChange={rangeDropdownChangeHandler}>
              <option  value="n/a">N/A</option>
              {distances_arr.map((item, index) => (
                <option key={index} value={item}>{item}</option>
              ))}
            </select>
            {selectedRange && (
              <p style={{ color: 'gold' }}>
                {selectedRange === 'Awaiting selection' ? 
                'Awaiting selection' : 
                `DAM*${rangeMod} = ${(rangeAdjustedDAM)}`
                // You selected {selectedRange} / DAM*{rangeMod} = { (rangeMod*damPool).toFixed(1)}
                }
              </p>
            )}
        </div>
        ),
        "cone":(
          <div style={{ display: 'flex' }}>
            <h2>Cone Dist. Selection</h2>
            <select style={{ borderRadius:'5px', margin:'auto 10px', height: '40px' }} onChange={coneDropdownChangeHandler}>
              <option  value="n/a">N/A</option>
              {cone_ranges.map((item, index) => (
                <option key={index} value={item}>{item}</option>
              ))}
            </select>
            {selectedCone && (
              <p style={{ color: 'gold' }}>
                {selectedCone === 'Awaiting selection' ? 
                'Awaiting selection' : 
                `DAM*${coneMod} = ${(coneAdjustedDAM)}`
                }
              </p>
            )}
          </div>
          ),
        "hazard":(
            <div style={{ display: 'flex' }}>
            <h2>HaZaRd NYI</h2>
        <select>
            <option value="optionAlpha">Option Alpha</option>
            <option value="optionBeta">Option Beta</option>
            <option value="optionGamma">Option Gamma</option>
          </select>
          </div>
          ),
        "line":(
        <div style={{ display: 'flex' }}>
            <h2>Line selection</h2>
            <select style={{ borderRadius:'5px', margin:'auto 10px', height: '40px' }} onChange={lineDropdownChangeHandler}>
              <option  value="n/a">N/A</option>
              {line_dam_types.map((item, index) => (
                <option key={index} value={item}>{item}</option>
              ))}
            </select>
            {selectedLine && (
              <p style={{ color: 'gold' }}>
                {selectedLine === 'Awaiting selection' ? 
                'Awaiting selection' : 
                `DAM*${lineMod} = ${(lineAdjustedDAM)}`
                }
              </p>
            )}
        </div>
          ),
        "self-centered burst":(
            <div style={{ display: 'flex' }}>
                <h2>-- NYI selfBurst NYI -- </h2>
            <select>
                <option value="optionAlpha">NYI COMING SOON</option>
                <option value="optionBeta">NYI COMING SOON</option>
                <option value="optionGamma">NYI COMING SOON</option>
              </select>
              </div>
              ),
        "other":(
        <div style={{ display: 'flex' }}>
            <h2>other stuff NYI too</h2>
          <select>
            <option value="optionAlpha">Option Alpha</option>
            <option value="optionBeta">Option Beta</option>
            <option value="optionGamma">Option Gamma</option>
          </select>
          </div>
          )
        }

    






















  return (
      <div className='margin-20-sides'>
        <div>
            <p id='mon-calculator-header'> Monster Stats Calculator </p>
        </div>


        <div style={{ display: 'flex' }}>
            <h2 className='header-type-1'>Range <br></br>
            select:</h2>
            <select style={{ borderRadius:'5px', margin:'auto 10px', height: '40px' }} onChange={aoeTypeParentDropdownChangeHandler}>
                <option  value="n/a">N/A</option>
                {all_aoe_types.map((item, index) => (
                <option key={index} value={item}>{item}</option>
                ))}
            </select>
            {<p style={{ color: 'gold' }}>
                {selectedaoe === 'Awaiting selection' ? 
                'Awaiting selection' : aoeTypeParentDropdownsMap[selectedaoe]
                }
            </p>
            }
        </div>

      <div style={{ display: 'flex' }}>
      <h2>Range selection</h2>
      <select style={{ borderRadius:'5px', margin:'auto 10px', height: '40px' }} onChange={rangeDropdownChangeHandler}>
        <option  value="n/a">N/A</option>
        {distances_arr.map((item, index) => (
          <option key={index} value={item}>{item}</option>
        ))}
      </select>
      {selectedRange && (
        <p style={{ color: 'gold' }}>
          {selectedRange === 'Awaiting selection' ? 
          'Awaiting selection' : 
          `${selectedRange} -- DAM*${rangeMod} = ${(rangeAdjustedDAM)}`
          // You selected {selectedRange} / DAM*{rangeMod} = { (rangeMod*damPool).toFixed(1)}
          }
        </p>
      )}
      </div>
      
      <div style={{ display: 'flex' }}>
      <h2>Line selection</h2>
      <select style={{ borderRadius:'5px', margin:'auto 10px', height: '40px' }} onChange={lineDropdownChangeHandler}>
        <option  value="n/a">N/A</option>
        {line_dam_types.map((item, index) => (
          <option key={index} value={item}>{item}</option>
        ))}
      </select>
      {selectedLine && (
        <p style={{ color: 'gold' }}>
          {selectedLine === 'Awaiting selection' ? 
          'Awaiting selection' : 
          `${selectedLine} -- DAM*${lineMod} = ${(lineAdjustedDAM)}`
          }
        </p>
      )}
      </div>
        <div>
          <div 
          className='atk-mod-slider'
          // style={{width: '280px', margin:'5px 0', backgroundImage: 'linear-gradient(45deg, #171392 50%, #c64251)', borderRadius:'5px' }}
          >
            <label 
            htmlFor="sliderAtkMod" 
            className='widget-label-cyan'
            // style={{padding:'0px 5px 3px 5px', borderRadius:'5px' , backgroundColor: 'black', color: 'cyan' }}
            > 
                Attack Modifier: 
            </label>
            <input
                    type="range"
                    id="sliderAtkMod"
                    name="sliderAtkMod"
                    min="1"
                    max="15"
                    step="1"
                    value={sliderAtkMod}
                    onChange={handlesliderAtkModChange}
                />
            </div>
        </div>
        <p className='info-line-1'>
            ATK mod : {finalAccMod} new DPR {accuracyAdjustedDPR}
        </p>
        <input
                type="text"
                id="floatInput"
                // calculator text area entry number
                value={inputDPRText}
                onChange={handleDPRDiceInputChange}
        />
        <p className='info-line-1' style={{margin:'3px 0', width:'240px'}}>
            For a Damage Average of {} ...
        </p>
        <p className='info-line-1' style={{padding:'0 0 2px 40px'}}> 
            dice arr = {dprDiceSplat.join(" | ")}
        </p>
        <div>
            <div className='hp-balancer-div'
            // style={{width: '295px', margin:'5px 0',borderRadius:'5px', backgroundImage: 'linear-gradient(105deg, #fac 40%, black)' }}
            >
            <label className='widget-label-cyan'
            htmlFor="selectedACModSliderValue" 
            // style={{padding:'0px 5px 3px 5px', borderRadius:'5px' , backgroundColor: 'black', color: 'cyan' }}
            > HP / AC Balancer
            </label>
            <input
                type="range"
                min="1"
                max="15"
                step="1"
                value={selectedACModSliderValue}
                onChange={handleACModSliderChange}
            />
            </div>
        {/* Math logic works! Arithmatic is done in-line here! */} 
            <p className='info-line-1' style={{textAlign:'center', margin:'3px 0 0 0', width:'230px'}}>
            MOD: {acModIndex} AC ; HP x {hpModFloat}
            </p>
            <p className='info-line-1' style={{textAlign:'center', margin:'3px 0', width:'230px'}}>
            Result AC {avgAC + acModIndex} | 
            HP: {avgHP + (Math.ceil(avgHP*hpModFloat))} 
            </p>
            
        </div>
        <CrTypeSlider onSliderChange={handleCRSliderChange} />
        <p className='info-line-1' style={{width:'230px', textAlign:'center', borderTop:'2px solid gold', borderRadius:'0'}}>
            AVG Stats for {getAvgStatDisplayString()[0]} 
        </p>
        <p className='info-line-1' style={{ borderTop:'2px solid gold', borderBottom:'2px solid gold', borderRadius:'0'}}>
        {getAvgStatDisplayString().slice(1).join(" | ")}
        </p>
{/* big, important results area */}
        <p className='info-line-2' style={{borderBottom:'2px solid gold', borderRadius:'0'}}>
        AC: {avgAC + acModIndex} | 
        HP: {avgHP + (Math.ceil(avgHP*hpModFloat))} | 
        Atk+ {getstatAvgAtCR()[3] + finalAccMod} |
        DPR {accuracyAdjustedDPR}        
        </p>
        <p className='info-line-2' style={{borderRadius:'0', textAlign:'center', margin:'0 0 4px 0', width:'230px'}}>
        modded results above
        </p>








        {/*
        <div className="bottom-container">
          <div className="textarea" >
            <button className="gen-btn button" onClick={getBiomeData}>biome</button>
            <textarea className="gen-single-line" readOnly value={biomeStr} />
          </div>
          <div className="textarea" >
            <button className="gen-btn button" onClick={getSubBiomeData}>subBiome</button>
            <textarea className="gen-single-line" readOnly value={subBiomeStr} />
          </div>
          <div className="textarea" >
            <button className="gen-btn button" onClick={getMonPrimaryTypeStr}>Type</button>
            <textarea className="gen-single-line" readOnly value={monPrimaryTypeStr} />
          </div>
          <div className="textarea" >
            <button className="gen-btn button" onClick={getMonSecondaryTypeStr}>SubType</button>
            <textarea className="gen-single-line" readOnly value={monSecondaryTypeStr} />
          </div>
           <p>Round-robin in terms of equal generation</p> 
          <div className="textarea" >
            <button className="gen-btn button" onClick={getHumanoidTypeStr}>Humanoid</button>
            <textarea className="gen-single-line" readOnly value={humanoidTypeStr} />
          </div>
          <div className="textarea" >
            <button className="gen-btn button" onClick={getrandBeastTypeStr}>Beastkin</button>
            <textarea className="gen-single-line" readOnly value={beastKinTypeStr} />
          </div>
          <div className="textarea" >
            <button className="gen-btn button" onClick={getanimalStr}>Animal</button>
            <textarea className="gen-single-line" readOnly value={animalStr} />
          </div>
        </div>
        */}
      </div>
    );
};
export default MonMaker;
