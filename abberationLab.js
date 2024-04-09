import React, { useState, useEffect} from 'react';
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
        if (inputString == "reset humanoid"){
            sethumanoidTypeStr('')
        } else if (inputString == "reset beastkin"){
            setbeastKinTypeStr('')
        } else if (inputString == "reset animal"){
            setanimalStr('')
        } else if (inputString == "reset mythic"){
            setmythicCreatureStr('')
        } else if (inputString == "reset accessory1"){
            setlabMonsterAccessoryStr('')
        } else if (inputString == "reset accessory2"){
            setlabMonsterAccessory2Str('')
        } else if (inputString == "reset extra appendage"){
            setextraAppendageStr('')
        } else if (inputString == "reset disfigurement"){
            setlostAppendageStr('')
        } else {
            console.log(`${inputString}  - caused an unknown error... nothing reset`)
        }
    };
        

    const [abberationStr, setAbberationStr] = useState('');
// humanoidTypeStr, beastKinTypeStr, animalStr, mythicCreatureStr 

    const handleCrossbreedString  = () =>{
        if (humanoidTypeStr && beastKinTypeStr && animalStr && mythicCreatureStr) {
            return `A ${animalStr} looking ${humanoidTypeStr} with ${beastKinTypeStr} features and the air of a ${mythicCreatureStr}`;
        } else if (humanoidTypeStr && beastKinTypeStr && animalStr) {
            return `${humanoidTypeStr} with ${animalStr} features and the air of a ${beastKinTypeStr}`;
        } else if (humanoidTypeStr && beastKinTypeStr && mythicCreatureStr) {
            return `${humanoidTypeStr} with ${mythicCreatureStr} features and the air of a ${beastKinTypeStr}`;
        } else if (humanoidTypeStr && animalStr && mythicCreatureStr) {
            return `${humanoidTypeStr} with ${mythicCreatureStr}-like features and ${animalStr}-like details`;
        } else if (animalStr && beastKinTypeStr && mythicCreatureStr) {
            return `${beastKinTypeStr} with ${animalStr} features and the air of a ${mythicCreatureStr}`;
        } else if (animalStr && humanoidTypeStr) {
            return `${humanoidTypeStr} with ${animalStr} features`;
        } else if (animalStr && mythicCreatureStr) {
            return `${mythicCreatureStr} crossed with a(n) ${animalStr}`;
        } else if (animalStr && beastKinTypeStr) {
            return `${beastKinTypeStr} crossed with a(n) ${animalStr}`;
        } else if (mythicCreatureStr && beastKinTypeStr) {
            return `${mythicCreatureStr} with ${beastKinTypeStr} features`;
        } else if (humanoidTypeStr && beastKinTypeStr) {
            return `Mostly ${humanoidTypeStr} with ${beastKinTypeStr}-like hints`;
        } else if (humanoidTypeStr && mythicCreatureStr) {
            return `${humanoidTypeStr}-${mythicCreatureStr} hybrid`;
        } else if (humanoidTypeStr){
            return humanoidTypeStr
        } else if (beastKinTypeStr){
            return beastKinTypeStr
        } else if (mythicCreatureStr){
            return mythicCreatureStr
        } else if (animalStr){
            return animalStr
        } 
    }
    // update abberation string whenever any of the component strings get changes
      useEffect(() => {
        setAbberationStr(handleCrossbreedString)
    }, [humanoidTypeStr, beastKinTypeStr, animalStr, mythicCreatureStr]);
  return (
      <div className='margin-20-sides'>
        <div className="lab-container">
        <p className='lab-title'> The Abberation Lab </p>
            <div className='lab-item-container'>
                <div className="textarea" >
                    <button className="sm-lab-btn" onClick={() => removeString("reset humanoid")}>X</button>
                    <button className="lab-btn" onClick={getHumanoidTypeStr}>Humanoid</button>
                    <p className="lab-single-line">{humanoidTypeStr} </p>
                </div>
                <div className="textarea" >
                    <button className="sm-lab-btn" onClick={() => removeString("reset beastkin")}>X</button>
                    <button className="lab-btn" onClick={getrandBeastTypeStr}>Beastkin</button>
                    <p className="lab-single-line">{beastKinTypeStr} </p>
                </div>
                <div className="textarea" >
                    <button className="sm-lab-btn" onClick={() => removeString("reset animal")}>X</button>
                    <button className="lab-btn" onClick={getanimalStr}>Animal</button>
                    <p className="lab-single-line">{animalStr} </p>
                </div>
                <div className="textarea" >
                    <button className="sm-lab-btn" onClick={() => removeString("reset mythic")}>X</button>
                    <button className="lab-btn" onClick={getmythicCreatureStrData}>monster</button>
                    <p className="lab-single-line">{mythicCreatureStr}</p>
                </div>
                <p id="hybrid-descriptor">
                    {abberationStr !== '' ? abberationStr : null}
                </p>
                <div className="textarea" >
                    <button className="sm-lab-btn" onClick={() => removeString("reset accessory1")}>X</button>
                    <button className="lab-btn" onClick={getlabMonsterAccessoryStrData}>Accessory1</button>
                    <p className="lab-single-line">{labMonsterAccessoryStr}</p>
                </div>
                <div className="textarea" >
                    <button className="sm-lab-btn" onClick={() => removeString("reset accessory2")}>X</button>
                    <button className="lab-btn" onClick={getlabMonsterAccessory2StrData}>Accessory2</button>
                    <p className="lab-single-line">{labMonsterAccessory2Str}</p>
                </div>
                <div className="textarea" >
                    <button className="sm-lab-btn" onClick={() => removeString("reset extra appendage")}>X</button>
                    <button className="lab-btn" onClick={getextraAppendageStrData}>Appendages</button>
                    <p className="lab-single-line">{extraAppendageStr}</p>
                </div>
                <div className="textarea" >
                    <button className="sm-lab-btn" onClick={() => removeString("reset disfigurement")}>X</button>
                    <button className="lab-btn" onClick={getLostAppendageStrData}>Disfigurements</button>
                    <p className="lab-single-line last-lab-item">{lostAppendageStr}</p>
                </div>
            </div>
        </div>
                    
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
