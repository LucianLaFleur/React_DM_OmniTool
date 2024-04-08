import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Page1 from './Page1';
import Page2 from './Page2';
import AbberationLab from './AbberationLab';
import MonMaker from './MonsterMakerPage'
import './styles.css'
// import Carousel from './Carousel';
import { elven_phonemes, townNames, questGoalStrings, validMapGridLocations,
  fetchQuests, missingPersonsArr, mcGuffinArray, battleSetpieces, pointDefenseGoals, 
  topographySteepness, topographyTypes, compassOrientationEightDirections, 
  environmentalShapes, riskyEnvironmentProps, interactableEnvironmentalProps, enticingEnvironmentalProps,
  monsterTypeTheme, biomeType, biomeSubtype, weatherConditions, enemyConfiguration} from './dataArrs'


const App = () => {

  const imgsToDisplayInCar = [
    'dellarayFlag.png',
    'table1.png',
    'trucyBig.png'
  ];

  const [adventureStringPt1, setAdventureStringPt1] = useState('');
  const [enemyStr, setenemyStr] = useState('');
  const [goalStr, setgoalStr] = useState('');
  const [biomeStr, setbiomeStr] = useState('');
  const [weatherStr, setweatherStr] = useState('');

  const getGoalString = () => {
    let questGoal = handleQuestType();
    let goalstring = `Goal: ${questGoal}`
    setgoalStr(goalstring)
  }

  const getEnemyData = () => {
    let monsterTheme = getRandomItemSimple(monsterTypeTheme);
    let randomEnemyConfiguration = getRandomItemSimple(enemyConfiguration)
    let numOfEnemyLocations = getNumEnemyLocationsFromKeyString(randomEnemyConfiguration)
    let enemyLocations = getNumOfRandItems(numOfEnemyLocations, validMapGridLocations);

    let enemyStr = `enemy theme: ${monsterTheme}.
Enemies: ${randomEnemyConfiguration} at location(s) ${enemyLocations}`
    setenemyStr(enemyStr)
  }

  const getBiomeData = () => {
    let selectedBiome = getRandomItemSimple(biomeType);
    let selectedBiomeSubtype = getRandomItemSimple(biomeSubtype);

    let biomeStr = `Objective biome: [${selectedBiome}] suggested:[${selectedBiomeSubtype}]`
    setbiomeStr(biomeStr)
  };

  const getWeatherData = () => {
    let selectedWeather =getRandomItemSimple(weatherConditions);

    let weatherStr = `The weather forecast is: ${selectedWeather}`
    setweatherStr(weatherStr)
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
  const getRandomHeight = () => {
    const min = 5;
    const max = 60;
    const increment = 5;
    // Calculate the range of possible values
    const rangeOfIntegers = (max - min) / increment + 1;
    // Generate a random index within the range
    const randomIndex = Math.floor(Math.random() * rangeOfIntegers);
    // Calculate the random number based on the index and increment
    const randHeight = min + randomIndex * increment;
    return randHeight.toString();
  };

  const handleAllButtonClick = () => {
    getBiomeData()
    getWeatherData()
    getEnemyData()
    getGoalString()
    let townName = getRandomItemSimple(townNames);
    let elvenFirstName = (getNumOfRandItems(2, elven_phonemes)).join("'")
    let elvenLastName = (getNumOfRandItems(2, elven_phonemes)).join("-")

   let entryLocation = getRandomItemSimple(validMapGridLocations);
    
    let topographyHeight = getRandomHeight();
    let randomSteepness = getRandomItemSimple(topographySteepness);
    let topographyOrientation = getRandomItemSimple(compassOrientationEightDirections);
    let topographyType = getRandomItemSimple(topographyTypes);
    let topographyCenter = getRandomItemSimple(validMapGridLocations);
    let riskyEnvString = getInteractablePropsForMap(3, riskyEnvironmentProps);
    let interactableEnvString = getInteractablePropsForMap(4, interactableEnvironmentalProps);
    let enticingString = getLootForMap(4);
    // riskyEnvironmentProps
    // gibbon2
    //  all basic button clicks handled, move on to dealing with strings

    let strTotal = `
    Starting town: ${townName}. Questgiver: ${elvenFirstName} ${elvenLastName} 
      ---
  Combat map: Topography [${topographyType}] oriented ${topographyOrientation}
Centered on grid # ${topographyCenter}
[${randomSteepness} of ${topographyHeight}ft]
      ---
  Risky props: ${riskyEnvString}
  Interactables: ${interactableEnvString}
  Map Loot: ${enticingString}
      ---
  Entry-point: ${entryLocation}`
    setAdventureStringPt1(strTotal)
  };

  const getRandomItemSimple = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const getNumEnemyLocationsFromKeyString = (keyString) => {
    const enemyLocationMap = {
      "duo of enemies": 2,
      "boss and minionhorde": 2,
      "legendary boss": 1,
      "single horde": 1,
      "enemy trio": 3
    };
    return enemyLocationMap[keyString] || 0; // Return the mapped value or 0 if keyString is not found
  };

  const getInteractablePropsForMap = (maxNum, inputArr) => {
    let nOfItemsToGet = Math.floor(Math.random() * maxNum) + 1;
    let itemLocationArr = getNumOfRandItems(nOfItemsToGet, validMapGridLocations);
    let chosenPropsArr = getNumOfRandItems(nOfItemsToGet, inputArr);
    let outputArray = [];
    for (let i = 0; i < nOfItemsToGet; i++) {
      let envShape = getRandomItemSimple(environmentalShapes)
      let envOrientation = getRandomItemSimple(compassOrientationEightDirections)
      outputArray.push(`${itemLocationArr[i]}:${chosenPropsArr[i]}, ${envOrientation}-pointing ${envShape}`);
    }
    return outputArray;
  };

  const getLootForMap = (maxNum) => {
    let nOfItemsToGet = Math.floor(Math.random() * maxNum) + 1;
    let itemLocationArr = getNumOfRandItems(nOfItemsToGet, validMapGridLocations);
    let chosenPropsArr = getNumOfRandItems(nOfItemsToGet, enticingEnvironmentalProps);
    let outputArray = [];
    for (let i = 0; i < nOfItemsToGet; i++) {
      outputArray.push(`${itemLocationArr[i]}:${chosenPropsArr[i]}`);
    }
    return outputArray;
  };

  const [nav1isOpen, setIsNav1Open] = useState(false);
  const toggleDropdown1 = () => {
    setIsNav1Open(!nav1isOpen);
  };
  const closeNav1OnMouseLeave = () => {
    setIsNav1Open(false); // Set dropdown to inactive when mouse leaves
  };
  const [nav2isOpen, setIsNav2Open] = useState(false);
  const toggleDropdown2 = () => {
    setIsNav2Open(!nav2isOpen);
  };
  const closeNav2OnMouseLeave = () => {
    setIsNav2Open(false); // Set dropdown to inactive when mouse leaves
  };

  return (
    <Router>
      
      <div className="bigDiv1">
        <div className='nav-wrapper'>

        <nav className="navClass1">
          <div className="my-logo"
          // navigate to home on click
          style={{ cursor: 'pointer' }} onClick={() => window.location.href = '/'}
          >
          </div>
          <div 
            className="nav-contents"
            onMouseLeave={closeNav1OnMouseLeave}
          >
            <div className={`dropdown-menu ${nav1isOpen ? 'active' : ''}`}>
              {/* On-clock version
              <div className="navHead dropdown-header" onClick={toggleDropdown}> */}
              <div className="navHead dropdown-header1" onMouseEnter={toggleDropdown1}>
              - Monster Tools -
              </div>
              <ul className="dropdown-content">
                <li> 
                  <Link className="nav-link-type1" to="/abberationLab">Abberation Lab</Link>
                </li>
                <li> 
                  <Link className="nav-link-type1" to="/">Maps/props NYI</Link>
                </li>
                <li>
                  <Link className="nav-link-type1" to="/monsterMaker">Monster Calculator</Link>
                </li>
              </ul>
            </div>
          </div>
          <div 
            className="nav-contents"
            onMouseLeave={closeNav2OnMouseLeave}
          >
            <div className={`dropdown-menu ${nav2isOpen ? 'active' : ''}`}>
              {/* On-clock version
              <div className="navHead dropdown-header" onClick={toggleDropdown}> */}
              <div className="navHead dropdown-header2" onMouseEnter={toggleDropdown2}>
              - Quests/NPCs -
              </div>
              <ul className="dropdown-content">
                <li> 
                  <Link className="nav-link-type1" to="/page1">Quest Goal/Biome</Link>
                </li>
                <li>
                  <Link className="nav-link-type1" to="/page2">town/NPC Names</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
          {/* <nav className="navClass1">
            <div className="my-logo">
            </div>
            <div className="nav-contents">
              <h2 className="navHead">- Quests/NPCs -</h2>
                <ul className="unorderedList1">
                  <li>
                    <Link className="nav-link-type1" to="/page1">Quest Goal/Biome</Link>
                  </li>
                  <li>
                    <Link className="nav-link-type1" to="/page2">town/NPC Names</Link>
                  </li>
                </ul>
            </div>
            <div className="nav-contents">
              <h2 className="navHead">- Monsters/maps -</h2>
                <ul className="unorderedList1">
                  <li>
                    <Link className="nav-link-type1" to="/page2">Maps/props</Link>
                  </li>
                  <li>
                    <Link className="nav-link-type1" to="/monsterMaker">Monster Maker</Link>
                  </li>
                </ul>
            </div>
          </nav> */}
          
        </div>
        <Routes>
          <Route 
          path="/"
          element={
            <div className='home-wrapper'>
              {/* <Carousel images={imgsToDisplayInCar} /> */}
              <h1> 
                Navigate via the bar above. The flag will return you here.
              </h1>
              <p> Try out the 
              <Link className="in-text-link" to="/abberationLab"> Abberation Lab </Link>
              for monster ideas or the 
              <Link className="in-text-link" to="/monsterMaker"> Monster Calculator </Link>
              for stats
              </p>
              <div className='petal-palace-div'></div>
              <p>
                [Note: This quest area stays open at the bottom of each page]
              </p>
            </div>
          } 
          />
          <Route path="//abberationLab" element={<AbberationLab/>} />
          <Route
          path="/page1" 
          element={
              <Page1 
              genGoal={setgoalStr}
              genBiome={setbiomeStr}
              genEnemy={setenemyStr} 
              genWeather={setweatherStr}
              />
            } 
          />
          <Route path="/page2" element={<Page2 onGenerate={setenemyStr} />} />
          <Route path="/monsterMaker" element={<MonMaker/>} />
        </Routes>

        <div className="sharedSentenceDiv">
          <h2 className="header1">Random Quest Outline:</h2>
          <p className='ghettoOutput'>
            {(adventureStringPt1 && enemyStr && goalStr && biomeStr &&
            weatherStr &&
            `${goalStr} 
            --- 
            ${biomeStr} 
            ${weatherStr}
            --- 
            ${enemyStr} 
            ---
            ${adventureStringPt1}`)}</p>
          {/* <button className="ghettoButton" onClick={makeBothWords}>Generate New Words</button>*/}
          <button className="ghettoButton" onClick={handleAllButtonClick}>Generate Entire New Quest</button> 
        </div>
        
      </div>
    </Router>
  );
};

export default App;

{/* <div className='petal-palace-div'></div> */}




{/* <nav className="navClass1">
            
            <div className="my-logo">
            </div>
            <div className="nav-contents">
              <h2 className="navHead">- Quests/NPCs -</h2>
                <ul className="unorderedList1">
                  <li>
                    <Link className="nav-link-type1" to="/page1">Quest Goal/Biome</Link>
                  </li>
                  <li>
                    <Link className="nav-link-type1" to="/page2">town/NPC Names</Link>
                  </li>
                </ul>
            </div>
            <div className="nav-contents">
              <h2 className="navHead">- Monsters/maps -</h2>
                <ul className="unorderedList1">
                  <li>
                    <Link className="nav-link-type1" to="/page2">Maps/props</Link>
                  </li>
                  <li>
                    <Link className="nav-link-type1" to="/monsterMaker">Monster Maker</Link>
                  </li>
                </ul>
            </div>
          </nav> */}

          // https://www.youtube.com/watch?v=5nq61iIKVDE&list=PLWPD9NJc0v6t5saI68TTugR4MgGWaQPvp
