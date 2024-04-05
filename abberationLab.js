import React, { useState } from 'react';
import './questGen.css';
import CrTypeSlider from './crSlider'
import {  allAnimalSubArrs, monsterSubTheme, 
    allDamageTypes, 
    classicMonsterArr,
    lab_lost_appendages, lab_extra_appendages, lab_accessories,
    commonBeastmen, uncommonBeastman, rareBeastman, veryRareBeastman, 
    all_special_subraces, all_lineage_list,
    monsterTypeTheme, biomeType, biomeSubtype} from './dataArrs'

const AbberationLab = ({}) => {
    const getRandomItemSimple = (array) => {
        return array[Math.floor(Math.random() * array.length)];
      };

    const [biomeStr, setBiomeStr] = useState('');
    const getBiomeData = () => {
        let selectedBiome = getRandomItemSimple(biomeType);
        setBiomeStr(selectedBiome)
    };

    const [subBiomeStr, setsubBiomeStr] = useState('');
    const getSubBiomeData = () => {
        let selectedBiomeSubtype = getRandomItemSimple(biomeSubtype);
        setsubBiomeStr(selectedBiomeSubtype)
    };
    
    const [monPrimaryTypeStr, setmonPrimaryTypeStr] = useState('');
    const getMonPrimaryTypeStr = () => {
        let primaryType = getRandomItemSimple(monsterTypeTheme);
        let primeTypeStr = `${primaryType}`
        setmonPrimaryTypeStr(primeTypeStr)
    };
    const [monSecondaryTypeStr, setmonSecondaryTypeStr] = useState('');
    const getMonSecondaryTypeStr = () => {
        let subThemetype = getRandomItemSimple(monsterSubTheme);
        let subThemeStr = `${subThemetype}`
        setmonSecondaryTypeStr(subThemeStr)
    };
    const [monDamageTypeStr, setMonDamageTypeStr] = useState('');
    const getMonDamageTypeStr = () => {
        let dmgType = getRandomItemSimple(allDamageTypes);
        setMonDamageTypeStr(`${dmgType}`)
    };

    const [humanoidTypeStr, sethumanoidTypeStr] = useState('');
    const checkForAndGet_SpecialSubrace = (lineageString) => {
        const special_subrace_arr = ["Dragonborn", "Dwarf", "Elf", "Genasi", "Gnome", "Halfling", "Monster", "Plasmoid", "Tiefling"];
        if (special_subrace_arr.includes(lineageString)){
            let chosen_subrace_arr = all_special_subraces[lineageString]
            let chosen_sub_lineage = getRandomItemSimple(chosen_subrace_arr)
            return chosen_sub_lineage
        } else {
            return lineageString
        };
    }
    const getHumanoidTypeStr = () => {
        let humanoidLineage = getRandomItemSimple(all_lineage_list);
        let checkedLineageString = checkForAndGet_SpecialSubrace(humanoidLineage)
        let lineageOutputString = `${checkedLineageString}`
        sethumanoidTypeStr(lineageOutputString)
    };

    const getBeastKinArrAtSetRarities = () => {
        const d100Roll = Math.random() * 100; // Generate a random number between 0 and 100
// 40, 30, 20, 10 at current ratio splitup
        if (d100Roll < 40) {
            return commonBeastmen
        } else if (d100Roll < 70) {
            return uncommonBeastman
        } else if (d100Roll < 90) {
            return rareBeastman
        }else { 
            return veryRareBeastman
        }
        };
    const [beastKinTypeStr, setbeastKinTypeStr] = useState('');
    const getrandBeastTypeStr = () => {
        let beastkinRarityArr = getBeastKinArrAtSetRarities();
        let chosenItemFromRarityArr = getRandomItemSimple(beastkinRarityArr);
        let chosenBeastkinStr = `${chosenItemFromRarityArr}`;
        setbeastKinTypeStr(chosenBeastkinStr);
    };

    const [animalStr, setanimalStr] = useState('');
    const getanimalStr = () => {
        let randBeastArr = getRandomItemSimple(allAnimalSubArrs);
        let randAnimal = getRandomItemSimple(randBeastArr)
        let chosenAnimalStr = `${randAnimal}`;
        setanimalStr(chosenAnimalStr);
    };

//  --------------------------------

    // lab_lost_appendages, lab_extra_appendages, lab_accessories,
    const [labMonsterAccessoryStr, setlabMonsterAccessoryStr] = useState('');
    const getlabMonsterAccessoryStrData = () => {
        let selectedlabMonsterAccessoryStr = getRandomItemSimple(lab_accessories);
        let labMonsterAccessoryStr = `${selectedlabMonsterAccessoryStr}`
        setlabMonsterAccessoryStr(labMonsterAccessoryStr)
    };
    const [labMonsterAccessory2Str, setlabMonsterAccessory2Str] = useState('');
    const getlabMonsterAccessory2StrData = () => {
        let selectedlabMonsterAccessory2Str = getRandomItemSimple(lab_accessories);
        let labMonsterAccessory2Str = `${selectedlabMonsterAccessory2Str}`
        setlabMonsterAccessory2Str(labMonsterAccessory2Str)
    };
    const [extraAppendageStr, setextraAppendageStr] = useState('');
    const getextraAppendageStrData = () => {
        let selectedExtraAppendageStr = getRandomItemSimple(lab_extra_appendages);
        let extraAppendageStr = `${selectedExtraAppendageStr}`
        setextraAppendageStr(extraAppendageStr)
    };
    const [lostAppendageStr, setlostAppendageStr] = useState('');
    const getLostAppendageStrData = () => {
        let selectedLostAppendageStr = getRandomItemSimple(lab_lost_appendages);
        let lostAppendageStr = `${selectedLostAppendageStr}`
        setlostAppendageStr(lostAppendageStr)
    };
    const [mythicCreatureStr, setmythicCreatureStr] = useState('');
    const getmythicCreatureStrData = () => {
        let selectedmythicCreatureStr = getRandomItemSimple(classicMonsterArr);
        let mythicCreatureStr = `${selectedmythicCreatureStr}`
        setmythicCreatureStr(mythicCreatureStr)
    };
//  --------------------- TEMPLATE -------------------------------------------
    // const [monDamageTypeStr, setMonDamageTypeStr] = useState('');
    // const getMonDamageTypeStr = () => {
    //     let dmgType = getRandomItemSimple(allDamageTypes);
    //     setMonDamageTypeStr(`${dmgType}`)
    // };
    //  -------------------------------------------------------------------------------
    const removeString = (inputString) => {
        if (inputString == "humanoidTypeStr"){

        } else if (inputString == "beastKinTypeStr"){
            setbeastKinTypeStr('')
        } else if (inputString == "animalStr"){
            setanimalStr('')
        } else if (inputString == "mythicCreatureStr"){
            setmythicCreatureStr('')
        } else if (inputString == "labMonsterAccessoryStr"){
            setlabMonsterAccessoryStr('')
        } else if (inputString == "labMonsterAccessory2Str"){
            setlabMonsterAccessory2Str('')
        } else if (inputString == "extraAppendageStr"){
            setextraAppendageStr('')
        } else {
            console.log(`${inputString}  - caused an unknown error... nothing reset`)
        }
    };
        




  return (
      <div className='margin-20-sides'>
        <div className="lab-container">
        <p className='lab-title'> The Abberation Lab </p>
            <div className='lab-item-container'>
                <div className="textarea" >
                    <button className="sm-lab-btn">X</button>
                    <button className="lab-btn" onClick={getHumanoidTypeStr}>Humanoid</button>
                    <p className="lab-single-line">{humanoidTypeStr} </p>
                </div>
                <div className="textarea" >
                    <button className="sm-lab-btn">X</button>
                    <button className="lab-btn" onClick={getrandBeastTypeStr}>Beastkin</button>
                    <p className="lab-single-line">{beastKinTypeStr} </p>
                </div>
                <div className="textarea" >
                    <button className="sm-lab-btn">X</button>
                    <button className="lab-btn" onClick={getanimalStr}>Animal</button>
                    <p className="lab-single-line">{animalStr} </p>
                </div>
                <div className="textarea" >
                    <button className="sm-lab-btn">X</button>
                    <button className="lab-btn" onClick={getmythicCreatureStrData}>monster</button>
                    <p className="lab-single-line">{mythicCreatureStr}</p>
                </div>
                <div className="textarea" >
                    <button className="lab-btn" onClick={getlabMonsterAccessoryStrData}>Accessory1</button>
                    <p className="lab-single-line">{labMonsterAccessoryStr}</p>
                </div>
                <div className="textarea" >
                    <button className="lab-btn" onClick={getlabMonsterAccessory2StrData}>Accessory2</button>
                    <p className="lab-single-line">{labMonsterAccessory2Str}</p>
                </div>
                <div className="textarea" >
                    <button className="lab-btn" onClick={getextraAppendageStrData}>Appendages</button>
                    <p className="lab-single-line">{extraAppendageStr}</p>
                </div>
                <div className="textarea" >
                    <button className="lab-btn" onClick={getLostAppendageStrData}>Disfigurements</button>
                    <p className="lab-single-line last-lab-item">{lostAppendageStr}</p>
                </div>
            </div>
        </div>

{/* .............................................................. */}
        <hr></hr>
        <div className="textarea" >
            <button className="gen-btn button" onClick={getMonPrimaryTypeStr}>MonType</button>
            <textarea className="gen-single-line" readOnly value={monPrimaryTypeStr} />
        </div>
        <div className="textarea" >
            <button className="gen-btn button" onClick={getMonSecondaryTypeStr}>SubTheme</button>
            <textarea className="gen-single-line" readOnly value={monSecondaryTypeStr} />
        </div>
        <div className="textarea" >
            <button className="gen-btn button" onClick={getMonDamageTypeStr}>DamType</button>
            <textarea className="gen-single-line" readOnly value={monDamageTypeStr} />
        </div>
        <div className="bottom-container">
          <div className="textarea" >
            <button className="gen-btn button" onClick={getBiomeData}>biome</button>
            <textarea className="gen-single-line" readOnly value={biomeStr} />
          </div>
          <div className="textarea" >
            <button className="gen-btn button" onClick={getSubBiomeData}>subBiome</button>
            <textarea className="gen-single-line" readOnly value={subBiomeStr} />
          </div>
        </div>
      </div>
    );
};
export default AbberationLab;


// list of mundane objects for mideval setting like burlap sacks, pots, and barrels
