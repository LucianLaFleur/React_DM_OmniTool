import React, { useState } from 'react';
import './questGen.css';
import {  questGoalStrings, validMapGridLocations,
  fetchQuests, missingPersonsArr, mcGuffinArray, battleSetpieces, pointDefenseGoals,
  monsterTypeTheme, biomeType, biomeSubtype, weatherConditions, enemyConfiguration} from './dataArrs'

const Page1 = ({genGoal, genEnemy, genBiome, genWeather}) => {

  const [biomeStr, setBiomeStr] = useState('');
  const [goalStr, setgoalStr] = useState('');
  const [chosenWeatherStr, setWeatherStr] = useState('');
  const [enemyStr, setenemyStr] = useState('');
  // const [selected, set] = useState([]);
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
  const handleQuestType = () => {
    let givenGoal = getRandomItemSimple(questGoalStrings)
    let outputGoalString = 'NYI'
    if (givenGoal == "Rescue/retrieval mission"){
      let fetchQuestType = getRandomItemSimple(fetchQuests)
      if (fetchQuestType == "Find missing person") {
        outputGoalString = getRandomItemSimple(missingPersonsArr)
      } else if (fetchQuestType == "Missing McGuffin"){
        outputGoalString = getRandomItemSimple(mcGuffinArray)
      }
    } else if (givenGoal == "Setpiece Battle"){
      outputGoalString = getRandomItemSimple(battleSetpieces)
    }else if (givenGoal == "Defend a point"){
      outputGoalString = getRandomItemSimple(pointDefenseGoals)
    }
    return outputGoalString
  };

  const getGoalString = () => {
    let questGoal = handleQuestType();
    let goalstring = `Goal: ${questGoal}`
    setgoalStr(goalstring)
    genGoal(goalstring)
  }

  const getEnemyData = () => {
    let monsterTheme = getRandomItemSimple(monsterTypeTheme);
    let randomEnemyConfiguration = getRandomItemSimple(enemyConfiguration)
    let numOfEnemyLocations = getNumEnemyLocationsFromKeyString(randomEnemyConfiguration)
    let enemyLocations = getNumOfRandItems(numOfEnemyLocations, validMapGridLocations);

    let enemyStr = `enemy theme: ${monsterTheme}.
Enemies: ${randomEnemyConfiguration} at location(s) ${enemyLocations}`
    setenemyStr(enemyStr)
    genEnemy(enemyStr)
  }

  const getBiomeData = () => {
    let selectedBiome = getRandomItemSimple(biomeType);
    let selectedBiomeSubtype = getRandomItemSimple(biomeSubtype);

    let biomeStr = `Objective biome: [${selectedBiome}] suggested:[${selectedBiomeSubtype}]`

    setBiomeStr(biomeStr)
    genBiome(biomeStr)
  };
  const getWeatherData = () => {
    let selectedWeather =getRandomItemSimple(weatherConditions);

    let weatherStr = `Weather forecast: ${selectedWeather}`
    setWeatherStr(weatherStr)
    genWeather(weatherStr)
  };

  const getNumEnemyLocationsFromKeyString = (keyString) => {
    const enemyLocationMap = {
      "duo of enemies": 2,
      "boss and minion-horde": 2,
      "legendary boss": 1,
      "single horde": 1,
      "enemy trio": 3
    };
    return enemyLocationMap[keyString] || 0; // Return the mapped value or 0 if keyString is not found
  };

  const getRandomItemSimple = (array) => {
      return array[Math.floor(Math.random() * array.length)];
    };

  return (
      <div className="wrapper">
        <div className="bottom-container">
          <div className="textarea" >
            <button className="gen-btn button" onClick={getGoalString}>goal</button>
            <textarea className="gen-textarea2" readOnly value={goalStr} />
          </div>
          <div className="textarea" >
            <button className="gen-btn button" onClick={getBiomeData}>biome</button>
            <textarea className="gen-textarea2" readOnly value={biomeStr} />
          </div>
          <div className="textarea" >
            <button className="gen-btn button" onClick={getWeatherData}>weather</button>
            <textarea className="gen-single-line" readOnly value={chosenWeatherStr} />
          </div>
          <div className="textarea" >
            <button className="gen-btn button" onClick={getEnemyData}>monsters</button>
            <textarea className="gen-textarea2" readOnly value={enemyStr} />
          </div>
        </div>
        
      </div>
    );
};

export default Page1;
