import React, { useState } from 'react';
import './questGen.css';
// https://app.dungeonscrawl.com/
const elven_phonemes = [
  "al", "ad", "as", "ar'e", "allan", "ath", "al'ef", "amon", "amil", "amga", "athel", "alda", "althio", "a'hai", "ar", "an", "awyn", "ahar", "ai", "adan", "aelin", "adwyol",
  "boreas", "brim", "breth", "ber", "bal", "bog", "bor", "bura", "beleg", "barad", "berath",
  "ban", "breg", "brith", "bell", "bella", "bellias", "bath'uil",
  "da'e", "draug", "dol", "day", "dil", "dur", "driel", "dorn", "din", "dar", "dion", "dell", "dra", "da", "dath", "dolor(e)", "dwyn",
  "dina", "drego", "dwyn", 
  "ellen", "en'dwiell", "elis", "elsyan", "elad", "el", "ether", "ello", "emil", "edwyn", "ekor", "eda'in", "ethelle", "eleth'", "ethi",
  "edro", "eva", "edrias", "ebe", "eldar", "estillo", "ellen", "elnion", "endwyar", "ennor", "elenath", "ered", "estel", "eth'uil",
  "fel",  "feo", "fina", "for", "ferr", "far", "farra", "famas", "fine", "fiol",
  "fea", "falas", "fu'in", "forn", "fala", "fi",
  "goras", "gwyn", "gwhy", "galan", "goroth", "galad", "galar", "gwyol", "gil", "gar", "grath", "gwa", "gwar", "gon",
  "hareth", "hom", "hireth", "hira", "holor", "hel", "hamal", "hai'en", "hen", "harth", "hara",
  "kel", "kas", "karath", "kai", "kalma", "kor", "ku", "koro", "kith", "kar",
  "ithil", "illith", "iel", "iwyn", "il", "iar", "in", "i'an",
  "lyn", "luin", "luna", "lysan", "lan", "las", "lego", "lis", "lon", "lay", "lethar", "leas", "lor", "lokhi", "lear",
  "mal", "milla", "mora", "menor", "mira", "muin", "minas", "mith", "marath", "ma",
  "nas", "nav", "nam", "nar", "neth", "naleth", "nur", "nod", "ni'a", "nan", "na", "nogoth", "nin", "no", "ni",
  "on", "os", "oth", "ofal", "ol", "onod", "om'uin", "othad",
  "pay", "para", "pareth", "pa'lan", "pol", "path", "pell", "pen", "pil'", "pah'ma", "per'yod", "para'deth", "pyn", "pwyn", "pahd",
  "quin", "qui'el", "quen", "quell", "quill", "quar",
  "ras", "ryn", "ris", "ry", "rin", "riel", "rona", "rog", "roell", "ra'en", "ra'eth", "roth", "rell", "rath", "rua", "ruar", "rune", "rath", "rhi",
  "sa", "serith", "so", "su", "sorma", "swyr", "saelyn", "sama", "seleb", "sel", "sela", "sol", "si", "sharath", "sa'e", "sha", "sarn", "seth",
  "tath", "thri'ell", "triss", "tin", "treth", "tal", "tenar", "tyr", "tola", "thir", "thas", "thall", "thell", "thell'e", "thon",
  "tar", "thran", "ta'el", "ul", "uru", "ura", "u'", "uweth", "urog", "uroth",
  "vysh", "vath", "vad", "val", "vero", "var'isha", "vala", "volor", "vari", "va'er", "vadra", "vi'ey", "vess", "vil",
  "wyn", "weld", "warath", 
  "ya", "yor", "yarai", "yon", "ya'var"
  ]
// const orc_phonemes = [
//   "aba", "akh'", "ash", "ashuk", "atha","atun", "ahod", "az",
//   "bosh", "bo", "ban", "bruz", "buk", "bu", "baz", "bhor", "both", "besh", "bock", "bera", "bar", "bur", "bat",
//   "dur", "duk", "dag", "desh", "drak", "dru", "daz", "dob", "dai", "doz",
//   "gug", "goth", "gur","ghash", "gah'at", "gul", "glob", "gim", "gaz", "grish", "gresh",
//   "hakon", "ha", "hurn", "hura","hook","hed","hosh","hai", "hog", "hag",
//   "ick", "ith", "ish", "igol", "im", "imaz",
//   "kur", "krosh", "krimp", "ket", "ka", "keth", "k'het", "ku", "koz", "kaga", "kai", "krash",
//   "lug", "lith", "lath", "lash", "lik", "lo", "luk", "lugum", "lai",
//   "mur", "moz", "mahk", "mud", "mo", "muk", "maba",
//   "naz", "nub", "nab", "nag", "nal", "nath", "nar", "nosh", "nik", "nim",
//   "onnga", "omik", "ok", "ob", "oz", "or",
//   "paz", "pug","pash", "pok", "path", "pik", "paku", "par",
//   "ronk", "ruz", "ruk", "ruka", "rum", "rik", "rib", "ro", "ri", "rash", "rish", "raz",
//   "sharku", "shed", "sag", "saur", "sor",  "shara", "su", "sog", "soth",
//   "thad", "toz", "thrak", "thock", "tun", "tag", "taru", "thresh", "theru", "tosh", "thun",
//   "uk", "um", "ur",
//   "yog", "yu", "yik", "yoth", 
//   "zog", "zhogu", "zor", "zaram", "zak", "zarik"
//   ]
// const questGiverNames = [
//   "Aldric", "Briallen", "Cadoc", "Deryn", "Eira", "Fion", "Gareth", "Gwendolyn", "Kael", "Joreg", "Fate", "Dimitri",
//   "Maelgwn", "Nerys", "Rhys", "Seren", "Tegan", "Vaughan", "Shandwen", "Melliana", "Nadine", "Aisha", "Fatima", "Nour", "Yasmin", "Layla", 
//   "Zara", "Sofia", "Habiba", "Unni", "Una", "Vilde", "Vivian", "Vihalt", "Quinn", "Torill", "Tove/Tovey", "Trine", "Tuva",
//   "Mariam", "Samira", "Gionna", "Margaret", "Catherine", "Emily", "Hannah", "Frederick", "Rebecca", "Eleanor", "Richard", "Charlotte",
//   "Erik", "Geir", "Hans", "Lars", "Morten", "Odd", "Rune", "Sven", "Tywen", "Tor", "Adrian", "Aleksander", "Andre", "Birger","Brage", "Dag",  
//   "Einar", "Eivind", "Elias", "Erlend", "Erling", "Eskil", "Espen", "Fredrik", "Frode", "Hovarth", "Henrik", "Herman", "Isak", "Ivar", 
//   "Jakob", "Jarle", "Jesper", "Joakim", "Johannes", "Jorgen", "Josten", "Kenneth", "Leif", "Marcus", "Marius", "Martin", "Mathias",  
//   "Nikolai", "Roar", "Sigurd", "Sindre", "Sivert", "Sondre", "Terje", "Vidar", "Anne", "Berit", "Ingrid", "Kari", "Liv", "Randi", "Egil",
//   "Anette", "Aurora", "Beate", "Bente", "Birgitte", "Borghild", "Britt", "Camilla", "Caroline", "Cecilia", "Cecilie", "Celine", "Charlotte", 
//   "Dagny", "Elin", "Gunhild", "Hannah", "Hedda", "Hege", "Heidi", "Helene", "Helga", "Henriette", "Hilde", "Inga", "Ingrid", "Iselin", 
//   "Jenny", "Jorunn", "Kaja", "Klara", "Laila", "Lene", "Lillian", "Maren", "Martha", "Mia", "Mina", "Mona", "Monica/monisha", "Nora/Norna", 
//   "Patricia", "Rebecca", "Sidsel", "Signe", "Solveig/Sola", "Thea", "Tina", "Tiril", "Hol'vier"
// ];
// const familyNames = [
//   "Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Crow", "Turner", "Torgersen", "Wen'hei", "Mjod", "Thomassen", "Thoresen",
//   "Butcher", "Tallifer", "Davis", "Wilson", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Moore", "Hall", "Walker", "Young", "King", "Allen", "Wright",
//   "Hill", "Baker", "Carter", "Cooper", "Evans", "Hale", "Murphy", "Lark", "Espeland", "Evensen","Svendsen", "Syversen", "Sunde", "Dockman",
//   "Andersen", "Antonsen", "Arnesen", "Bakke", "Bakken", "Bergersen", "Berget", "Birkeland", "Bo", "Bolstad", "Borresen", "Brekke", "Brevik",
//   "Bye", "Carlsen", "Christensen", "Christiansen", "Christoffersen", "Dahl", "Dalen", "Edvardsen", "Egeland", "Eide", "Eikeland", "Endresen",    
//   "Finstad", "Fjeld", "Foss", "Fredriksen", "Grande", "Grimstad", "Gundersen",  "Holland", "Hammer", "Hansen", "Haugen", "Helgesen", "Helland", 
//   "Helle", "Henriksen", "Hermansen", "Hetland", "Hoff", "Holt", "Holter", "Hovland", "Iversen", "Jenssen", "Kleppe", "Kleven", "Larsen", 
//   "Lorentzen", "Ludvigsen", "Lund", "Martinsen", "Mathisen", "Melby", "Meyer", "Mikkelsen", "Moen", "Monsen", "Mortensen", "Myklebust",  
//   "Nilsson", "Norheim", "Normann", "odegard", "overland", "Paulsen", "Pedersen", "Saytr", "Skaar", "Skaug", "Solem", "Singer", "Minstead",
//   "Solheim", "Solli", "Solvang (soul-fang)", "Stangeland", "Steen", "Steffensen", "Strom", "Stormfell", "Steiger", "Stone"
// ];
const townNames = ["Fujiwara Fields", "Fujiwara City", "Genkai Town", "Branwen City", "Beltlan City", "Fujiwara Red Square", "Fujiwara grand temple", 
"Blackthorn Valley", "Beltlan Wheat Fields", "Branwen Port", "Branwyn Slums", "Kingsland Castle", "Florian Palace", "Wolfsbane Village",
"Bergamot's Library", "Maojan's Dojo", "Gladiator's Training Field", "Renzel's Viking Longhouse", "Pieta's Church", "Lucian's Manor", "Tealcrest Watchtower",
"Genkai watchtower", "Grunwalt Acadameia"
];
const questGoalStrings = ["Rescue/retrieval mission", "Setpiece Battle", 
//   "Social Infiltration", "Escort or Mission", "Other",
"Defend a point"
];

const fetchQuests = [
  "Find missing person", 
  //  noble/wife/family/village healer/farmer/bard
  "Missing McGuffin"
  // // pet dog, arboreal octopus, missing cat, horse, deinonychus, ox, crow, parrot, monkey, pseudodragon, wolf, giant rat, owl, pet rock, slime, mud elemental, ice elemental, penguin, elephant, fox
// amulet, book, carving, cake, potion, hat, belt, bracelet, scroll, portrait
]
const missingPersonsArr = [
  "captured prisoner",
  "injured person",
  "famous person",
  "local peasant",
  "nobility",
  "wanted criminal",
  "family member"
]
const mcGuffinArray = [
  "reagents for a sacred-ritual",
  "reagents for a secretly evil ritual",
  "good potion",
  "evil potion",
  "neutral/mundane potion for economics",
  "wealthy treasure",
  "weapon",
  "dispelling a curse",
  "artifact of honor/history",
  "pilfer economic resource",
  "stop depletion of resource",
  "restore a lost resource",
  "recover technology",
  "recover lorebooks/tapestry/scroll"
]
// const mcGuffinForm = [
//   "orb", "blade shard", "glowing runes", "bones", "dust", "mask", "statue", "bottle"
// ]
const battleSetpieces = [
  "Infiltrate abandoned 1d4 tower/village/temple/castle",
  "Ruin excavation collapses into underground chamber, disturbing resting foes",
  "Corruption curse making criminals into even worse monsters",
  "Shark-man pirates led by a Siren",
  "cultists succeeded in summoning a demon, time to clean them up",
  "assassins on the run wanted for murder",
  "Evil mage casting mass madness in a village square",
  "Public hanging party crasher",
  "Mining expedition awoke sleeping danger",
  "Barbarian hordes on the kingdom's doorstep",
  "Killer clown carnival",
  "Haunted 1d6 hospital/prison/academy/mansion/palace with gardens/coastal town",
  "Feywild feast, partygoers picked off one-by-one",
  "Magic compass, distress beacon for someone gone awry",
  "Moving waterborne battle",
  "moving caravan battle"
]
const pointDefenseGoals = [
  "defend destructable object (gates, McGuffin, Person, treasure)",
  "defend magic location from destructive horde",
  "defend 3 NPCs doing a ritual",
  "defend 3 candles burning for a ritual",
  "defend artificer planting explosives at 3-points on field",
  "defend treasure in transit",
  "defend civilian crowd in transit",
  "defend town under attack",
  "defend McGuffin (curse-alleviation tonic destined for prince) in transit",
  "defend captured wyrmling dragon in transit",
  "Accumulate charge (crystal generator, interact to build charge/open door/close rift)"
]
const monsterTypeTheme = [
  "aberration", "beast/shifter", "celestial/Angelic", "construct", "dragon", "elemental", "fey/fairy/elf-kind",
  "fiend", "giant", "dwarven/gnome/halfling", "humanoid", "goblinoid", "monstrosity", "ooze", "plant", "undead"
]
const biomeType = [
  "urban", "forest", "mountain", "tundra", "field/hill",
  "cave", "dungeon", "feywild", "desert", "swamp"
]
const biomeSubtype = [
  "village", "ruins", "encampment", "fortress/checkpoint", "castle", "temple/religious site", "natural point-of-interest",
  "academy/college", "port", "library/reliquary", "grave/monument"
]
const weatherConditions = [
  "low visibility mist/dust", "rain/soggy", "snowy/ash-fall", "clear weather", "light wind", "harsh winds", "angry hazardous weather",
  "bright/hot", "chilly/cold danger", "wild magic storm"
]
const enemyConfiguration = [
  "duo of enemies",
  "boss and minion-horde",
  "legendary boss",
  "single horde",
  "enemy trio"
]

const validMapGridLocations = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
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
const topographySteepness = [
  "sleight slope", "steep slope", "sheer", "slope with sheer portion", "sheer with slope portion", "slight slope with sheer portion"
]
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
const topographyTypes = [
  "Cliff line (pit)",
  "ridge line (elevation",
  "Single point of elevation",
  "Single point pit",
  "C elevation", "O elevation", "V elevation", "Z/S, wide elevation", "Z/S, shallow elevation", "L elevation", "T, equal elevation", "T, short arms elevation", "b-shape elevation", "parrallel lines elevation",
  "C-Pit", "O-Pit", "V-Pit", "Z/S, wide-Pit", "Z/S, shallow-Pit", "L-Pit", "T, equal-Pit", "T, short arms-Pit", "b-shape-Pit", "parrallel lines-Pit",
  "parallel lines, elevation", "parallel lines, pit"
]
const compassOrientationEightDirections = [
  "north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"
]
const environmentalShapes = [
  "line", "line and dot", "even C", "narrow C", "shallow C", "hook-shape", "rectangle-shape", "square-shape", "kite-shape", "equal O", "oblong O", "neutral-V", "narrow -V", "checkmark-shape", "wide Z/S", "shallow Z/S", "L", "T, equal", "T, short arms", "b-shape", "parrallel lines"
]
const riskyEnvironmentProps = [
  "structure (house, ruins, shed)",
  "climbable barrier (stone pile, wood wall)",
  "low wall (vault-able)",
  "damaging barrier (spike wall)",
  "3/4 cover barrier (trees/loopholes)",
  "prone-squeeze barrier (wall, but drain)",
  "narrow standing squeeze (alley, tree narrow, ruins)",
  "visually obscuring difficult terrain (trees w/vines, bushes)",
  "visual obscure (falling leaves, fog bank, waterfall)",
  "damaging difficult terrain (thorns/poison vines)",
  "slowing difficult terrain (mud, roots, strewn garbage, rubble)",
  "prone-danger difficult terrain (ice, running water, oil)",
  "water puddle (wet)",
  "breakable damaging floor",
  "directional trap (dart, flamethrower, bolt)",
  "aoe trap (gas, thunderwave, explosive, geyser)"
]
const interactableEnvironmentalProps = [
  "shortcut (bridge/rope of acension/sled/wagon)",
  "third party (beehive, slumbering bear, gator-lake",
  "natural trigger damage and barrier (topple tree, pillar)",
  "natural trigger damage and hazard (icicles to shards, open dam)",
  "hanging hazard (tapestry, beehive, stalactite)",
  "grease pool (flammable)",
  "openable porthole (door, boarded window, web, vine-wall)",
  "trigger magic hazard (rift of lava, rift of wind, rift of ice-storm)",
  "trigger exotic hazard (acid flower/vat, poison mushroom cloud, steam pipe)",
  "sound distraction (small rock-sculpture, neglected drum, suit of armor, plates)",
  "1/2 cover topple-able stack (crates, rocks)",
  "destructable structure (hut/tent/shop stall)",
  "durable structure (guardhouse/home)",
  "climbable wall",
  "swinging traversal (vine/rope/suspended pendulum)",
  "balcony platform (mushroom/archway/lookout post/deck/big branch)"
]
const enticingEnvironmentalProps = [
  "minor valuable resource (minor reagent, minor art piece)",
  "treasure chest/stash (easy pickings)",
  "interaction loot-box (ore vein, tree, crate, pick lock)",
  "junk pile (bones, debris, fallen corpse)"
]
// gibbon

// const neutralFiguresConfiguration = [
//   "civilians in distress",
//   "art/treasure at risk of loss",
//   "volitile third party"
// ]

// const terrainInteractables
//  dam being held back, destructable bridge, knockdown-ladder/climbing rope, supply crates/barrels,
//  magic boon, terrain-shifting interactable, 
  const SentenceMaker = () => {
    // ultimate prompt output string...
    const [promptOutString, setPromptOutString] = useState('');
    
    const [selectedtownName, settownName] = useState(null);
    const [selectedquestGoalString, setquestGoalString] = useState('');
    // array of locations for interactables
    // const [selectedchosenHazardLocations, setchosenHazardLocations] = useState(null);
    // const [selectedchosenGoodLocations, setchosenGoodLocations] = useState(null);
    const [selectedchosenEnemyLocations, setchosenEnemyLocations] = useState(null);
    const [selectedchosenEntryLocation, setchosenEntryLocation] = useState('');
    // const [selectedCoverLocations, setCoverLocations] = useState(null);


    // const [selected, set] = useState('');
    // const [selectedelven_phonemes, setelven_phonemes] = useState(null);
    // const [selectedorc_phonemes, setorc_phonemes] = useState(null);

    
    
    // const [selected, set] = useState([]);

    const handleQuestType = () => {
      let givenGoal = getRandItemFromArr(questGoalStrings, setquestGoalString)
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

    const handleAllButtonClick = () => {
      let townName = getRandItemFromArr(townNames, settownName);
      let elvenFirstName = (getNumOfRandItems(2, elven_phonemes)).join("'")
      let elvenLastName = (getNumOfRandItems(2, elven_phonemes)).join("-")
      let selectedBiome = getRandomItemSimple(biomeType);
      let selectedBiomeSubtype = getRandomItemSimple(biomeSubtype);
      let selectedWeather =getRandomItemSimple(weatherConditions);

      let questGoal = handleQuestType();
      let monsterTheme = getRandomItemSimple(monsterTypeTheme);

      let randomEnemyConfiguration = getRandomItemSimple(enemyConfiguration)
      let numOfEnemyLocations = getNumEnemyLocationsFromKeyString(randomEnemyConfiguration)
      let enemyLocations = getNumOfRandItems(numOfEnemyLocations, validMapGridLocations);
      setchosenEnemyLocations([enemyLocations]);
      let entryLocation = getRandomItemSimple(validMapGridLocations);
      setchosenEntryLocation(entryLocation);
      
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

      let strPt1 = `Starting town: ${townName}. Questgiver: ${elvenFirstName} ${elvenLastName} 
Goal: ${questGoal}.
Objective biome: [${selectedBiome}] suggested:[${selectedBiomeSubtype}]
The weather forecast is ${selectedWeather}
        ---
enemy theme: ${monsterTheme}.
    Combat map: Topography [${topographyType}] oriented ${topographyOrientation}
  Centered on grid # ${topographyCenter}
  [${randomSteepness} of ${topographyHeight}ft]
        ---
    Risky props: ${riskyEnvString}
    Interactables: ${interactableEnvString}
    Map Loot: ${enticingString}
        ---
    Entry-point: ${entryLocation}
    Enemies: ${randomEnemyConfiguration} at location(s) ${enemyLocations}`
      setPromptOutString(strPt1)
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

    const getRandItemFromArr = (array, setSelectedArray) => {
        const randomItem = getRandomItemSimple(array);
        setSelectedArray([randomItem]);
        return randomItem
    };

    const getRandomItemSimple = (array) => {
        return array[Math.floor(Math.random() * array.length)];
      };
  
    
    return (
        <div className="wrapper">
          {/* <div className="column-container">
            <div className='column'>
              <div className="textarea">
                <button className="button" onClick={() => getRandItemFromArr(poses, setSelectedPoses)}>Pose</button>
                <textarea className="sm_textarea" readOnly value={selectedPoses.join(', ')} />
              </div>
              <div className="textarea">
                <button className="button" onClick={() => getRandItemFromArr(secondaryPoses, setSelectedSecondaryPoses)}>Secondary Pose</button>
                <textarea className="sm_textarea" readOnly value={selectedSecondaryPoses.join(', ')} />
              </div>
              <div className="textarea">
                <button className="button" onClick={() => getRandItemFromArr(expressions, setSelectedExpressions)}>Expression</button>
                <textarea className="sm_textarea" readOnly value={selectedExpressions.join(', ')} />
              </div>
              <div className="textarea">
                <button className="button" onClick={() => getRandItemFromArr(expression2, setSelectedExpression2)}>Expression 2</button>
                <textarea className="sm_textarea" readOnly value={selectedExpression2.join(', ')} />
              </div>
            </div>
            <div className='column'>
              <div className="textarea">
                <button className="button" onClick={() => getRandItemFromArr(attireDescriptions, setAttireDescriptions)}>Attire set</button>
                <textarea className="sm_textarea" readOnly value={selectedAttireDescription.join(', ')} />
              </div>
              <div className="textarea">
                <button className="button" onClick={() => getRandItemFromArr(secondaryPoses, setSelectedSecondaryPoses)}>Secondary Pose2</button>
                <textarea className="sm_textarea" readOnly value={selectedSecondaryPoses.join(', ')} />
              </div>
              <div className="textarea">
                <button className="button" onClick={() => getRandItemFromArr(expressions, setSelectedExpressions)}>Expression2</button>
                <textarea className="sm_textarea" readOnly value={selectedExpressions.join(', ')} />
              </div>
            </div>
          </div> */}
          <div className="bottom-container">
            <div className="textarea" >
              <button id="gen-all-btn" className="button" onClick={handleAllButtonClick}>ALL</button>
              <textarea id="gen_all_textarea" readOnly value={promptOutString} />
            </div>
          </div>
          
        </div>
      );
      
    };    
  
  export default SentenceMaker;

  // NYI, make a wrapper for a string consistent of parentheses and a whole number from the array myNums = ["0.8", "1.1", "1.3", "1.6"] 
//  for example, input string "red" and randomly getting "0.8" would reslt in "(red:0.8)". All numbers in the mynums array have an equal chance of being chosen

// write a function that takes 2 arguments that are expected to be strings. The goal is to place the two arguments into a string pattern:
//  [word1:word2:num]. The number is a random float from 0.2 to 0.8 at increments of 0.1. Randomly choose a float and place it in the output string with the parameters.
// example: myFunction("red", "blue") --> possible output if 0.3 is randomly chosen --> "['red':'blue':0.3]"

// NYI randomize which part of the color scheme gets added to clothing and if bottoms get special color or not
