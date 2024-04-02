const fruits = ['apple', 'banana', 'orange', 'grape', 'melon', 'peach', 'kiwi', 'pear', 'strawberry'];
const animals = ['dog', 'cat', 'bird', 'fish', 'rabbit', 'hamster', 'turtle', 'snake', 'horse'];
const validMapGridLocations = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
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
    ];
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
  ];
  const missingPersonsArr = [
    "find captured prisoner",
    "find injured person",
    "find famous person",
    "find local peasant",
    "find nobility",
    "find wanted criminal",
    "find family member"
  ];
  const mcGuffinArray = [
    "reagents for a sacred-ritual",
    "reagents for a secretly evil ritual",
    "good potion",
    "evil potion",
    "neutral/mundane potion for economics",
    "wealthy treasure",
    "magic mcguffin weapon",
    "dispelling a curse",
    "artifact of honor/history",
    "an extremely cumbersome heirloom",
    "pilfer economic resource",
    "stop depletion of resource",
    "restore a lost resource",
    "recover technology",
    "recover lorebooks/tapestry/scroll"
  ];
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
  ];
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
  ];
  const monsterTypeTheme = [
    "aberration", "beast", "shifter/beastman", "celestial/Angelic", "construct", "dragon", "elemental", "fey/fairy/elf-kind",
    "fiend", "giant", "dwarven/gnome/halfling", "humanoid", "goblinoid", "monstrosity", "ooze", "plant", "undead"
  ];
  const biomeType = [
    "urban", "forest", "mountain", "tundra", "field/hill",
    "cave", "dungeon", "feywild", "desert", "swamp"
  ];
  const biomeSubtype = [
    "village", "ruins", "encampment", "fortress/checkpoint", "watchtower/castle/mansion", "temple/religious site", "natural point-of-interest",
    "academy/college", "port", "library/reliquary", "grave/monument"
  ];
  const weatherConditions = [
    "low visibility mist/dust", "rain/soggy", "snowy/ash-fall", "clear weather", "light wind", "harsh winds", "angry hazardous weather",
    "bright/hot", "chilly/cold danger", "wild magic storm"
  ];
  const enemyConfiguration = [
    "duo of enemies",
    "boss and minion-horde",
    "legendary boss",
    "single horde",
    "enemy trio"
  ];
  const topographySteepness = [
    "sleight slope", "steep slope", "sheer", "slope with sheer portion", "sheer with slope portion", "slight slope with sheer portion"
  ];
  const topographyTypes = [
    "Cliff line (pit)",
    "ridge line (elevation",
    "Single point of elevation",
    "Single point pit",
    "C elevation", "O elevation", "V elevation", "Z/S, wide elevation", "Z/S, shallow elevation", "L elevation", "T, equal elevation", "T, short arms elevation", "b-shape elevation", "parrallel lines elevation",
    "C-Pit", "O-Pit", "V-Pit", "Z/S, wide-Pit", "Z/S, shallow-Pit", "L-Pit", "T, equal-Pit", "T, short arms-Pit", "b-shape-Pit", "parrallel lines-Pit",
    "parallel lines, elevation", "parallel lines, pit"
  ];
  const compassOrientationEightDirections = [
    "north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"
  ];
  const environmentalShapes = [
    "line", "line and dot", "even C", "narrow C", "shallow C", "hook-shape", "rectangle-shape", "square-shape", "kite-shape", "equal O", "oblong O", "neutral-V", "narrow -V", "checkmark-shape", "wide Z/S", "shallow Z/S", "L", "T, equal", "T, short arms", "b-shape", "parrallel lines"
  ];
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
  ];
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
  ];
  const enticingEnvironmentalProps = [
    "minor valuable resource (minor reagent, minor art piece)",
    "treasure chest/stash (easy pickings)",
    "interaction loot-box (ore vein, tree, crate, pick lock)",
    "junk pile (bones, debris, fallen corpse)"
  ];
  
export { fruits, animals, elven_phonemes, townNames, questGoalStrings, validMapGridLocations,
    fetchQuests, missingPersonsArr, mcGuffinArray, battleSetpieces, pointDefenseGoals, 
    topographySteepness, topographyTypes, compassOrientationEightDirections, 
    environmentalShapes, riskyEnvironmentProps, interactableEnvironmentalProps, enticingEnvironmentalProps,
    monsterTypeTheme, biomeType, biomeSubtype, weatherConditions, enemyConfiguration};
