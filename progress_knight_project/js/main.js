var gameData = {
  taskData: {},
  itemData: {},

  coins: 0,
  days: 365 * 15,
  corruption: 0,
  essence: 0,
  paused: false,
  timeWarpingEnabled: false,

  rebirthOneCount: 0,
  rebirthTwoCount: 0,
  rebirthThreeCount: 0,

  currentJob: null,
  currentSkill: null,
  currentProperty: null,
  currentMisc: null,

  settings: {
    stickySidebar: false
  }
}

var tempData = {}

var skillWithLowestMaxXp = null

const autoPromoteElement = document.getElementById("autoPromote")
const autoLearnElement = document.getElementById("autoLearn")

const updateSpeed = 20

const baseLifespan = 365 * 75

const baseGameSpeed = 4

const permanentUnlocks = ["Scheduling", "Shop", "Automation", "Quick task display"]

const jobBaseData = {
  "Slacker": {name: "Slacker", maxXp: 10, income: 0.1},
  "Mail boy": {name: "Mail boy", maxXp: 50, income: 2},
  "Sweeper": {name: "Sweeper", maxXp: 100, income: 5},

  "Cleaner": {name: "Cleaner", maxXp: 100, income: 10},
  "Shop boy": {name: "Shop boy", maxXp: 150, income: 25},

  "Background actor": {name: "Background actor", maxXp: 100, income: 15},
  "Streamer": {name: "Streamer", maxXp: 150, income: 30},

  "Support 1st line": {name: "Support 1st line", maxXp: 100, income: 18},
  "Support 2nd line": {name: "Support 2nd line", maxXp: 150, income: 25},

  "Nurse": {name: "Nurse", maxXp: 100, income: 12},
  "General doctor": {name: "General doctor", maxXp: 150, income: 20},

  "Student": {name: "Student", maxXp: 100, income: 10},
  "Graduate": {name: "Graduate", maxXp: 150, income: 15},

  "Rookie": {name: "Rookie", maxXp: 150, income: 25},
  "Experienced soldier": {name: "Experienced soldier", maxXp: 300, income: 60}
}

const skillBaseData = {
  "Slacking": {name: "Slacking", maxXp: 50, effect: 0.01, description: "All XP"},
  "Waiting": {name: "Waiting", maxXp: 150, effect: 0.01, description: "Gamespeed"},

  "Strength": {name: "Strength", maxXp: 100, effect: 0.01, description: "Strength abilities XP"},
  "Perception": {name: "Perception", maxXp: 100, effect: 0.01, description: "Perception abilities XP"},
  "Endurance": {name: "Endurance", maxXp: 100, effect: 0.01, description: "Endurance abilities XP"},

  "Communicability": {name: "Communicability", maxXp: 100, effect: 0.01, description: "Communicability abilities XP"},
  "Intelligence": {name: "Intelligence", maxXp: 100, effect: 0.01, description: "Intelligence abilities XP"},
  "Aptitude": {name: "Aptitude", maxXp: 100, effect: 0.01, description: "Aptitude abilities XP"},
  "Luckiness": {name: "Luckiness", maxXp: 100, effect: 0.01, description: "Luckiness abilities XP"},

  "Muscle memory": {name: "Muscle memory", maxXp: 100, effect: 0.01, description: "Body XP"},
  "Muscle mass": {name: "Muscle mass", maxXp: 100, effect: 0.01, description: "Military payment"},

  "Concentration": {name: "Concentration", maxXp: 100, effect: 0.01, description: "Mind XP"},
  "Stealth": {name: "Stealth", maxXp: 100, effect: -0.01, description: "Reduced Expenses"},

  "Walking": {name: "Walking", maxXp: 100, effect: 0.01, description: "Positions XP"},
  "Strong stomach": {name: "Strong stomach", maxXp: 100, effect: 0.01, description: "Medical science XP"},

  "Bargaining": {name: "Bargaining", maxXp: 100, effect: -0.01, description: "Reduced Expenses"},
  "Artistry": {name: "Artistry", maxXp: 100, effect: 0.01, description: "Media payment"},

  "Tactics": {name: "Tactics", maxXp: 100, effect: 0.01, description: "Military XP"},
  "Meditation": {name: "Meditation", maxXp: 100, effect: 0.01, description: "Happiness"},
  "Programming": {name: "Programming", maxXp: 100, effect: 0.01, description: "IT payment"},

  "Productivity": {name: "Productivity", maxXp: 100, effect: 0.01, description: "Service payment"},
  "Tech understanding": {name: "Tech understanding", maxXp: 100, effect: 0.01, description: "IT & Science XP"},

  "Right in time": {name: "Right in time", maxXp: 100, effect: 0.01, description: "Positions payment"},
  "Phenomenal agility": {name: "Phenomenal agility", maxXp: 100, effect: 0.01, description: "Happiness"},
}

const itemBaseData = {
  "Parents house": {name: "Parents house", expense: 0, effect: 1},
  "Hostel": {name: "Hostel", expense: 5, effect: 2},
  "3-star hotel room": {name: "3-star hotel room", expense: 30, effect: 3.5},
  "5-star hotel room": {name: "5-star hotel room", expense: 150, effect: 6},
  "Small apartment": {name: "Small apartment", expense: 600, effect: 10},
  "Apartment": {name: "Apartment", expense: 1500, effect: 15},

  "Library card": {name: "Library card", expense: 2, effect: 2, description: "Mind XP"},
  "Gym membership": {name: "Gym membership", expense: 5, effect: 2, description: "Body XP"},
}

const jobCategories = {
  "No category": ["Slacker", "Mail boy", "Sweeper"],
  "Service": ["Cleaner", "Shop boy"],
  "Media": ["Background actor", "Streamer"],
  "IT": ["Support 1st line", "Support 2nd line"],
  "Medical science": ["Nurse", "General doctor"],
  "Science": ["Student", "Graduate"],
  "Military": ["Rookie", "Experienced soldier"]
}

const skillCategories = {
  "Idle": ["Slacking", "Waiting"],
  "Body": ["Strength", "Perception", "Endurance"],
  "Mind": ["Communicability", "Intelligence", "Aptitude", "Luckiness"],
  "Strength": ["Muscle memory", "Muscle mass"],
  "Perception": ["Concentration", "Stealth"],
  "Endurance": ["Walking", "Strong stomach"],
  "Communicability": ["Bargaining", "Artistry"],
  "Intelligence": ["Programming", "Tactics", "Meditation"],
  "Aptitude": ["Productivity", "Tech understanding"],
  "Luckiness": ["Right in time", "Phenomenal agility"]
}

const itemCategories = {
  "Properties": ["Parents house", "Hostel", "3-star hotel room", "5-star hotel room", "Small apartment", "Apartment"],
  "Misc": ["Library card", "Gym membership"]
}

const headerRowColors = {
  "No category": "#8D8D8D",
  "Service": "#55a630",
  "Military": "#e63946",
  "Media": "#55a630",
  "IT": "#55a630",
  "Science": "#55a630",
  "Medical science": "#e63946",

  "Idle": "#8D8D8D",
  "Body": "#e63946",
  "Mind": "#C71585",
  "Strength": "#e63946",
  "Perception": "#e63946",
  "Endurance": "#e63946",
  "Communicability": "#e63946",
  "Intelligence": "#e63946",
  "Aptitude": "#e63946",
  "Luckiness": "#e63946",

  "Properties": "#219ebc",
  "Misc": "#b56576",
}

const tooltips = {
  // No category
  "Slacker": "Do nothing all days along, rarily acquiring gifts from parents or friends",
  "Mail boy": "Mail boy",
  "Sweeper": "Sweeper",

	//Service
  "Cleaner": "Clean anything your manager says you to clean without questions",
  "Shop boy": "Shop boy",

  //Military
  "Rookie": "Rookie",
  "Experienced soldier": "Experienced soldier",

  // Media
  "Background actor": "Background actor",
  "Streamer": "Streamer",

  // IT
  "Support 1st line": "Support 1st line",
  "Support 2nd line": "Support 2nd line",

  // Medical science
  "Nurse": "Nurse",
  "General doctor": "General doctor",

  // Science
  "Student": "Student",
  "Graduate": "Graduate",

  // Idle
  "Slacking": "Doing nothing requires a skill too",
  "Waiting": "Waiting",

  //Body
  "Strength": "Strength",
  "Perception": "Perception",
  "Endurance": "Endure your body through exhausting training",

  // Mind
  "Communicability": "Learn how to talk most effectively",
  "Intelligence": "Intelligence",
  "Aptitude": "Aptitude",
  "Luckiness": "Luckiness",

  //Strength
  "Muscle memory": "Muscle memory",
  "Muscle mass": "Muscle mass",

  // Perception
  "Concentration": "Concentration",
  "Stealth": "Stealth",

  // Endurance
  "Walking": "Walking",
  "Strong stomach": "Strong stomach",

  // Communicability
  "Bargaining": "Study the tricks of the trade and persuasive skills to lower any type of expense",
  "Artistry": "Artistry",

  // Intelligence
  "Meditation": "Fill your mind with peace and tranquility to tap into greater happiness from within",
  "Tactics": "Create and revise battle strategies, improving experience gained in the military",
  "Programming": "Programming",

  // Aptitude
  "Productivity": "Productivity",
  "Tech understanding": "Tech understanding",

  // Luckiness
  "Right in time": "Right in time",
  "Phenomenal agility": "Phenomenal agility",

  //Properties
  "Parents house": "Living with your parents may be uncomfortable, but it's free at any day",
  "Hostel": "Hostel",
  "3-star hotel room": "3-star hotel room",
  "5-star hotel room": "5-star hotel room",
  "Small apartment": "Small apartment",
  "Apartment": "Apartment",

  //Misc
  "Library card": "Library card",
  "Gym membership": "Gym membership"
}

const units = ["", "k", "M", "B", "T", "q", "Q", "Sx", "Sp", "Oc", "Nv", "Vg", "Uv", "Dv", "Tv", "Qt", "Qv", "Sv", "Oc", "Nd", "Tg", "OMG"];

const jobTabButton = document.getElementById("jobTabButton")

function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}

function getBindedTaskEffect(taskName) {
  var task = gameData.taskData[taskName]
  return task.getEffect.bind(task)
}

function getBindedItemEffect(itemName) {
  var item = gameData.itemData[itemName]
  return item.getEffect.bind(item)
}

function addMultipliers() {
  for (taskName in gameData.taskData) {
    var task = gameData.taskData[taskName]

    task.xpMultipliers = []
    if (task instanceof Job) task.incomeMultipliers = []

    task.xpMultipliers.push(task.getMaxLevelMultiplier.bind(task))
    task.xpMultipliers.push(getHappiness)
    task.xpMultipliers.push(getBindedTaskEffect("Slacking"))

    if (task instanceof Job) {
        task.incomeMultipliers.push(task.getLevelMultiplier.bind(task))
        task.incomeMultipliers.push(getBindedTaskEffect("Right in time"))
        task.xpMultipliers.push(getBindedTaskEffect("Walking"))
    } else if (task instanceof Skill) {
        // task.xpMultipliers.push(getBindedTaskEffect("Intelligence"))
    }

    if (jobCategories["Military"].includes(task.name)) {
        task.xpMultipliers.push(getBindedTaskEffect("Tactics"))
        task.incomeMultipliers.push(getBindedTaskEffect("Muscle mass"))
    } else if (jobCategories["Service"].includes(task.name)) {
      task.incomeMultipliers.push(getBindedTaskEffect("Productivity"))
    } else if (jobCategories["Media"].includes(task.name)) {
      task.incomeMultipliers.push(getBindedTaskEffect("Artistry"))
    } else if (jobCategories["IT"].includes(task.name)) {
      task.incomeMultipliers.push(getBindedTaskEffect("Programming"))
      task.xpMultipliers.push(getBindedTaskEffect("Tech understanding"))
    } else if (jobCategories["Science"].includes(task.name)) {
      task.xpMultipliers.push(getBindedTaskEffect("Tech understanding"))
    } else if (jobCategories["Medical science"].includes(task.name)) {
      task.incomeMultipliers.push(getBindedTaskEffect("Strong stomach"))
    } else if (skillCategories["Body"].includes(task.name)) {
        task.xpMultipliers.push(getBindedTaskEffect("Muscle memory"))
        task.xpMultipliers.push(getBindedItemEffect("Gym membership"))
    } else if (skillCategories["Mind"].includes(task.name)) {
      task.xpMultipliers.push(getBindedTaskEffect("Concentration"))
      task.xpMultipliers.push(getBindedItemEffect("Library card"))
    } else if (skillCategories["Strength"].includes(task.name)) {
      task.xpMultipliers.push(getBindedTaskEffect("Strength"))
    } else if (skillCategories["Perception"].includes(task.name)) {
      task.xpMultipliers.push(getBindedTaskEffect("Perception"))
    } else if (skillCategories["Endurance"].includes(task.name)) {
      task.xpMultipliers.push(getBindedTaskEffect("Endurance"))
    } else if (skillCategories["Communicability"].includes(task.name)) {
      task.xpMultipliers.push(getBindedTaskEffect("Communicability"))
    } else if (skillCategories["Intelligence"].includes(task.name)) {
      task.xpMultipliers.push(getBindedTaskEffect("Intelligence"))
    } else if (skillCategories["Aptitude"].includes(task.name)) {
      task.xpMultipliers.push(getBindedTaskEffect("Aptitude"))
    } else if (skillCategories["Luckiness"].includes(task.name)) {
      task.xpMultipliers.push(getBindedTaskEffect("Luckiness"))
    }
  }

  for (itemName in gameData.itemData) {
    var item = gameData.itemData[itemName]
    item.expenseMultipliers = []
    item.expenseMultipliers.push(getBindedTaskEffect("Bargaining"))
    item.expenseMultipliers.push(getBindedTaskEffect("Stealth"))
  }
}

function setCustomEffects() {
  var bargaining = gameData.taskData["Bargaining"]
  bargaining.getEffect = function() {
    var multiplier = 1 - getBaseLog(7, bargaining.level + 1) / 10
    if (multiplier < 0.1) {multiplier = 0.1}
    return multiplier
  }

  var stealth = gameData.taskData["Stealth"]
  stealth.getEffect = function() {
    var multiplier = 1 - getBaseLog(7, stealth.level + 1) / 10
    if (multiplier < 0.1) {multiplier = 0.1}
    return multiplier
  }

  var waiting = gameData.taskData["Waiting"]
  waiting.getEffect = function() {
    var multiplier = 1 + getBaseLog(15, waiting.level + 1)
    return multiplier
  }

  // var immortality = gameData.taskData["Life Essence"]
  // immortality.getEffect = function() {
  //   var multiplier = 1 + getBaseLog(33, immortality.level + 1)
  //   return multiplier
  // }

  // var unholyRecall = gameData.taskData["Cosmic Recollection"];
  // unholyRecall.getEffect = function() {
  //   var multiplier = unholyRecall.level * 0.00065;
  //   return multiplier;
  // }
}

function getHappiness() {
  var meditationEffect = getBindedTaskEffect("Meditation")
  var agilityEffect = getBindedTaskEffect("Phenomenal agility")
  // var butlerEffect = getBindedItemEffect("Butler")
  var happiness = meditationEffect() * agilityEffect() * gameData.currentProperty.getEffect()
  return happiness
}

function getCorruption() {
  return gameData.corruption
}

function getEssence() {
  return gameData.essence
}

function applyMultipliers(value, multipliers) {
  var finalMultiplier = 1
  multipliers.forEach(
    function(multiplierFunction) {
      var multiplier = multiplierFunction()
      finalMultiplier *= multiplier
    }
  )
  var finalValue = Math.round(value * finalMultiplier)
  return finalValue
}

function applySpeed(value) {
  finalValue = value * getGameSpeed() / updateSpeed
  return finalValue
}

function getCorruptionGain() {
  // var evilControl = gameData.taskData["Evil Control"]
  // var corruption = evilControl.getEffect()
  return 1
}

function getEssenceGain() {
  // var essenceControl = gameData.taskData["Yin Yang"]
  // var essence = essenceControl.getEffect()
  return 1
}

function getGameSpeed() {
  var waiting = gameData.taskData["Waiting"]
  var timeWarpingSpeed = gameData.timeWarpingEnabled ? waiting.getEffect() : 1
  var gameSpeed = baseGameSpeed * +!gameData.paused * +isAlive() * timeWarpingSpeed
  return gameSpeed
}

function applyExpenses() {
  var coins = applySpeed(getExpense())
  gameData.coins -= coins
  if (gameData.coins < 0) {
    goBankrupt()
  }
}

function getExpense() {
  var expense = 0
  expense += gameData.currentProperty.getExpense()
  for (misc of gameData.currentMisc) {
    expense += misc.getExpense()
  }
  return expense
}

function goBankrupt() {
  gameData.coins = 0
  gameData.currentProperty = gameData.itemData["Parents house"]
  gameData.currentMisc = []
}

function initUI() {
  setStickySidebar(gameData.settings.stickySidebar);
}

function setTab(element, selectedTab) {
  var tabs = Array.prototype.slice.call(document.getElementsByClassName("tab"))
  tabs.forEach(
    function(tab) {
      tab.style.display = "none"
    }
  )
  document.getElementById(selectedTab).style.display = "block"

  var tabButtons = document.getElementsByClassName("tabButton")
  for (tabButton of tabButtons) {
    tabButton.classList.remove("w3-blue-gray")
  }
  element.classList.add("w3-blue-gray")
}

function setPause() {
  gameData.paused = !gameData.paused
}

function setTimeWarping() {
  gameData.timeWarpingEnabled = !gameData.timeWarpingEnabled
}

function setTask(taskName) {
  var task = gameData.taskData[taskName]
  task instanceof Job ? gameData.currentJob = task : gameData.currentSkill = task
}

function setProperty(propertyName) {
  var property = gameData.itemData[propertyName]
  gameData.currentProperty = property
}

function setMisc(miscName) {
  var misc = gameData.itemData[miscName]
  if (gameData.currentMisc.includes(misc)) {
    for (i = 0; i < gameData.currentMisc.length; i++) {
      if (gameData.currentMisc[i] == misc) {
        gameData.currentMisc.splice(i, 1)
      }
    }
  } else {
    gameData.currentMisc.push(misc)
  }
}

function createData(data, baseData) {
  for (key in baseData) {
    var entity = baseData[key]
    createEntity(data, entity)
  }
}

function createEntity(data, entity) {
  if ("income" in entity) {data[entity.name] = new Job(entity)}
  else if ("maxXp" in entity) {data[entity.name] = new Skill(entity)}
  else {data[entity.name] = new Item(entity)}
  data[entity.name].id = "row " + entity.name
}

function createRequiredRow(categoryName) {
  var requiredRow = document.getElementsByClassName("requiredRowTemplate")[0].content.firstElementChild.cloneNode(true)
  requiredRow.classList.add("requiredRow")
  requiredRow.classList.add(removeSpaces(categoryName))
  requiredRow.id = categoryName
  return requiredRow
}

function createHeaderRow(templates, categoryType, categoryName) {
  var headerRow = templates.headerRow.content.firstElementChild.cloneNode(true)
  headerRow.getElementsByClassName("category")[0].textContent = categoryName
  if (categoryType != itemCategories) {
    headerRow.getElementsByClassName("valueType")[0].textContent = categoryType == jobCategories ? "Income/day" : "Effect"
  }

  headerRow.style.backgroundColor = headerRowColors[categoryName]
  headerRow.style.color = "#ffffff"
  headerRow.classList.add(removeSpaces(categoryName))
  headerRow.classList.add("headerRow")

  return headerRow
}

function createRow(templates, name, categoryName, categoryType) {
  var row = templates.row.content.firstElementChild.cloneNode(true)
  row.getElementsByClassName("name")[0].textContent = name
  row.getElementsByClassName("tooltipText")[0].textContent = tooltips[name]
  row.id = "row " + name
  if (categoryType != itemCategories) {
    row.getElementsByClassName("progressBar")[0].onclick = function() {setTask(name)}
  } else {
    row.getElementsByClassName("button")[0].onclick = categoryName == "Properties" ? function() {setProperty(name)} : function() {setMisc(name)}
  }

  return row
}

function createAllRows(categoryType, tableId) {
  var templates = {
    headerRow: document.getElementsByClassName(categoryType == itemCategories ? "headerRowItemTemplate" : "headerRowTaskTemplate")[0],
    row: document.getElementsByClassName(categoryType == itemCategories ? "rowItemTemplate" : "rowTaskTemplate")[0],
  }

  var table = document.getElementById(tableId)

  for (categoryName in categoryType) {
    var headerRow = createHeaderRow(templates, categoryType, categoryName)
    table.appendChild(headerRow)

    var category = categoryType[categoryName]
    category.forEach(
      function(name) {
        var row = createRow(templates, name, categoryName, categoryType)
        table.appendChild(row)
      }
    )

    var requiredRow = createRequiredRow(categoryName)
    table.append(requiredRow)
  }
}

function updateQuickTaskDisplay(taskType) {
  var currentTask = taskType == "job" ? gameData.currentJob : gameData.currentSkill
  var quickTaskDisplayElement = document.getElementById("quickTaskDisplay")
  var progressBar = quickTaskDisplayElement.getElementsByClassName(taskType)[0]
  progressBar.getElementsByClassName("name")[0].textContent = currentTask.name + " lvl " + currentTask.level
  progressBar.getElementsByClassName("progressFill")[0].style.width = currentTask.xp / currentTask.getMaxXp() * 100 + "%"
}

function updateRequiredRows(data, categoryType) {
  var requiredRows = document.getElementsByClassName("requiredRow")
  for (requiredRow of requiredRows) {
    var nextEntity = null
    var category = categoryType[requiredRow.id]
    if (category == null) {continue}
    for (i = 0; i < category.length; i++) {
      var entityName = category[i]
      if (i >= category.length - 1) break
      var requirements = gameData.requirements[entityName]
      if (requirements && i == 0) {
        if (!requirements.isCompleted()) {
          nextEntity = data[entityName]
          break
        }
      }

      var nextIndex = i + 1
      if (nextIndex >= category.length) {break}
      var nextEntityName = category[nextIndex]
      nextEntityRequirements = gameData.requirements[nextEntityName]

      if (!nextEntityRequirements.isCompleted()) {
        nextEntity = data[nextEntityName]
        break
      }
    }

    if (nextEntity == null) {
      requiredRow.classList.add("hiddenTask")
    } else {
      requiredRow.classList.remove("hiddenTask")
      var requirementObject = gameData.requirements[nextEntity.name]
      var requirements = requirementObject.requirements

      var coinElement = requiredRow.getElementsByClassName("coins")[0]
      var levelElement = requiredRow.getElementsByClassName("levels")[0]
      var corruptionElement = requiredRow.getElementsByClassName("corruption")[0]
      var essenceElement = requiredRow.getElementsByClassName("essence")[0]

      coinElement.classList.add("hiddenTask")
      levelElement.classList.add("hiddenTask")
      corruptionElement.classList.add("hiddenTask")
      essenceElement.classList.add("hiddenTask")

      var finalText = ""
      if (data == gameData.taskData) {
        if (requirementObject instanceof CorruptionRequirement) {
          corruptionElement.classList.remove("hiddenTask")
          corruptionElement.textContent = format(requirements[0].requirement) + " corruption"
        } else if (requirementObject instanceof EssenceRequirement) {
          essenceElement.classList.remove("hiddenTask")
          essenceElement.textContent = format(requirements[0].requirement) + " essence"
        } else {
          levelElement.classList.remove("hiddenTask")
          for (requirement of requirements) {
            var task = gameData.taskData[requirement.task]
            if (task.level >= requirement.requirement) continue
            var text = " " + requirement.task + " level " + format(task.level) + "/" + format(requirement.requirement) + ","
            finalText += text
          }
          finalText = finalText.substring(0, finalText.length - 1)
          levelElement.textContent = finalText
        }
      }
      else if (data == gameData.itemData) {
        coinElement.classList.remove("hiddenTask")
        formatCoins(requirements[0].requirement, coinElement)
      }
    }
  }
}

function updateTaskRows() {
  for (key in gameData.taskData) {
    var task = gameData.taskData[key]
    var row = document.getElementById("row " + task.name)
    row.getElementsByClassName("level")[0].textContent = task.level
    row.getElementsByClassName("xpGain")[0].textContent = format(task.getXpGain())
    row.getElementsByClassName("xpLeft")[0].textContent = format(task.getXpLeft())

    var maxLevel = row.getElementsByClassName("maxLevel")[0]
    maxLevel.textContent = task.maxLevel
    gameData.rebirthOneCount > 0 ? maxLevel.classList.remove("hidden") : maxLevel.classList.add("hidden")

    var progressFill = row.getElementsByClassName("progressFill")[0]
    progressFill.style.width = task.xp / task.getMaxXp() * 100 + "%"
    task == gameData.currentJob || task == gameData.currentSkill ? progressFill.classList.add("current") : progressFill.classList.remove("current")

    var valueElement = row.getElementsByClassName("value")[0]
    valueElement.getElementsByClassName("income")[0].style.display = task instanceof Job
    valueElement.getElementsByClassName("effect")[0].style.display = task instanceof Skill

    var skipSkillElement = row.getElementsByClassName("skipSkill")[0]
    skipSkillElement.style.display = task instanceof Skill && autoLearnElement.checked ? "block" : "none"

    if (task instanceof Job) {
      formatCoins(task.getIncome(), valueElement.getElementsByClassName("income")[0])
    } else {
      valueElement.getElementsByClassName("effect")[0].textContent = task.getEffectDescription()
    }
  }
}

function setStickySidebar(sticky) {
  gameData.settings.stickySidebar = sticky;
  settingsStickySidebar.checked = sticky;
  info.style.position = sticky ? 'sticky' : 'initial';
}

function updateItemRows() {
  for (key in gameData.itemData) {
    var item = gameData.itemData[key]
    var row = document.getElementById("row " + item.name)
    var button = row.getElementsByClassName("button")[0]
    button.disabled = gameData.coins < item.getExpense()
    var active = row.getElementsByClassName("active")[0]
    var color = itemCategories["Properties"].includes(item.name) ? headerRowColors["Properties"] : headerRowColors["Misc"]
    active.style.backgroundColor = gameData.currentMisc.includes(item) || item == gameData.currentProperty ? color : "white"
    row.getElementsByClassName("effect")[0].textContent = item.getEffectDescription()
    formatCoins(item.getExpense(), row.getElementsByClassName("expense")[0])
  }
}

function updateHeaderRows(categories) {
  for (categoryName in categories) {
    var className = removeSpaces(categoryName)
    var headerRow = document.getElementsByClassName(className)[0]
    var maxLevelElement = headerRow.getElementsByClassName("maxLevel")[0]
    gameData.rebirthOneCount > 0 ? maxLevelElement.classList.remove("hidden") : maxLevelElement.classList.add("hidden")
    var skipSkillElement = headerRow.getElementsByClassName("skipSkill")[0]
    skipSkillElement.style.display = categories == skillCategories && autoLearnElement.checked ? "block" : "none"
  }
}

function updateText() {
  //Sidebar
  document.getElementById("ageDisplay").textContent = daysToYears(gameData.days)
  document.getElementById("dayDisplay").textContent = getDay()
  document.getElementById("lifespanDisplay").textContent = daysToYears(getLifespan())
  document.getElementById("pauseButton").textContent = gameData.paused ? "Play" : "Pause"

  formatCoins(gameData.coins, document.getElementById("coinDisplay"))
  setSignDisplay()
  formatCoins(getNet(), document.getElementById("netDisplay"))
  formatCoins(getIncome(), document.getElementById("incomeDisplay"))
  formatCoins(getExpense(), document.getElementById("expenseDisplay"))

  document.getElementById("happinessDisplay").textContent = getHappiness().toFixed(1)

  document.getElementById("corruptionDisplay").textContent = gameData.corruption.toFixed(1)
  document.getElementById("corruptionGainDisplay").textContent = getCorruptionGain().toFixed(1)

  document.getElementById("essenceDisplay").textContent = gameData.essence.toFixed(1)
  document.getElementById("essenceGainDisplay").textContent = getEssenceGain().toFixed(1)

  document.getElementById("timeWarpingDisplay").textContent = "x" + (1).toFixed(1) //gameData.taskData["Time Warping"].getEffect() * gameData.taskData["Temporal Dimension"].getEffect() * gameData.taskData["Time Loop"].getEffect()
  document.getElementById("timeWarpingButton").textContent = gameData.timeWarpingEnabled ? "Disable warp" : "Enable warp"
}

function setSignDisplay() {
  var signDisplay = document.getElementById("signDisplay")
  if (getIncome() > getExpense()) {
    signDisplay.textContent = "+"
    signDisplay.style.color = "green"
  } else if (getExpense() > getIncome()) {
    signDisplay.textContent = "-"
    signDisplay.style.color = "red"
  } else {
    signDisplay.textContent = ""
    signDisplay.style.color = "gray"
  }
}

function getNet() {
  var net = Math.abs(getIncome() - getExpense())
  return net
}

function hideEntities() {
  for (key in gameData.requirements) {
    var requirement = gameData.requirements[key]
    var completed = requirement.isCompleted()
    for (element of requirement.elements) {
      if (completed) {
        element.classList.remove("hidden")
      } else {
        element.classList.add("hidden")
      }
    }
  }
}

function createItemData(baseData) {
  for (var item of baseData) {
    gameData.itemData[item.name] = "happiness" in item ? new Property(task) : new Misc(task)
    gameData.itemData[item.name].id = "item " + item.name
  }
}

function doCurrentTask(task) {
  task.increaseXp()
  if (task instanceof Job) {
    increaseCoins()
  }
}

function getIncome() {
  var income = 0
  income += gameData.currentJob.getIncome()
  return income
}

function increaseCoins() {
  var coins = applySpeed(getIncome())
  gameData.coins += coins
}

function daysToYears(days) {
  var years = Math.floor(days / 365)
  return years
}

function getCategoryFromEntityName(categoryType, entityName) {
  for (categoryName in categoryType) {
    var category = categoryType[categoryName]
    if (category.includes(entityName)) {
      return category
    }
  }
}

function getNextEntity(data, categoryType, entityName) {
  var category = getCategoryFromEntityName(categoryType, entityName)
  var nextIndex = category.indexOf(entityName) + 1
  if (nextIndex > category.length - 1) return null
  var nextEntityName = category[nextIndex]
  var nextEntity = data[nextEntityName]
  return nextEntity
}

function autoPromote() {
  if (!autoPromoteElement.checked) return
  var nextEntity = getNextEntity(gameData.taskData, jobCategories, gameData.currentJob.name)
  if (nextEntity == null) return
  var requirement = gameData.requirements[nextEntity.name]
  if (requirement.isCompleted()) gameData.currentJob = nextEntity
}

function checkSkillSkipped(skill) {
  var row = document.getElementById("row " + skill.name)
  var isSkillSkipped = row.getElementsByClassName("checkbox")[0].checked
  return isSkillSkipped
}

function setSkillWithLowestMaxXp() {
  var enabledSkills = []

  for (skillName in gameData.taskData) {
    var skill = gameData.taskData[skillName]
    var requirement = gameData.requirements[skillName]
    if (skill instanceof Skill) {
      if(requirement == null) {
        requirement = gameData.requirements["Slacking"];
      }
      if (requirement.isCompleted() && !checkSkillSkipped(skill)) {
        enabledSkills.push(skill)
      }
    }
  }

  if (enabledSkills.length == 0) {
    skillWithLowestMaxXp = gameData.taskData["Slacking"]
    return
  }

  enabledSkills.sort((lhs, rhs) => { return lhs.getMaxXp() / lhs.getXpGain() - rhs.getMaxXp() / rhs.getXpGain() })

  var skillName = enabledSkills[0].name
  skillWithLowestMaxXp = gameData.taskData[skillName]
}

function getKeyOfLowestValueFromDict(dict) {
  var values = []
  for (key in dict) {
    var value = dict[key]
    values.push(value)
  }

  values.sort(function(a, b){return a - b})

  for (key in dict) {
    var value = dict[key]
    if (value == values[0]) {
      return key
    }
  }
}

function autoLearn() {
  if (!autoLearnElement.checked || !skillWithLowestMaxXp) return
  gameData.currentSkill = skillWithLowestMaxXp
}

function yearsToDays(years) {
  var days = years * 365
  return days
}

function getDay() {
  var day = Math.floor(gameData.days - daysToYears(gameData.days) * 365)
  return day
}

function increaseDays() {
  var increase = applySpeed(1)
  gameData.days += increase
}

function format(number,decimals= 1) {
  // what tier? (determines SI symbol)
  var tier = Math.log10(number) / 3 | 0;
  // if zero, we don't need a suffix
  if(tier == 0) return number;
  // get suffix and determine scale
  var suffix = units[tier];
  var scale = Math.pow(10, tier * 3);
  // scale the number
  var scaled = number / scale;
  // format number and add suffix
  return scaled.toFixed(decimals) + suffix;
}

function formatCoins(coins, element) {
  var tiers = ["c", "s", "g", "p"]
  var colors = {
    "p": "#79b9c7",
    "g": "#E5C100",
    "s": "#a8a8a8",
    "c": "#a15c2f"
  }
  for (var i = 0 ; i < tiers.length ; i++) {
    var tier = tiers[i]
    if (coins >= Math.pow(1000, i)) {
      element.children[0].style.color = colors[tier]
    }
  }
  var text = Math.floor(coins)
  element.children[0].textContent = format(String(text),1) + " $"
}

function getTaskElement(taskName) {
  var task = gameData.taskData[taskName]
  var element = document.getElementById(task.id)
  return element
}

function getItemElement(itemName) {
  var item = gameData.itemData[itemName]
  var element = document.getElementById(item.id)
  return element
}

function getElementsByClass(className) {
  var elements = document.getElementsByClassName(removeSpaces(className))
  return elements
}

function setLightDarkMode() {
  var body = document.getElementById("body")
  body.classList.contains("dark") ? body.classList.remove("dark") : body.classList.add("dark")
}

function removeSpaces(string) {
  var string = string.replace(/ /g, "")
  return string
}

function rebirthOne() {
  gameData.rebirthOneCount += 1
  rebirthReset()
}

function rebirthTwo() {
  gameData.rebirthTwoCount += 1
  gameData.corruption += getCorruptionGain()
  rebirthReset()
  for (taskName in gameData.taskData) {
    var task = gameData.taskData[taskName]
    task.maxLevel = 0
  }
}

function rebirthThree() {
  gameData.rebirthThreeCount += 1
	if (gameData.essence < 30000) {
	  gameData.essence += getEssenceGain()
	} else {
		gameData.essence += getEssenceGain() * 1.5;
	}
	gameData.corruption = 0
  rebirthReset()
	for (taskName in gameData.taskData) {
    var task = gameData.taskData[taskName]
    task.maxLevel = Math.floor(task.maxLevel);
  }
}

function rebirthReset() {
  setTab(jobTabButton, "jobs")
  gameData.coins = 0
  gameData.days = 365 * 15
  gameData.currentJob = gameData.taskData["Slacker"]
  gameData.currentSkill = gameData.taskData["Slacking"]
  gameData.currentProperty = gameData.itemData["Parents house"]
  gameData.currentMisc = []
  for (taskName in gameData.taskData) {
    var task = gameData.taskData[taskName]
    if (task.level > task.maxLevel) task.maxLevel = task.level
    task.level = 0
    task.xp = 0
  }
  for (key in gameData.requirements) {
    var requirement = gameData.requirements[key]
    if (requirement.completed && permanentUnlocks.includes(key)) continue
    requirement.completed = false
  }
}

function getLifespan() {
  // var immortality = gameData.taskData["Life Essence"]
  // var superImmortality = gameData.taskData["Astral Body"]
  // var higherDimensions = gameData.taskData["Higher Dimensions"]
  // var abyss = gameData.taskData["Ceaseless Abyss"]
  // var cosmicLongevity = gameData.taskData["Cosmic Longevity"]
  var coinPile = 20 * getBaseLog(10, gameData.coins + 1)
  var corruptionProlongation = 25 * getBaseLog(30, gameData.corruption + 1)
  var lifespan = baseLifespan + coinPile + corruptionProlongation //* immortality.getEffect() * superImmortality.getEffect() * abyss.getEffect() * cosmicLongevity.getEffect() * higherDimensions.getEffect()
  return lifespan
}

function isAlive() {
  var condition = gameData.days < getLifespan()
  var deathText = document.getElementById("deathText")
  if (!condition) {
    gameData.days = getLifespan()
    deathText.classList.remove("hidden")
  }
  else {
    deathText.classList.add("hidden")
  }
  return condition
}

function assignMethods() {
  for (key in gameData.taskData) {
    var task = gameData.taskData[key]
    if (task.baseData.income) {
      task.baseData = jobBaseData[task.name]
      task = Object.assign(new Job(jobBaseData[task.name]), task)
    } else {
      task.baseData = skillBaseData[task.name]
      task = Object.assign(new Skill(skillBaseData[task.name]), task)
    }
    gameData.taskData[key] = task
  }
  for (key in gameData.itemData) {
    var item = gameData.itemData[key]
    item.baseData = itemBaseData[item.name]
    item = Object.assign(new Item(itemBaseData[item.name]), item)
    gameData.itemData[key] = item
  }
  for (key in gameData.requirements) {
    var requirement = gameData.requirements[key]
    if (requirement.type == "task") {
      requirement = Object.assign(new TaskRequirement(requirement.elements, requirement.requirements), requirement)
    } else if (requirement.type == "coins") {
      requirement = Object.assign(new CoinRequirement(requirement.elements, requirement.requirements), requirement)
    } else if (requirement.type == "age") {
      requirement = Object.assign(new AgeRequirement(requirement.elements, requirement.requirements), requirement)
    } else if (requirement.type == "corruption") {
      requirement = Object.assign(new CorruptionRequirement(requirement.elements, requirement.requirements), requirement)
    } else if (requirement.type == "essence") {
      requirement = Object.assign(new EssenceRequirement(requirement.elements, requirement.requirements), requirement)
    }

    var tempRequirement = tempData["requirements"][key]
    requirement.elements = tempRequirement.elements
    requirement.requirements = tempRequirement.requirements
    gameData.requirements[key] = requirement
  }
  gameData.currentJob = gameData.taskData[gameData.currentJob.name]
  gameData.currentSkill = gameData.taskData[gameData.currentSkill.name]
  gameData.currentProperty = gameData.itemData[gameData.currentProperty.name]
  var newArray = []
  for (misc of gameData.currentMisc) {
    newArray.push(gameData.itemData[misc.name])
  }
  gameData.currentMisc = newArray
}

function replaceSaveDict(dict, saveDict) {
  for (key in dict) {
    if (!(key in saveDict)) {
      saveDict[key] = dict[key]
    } else if (dict == gameData.requirements) {
      if (saveDict[key].type != tempData["requirements"][key].type) {
        saveDict[key] = tempData["requirements"][key]
      }
    }
  }
  for (key in saveDict) {
    if (!(key in dict)) {
      delete saveDict[key]
    }
  }
}

function saveGameData() {
  localStorage.setItem("gameDataSave", JSON.stringify(gameData))
}

function loadGameData() {
  var gameDataSave = JSON.parse(localStorage.getItem("gameDataSave"))
  if (gameDataSave !== null) {
    replaceSaveDict(gameData, gameDataSave)
    replaceSaveDict(gameData.requirements, gameDataSave.requirements)
    replaceSaveDict(gameData.taskData, gameDataSave.taskData)
    replaceSaveDict(gameData.itemData, gameDataSave.itemData)
    replaceSaveDict(gameData.settings, gameDataSave.settings)
    gameData = gameDataSave
  }
  assignMethods()
}

function updateUI() {
  updateTaskRows()
  updateItemRows()
  updateRequiredRows(gameData.taskData, jobCategories)
  updateRequiredRows(gameData.taskData, skillCategories)
  updateRequiredRows(gameData.itemData, itemCategories)
  updateHeaderRows(jobCategories)
  updateHeaderRows(skillCategories)
  updateQuickTaskDisplay("job")
  updateQuickTaskDisplay("skill")
  hideEntities()
  updateText()
}

function update() {
  increaseDays()
  autoPromote()
  autoLearn()
  doCurrentTask(gameData.currentJob)
  doCurrentTask(gameData.currentSkill)
  applyExpenses()
  updateUI()
}

function resetGameData() {
  localStorage.clear()
  location.reload()
}

function importGameData() {
  var importExportBox = document.getElementById("importExportBox")
  var data = JSON.parse(window.atob(importExportBox.value))
  gameData = data
  saveGameData()
  location.reload()
}

function exportGameData() {
  var importExportBox = document.getElementById("importExportBox")
  importExportBox.value = window.btoa(JSON.stringify(gameData))
}

// Keyboard shortcuts + Loadouts ( courtesy of Pseiko )

function changeTab(direction){
  var tabs = Array.prototype.slice.call(document.getElementsByClassName("tab"))
  var tabButtons = Array.prototype.slice.call(document.getElementsByClassName("tabButton"))
  var currentTab = 0
  for (i in tabs) {
    if (!tabs[i].style.display.includes("none")) currentTab = i*1
  }
  var targetTab = currentTab+direction
  targetTab = Math.max(0,targetTab)
  if( targetTab > (tabs.length-1)) targetTab = 0
  while(tabButtons[targetTab].style.display.includes("none")){
    targetTab = targetTab+direction
    targetTab = Math.max(0,targetTab)
    if( targetTab > (tabs.length-1)) targetTab = 0
  }
	button = tabButtons[targetTab]
	setTab(button, tabs[targetTab].id)
}

loadouts = {}

function saveLoadout(num){
	loadouts[num] = {
		job : gameData.currentJob.name,
		skill: gameData.currentSkill.name,
		property:gameData.currentProperty.name,
		misc: []
	}
	for (i in gameData.currentMisc) loadouts[num].misc.push(gameData.currentMisc[i].name)
}

function loadLoadout(num){
	if (num in loadouts) {
		gameData.currentMisc = []
		for (i in  loadouts[num].misc) setMisc( loadouts[num].misc[i])
		setProperty(loadouts[num].property)
		setTask(loadouts[num].skill)
		setTask(loadouts[num].job)
	}
  document.getElementById("autoLearn").checked = false
  document.getElementById("autoPromote").checked= false
}

window.addEventListener('keydown', function(e) {
  if (e.key == "1" && e.altKey) saveLoadout(1)
  if (e.key == "1" ) loadLoadout(1)
  if (e.key == "2" && e.altKey) saveLoadout(2)
  if (e.key == "2" ) loadLoadout(2)
  if (e.key == "3" && e.altKey) saveLoadout(3)
  if (e.key == "3" ) loadLoadout(3)

	if(e.key==" " && !e.repeat ) {
		setPause()
		if(e.target == document.body) {
			e.preventDefault();
		}
	}
  if(e.key=="ArrowRight") changeTab(1)
  if(e.key=="ArrowLeft") changeTab(-1)
  if(e.key=="l" || e.key=="L") document.getElementById("autoLearn").checked = !document.getElementById("autoLearn").checked
  if(e.key=="p" || e.key=="P") document.getElementById("autoPromote").checked = !document.getElementById("autoPromote").checked
});

//Init

createAllRows(jobCategories, "jobTable")
createAllRows(skillCategories, "skillTable")
createAllRows(itemCategories, "itemTable")

createData(gameData.taskData, jobBaseData)
createData(gameData.taskData, skillBaseData)
createData(gameData.itemData, itemBaseData)

gameData.currentJob = gameData.taskData["Slacker"]
gameData.currentSkill = gameData.taskData["Slacking"]
gameData.currentProperty = gameData.itemData["Parents house"]
gameData.currentMisc = []

gameData.requirements = {
  //Other
  // "The Arcane Association": new TaskRequirement(getElementsByClass("The Arcane Association"), [{task: "Intelligence", requirement: 200}, {task: "Meditation", requirement: 200}]),
  // "Galactic Council": new AgeRequirement(getElementsByClass("Galactic Council"), [{requirement: 10000}]),
  // "The Void": new AgeRequirement(getElementsByClass("The Void"), [{requirement: 1000}]),
  // "Void Manipulation": new AgeRequirement(getElementsByClass("Void Manipulation"), [{requirement: 1000}]),
  // "Celestial Powers": new AgeRequirement(getElementsByClass("Celestial Powers"), [{requirement: 10000}]),
  // "Dark Magic": new CorruptionRequirement(getElementsByClass("Dark Magic"), [{requirement: 1}]),
  // "Almightiness": new EssenceRequirement(getElementsByClass("Almightiness"), [{requirement: 1}]),
  "Service": new TaskRequirement(getElementsByClass("Service"), [{task: "Slacker", requirement: 10}, {task: "Endurance", requirement: 5}]),
  "Military": new TaskRequirement(getElementsByClass("Military"), [{task: "Slacker", requirement: 10}, {task: "Strength", requirement: 20}]),
  "Media": new TaskRequirement(getElementsByClass("Media"), [{task: "Slacker", requirement: 10}, {task: "Communicability", requirement: 10}]),
  "IT": new TaskRequirement(getElementsByClass("IT"), [{task: "Slacker", requirement: 10}, {task: "Intelligence", requirement: 10}]),
  "Medical science": new TaskRequirement(getElementsByClass("Medical science"), [{task: "Slacker", requirement: 10}, {task: "Perception", requirement: 5}]),
  "Science": new TaskRequirement(getElementsByClass("Science"), [{task: "Slacker", requirement: 10}, {task: "Intelligence", requirement: 5}]),
  "Body": new TaskRequirement(getElementsByClass("Body"), [{task: "Slacking", requirement: 5}]),
  "Mind": new TaskRequirement(getElementsByClass("Mind"), [{task: "Slacking", requirement: 5}]),
  "Strength cat": new TaskRequirement(getElementsByClass("Strength"), [{task: "Strength", requirement: 5}]),
  "Perception cat": new TaskRequirement(getElementsByClass("Perception"), [{task: "Perception", requirement: 5}]),
  "Endurance cat": new TaskRequirement(getElementsByClass("Endurance"), [{task: "Endurance", requirement: 5}]),
  "Communicability cat": new TaskRequirement(getElementsByClass("Communicability"), [{task: "Communicability", requirement: 5}]),
  "Intelligence cat": new TaskRequirement(getElementsByClass("Intelligence"), [{task: "Intelligence", requirement: 5}]),
  "Aptitude cat": new TaskRequirement(getElementsByClass("Aptitude"), [{task: "Aptitude", requirement: 5}]),
  "Luckiness cat": new TaskRequirement(getElementsByClass("Luckiness"), [{task: "Luckiness", requirement: 5}]),
  "Shop": new CoinRequirement([document.getElementById("shopTabButton")], [{requirement: gameData.itemData["Hostel"].getExpense() * 50}]),
  "Rebirth tab": new AgeRequirement([document.getElementById("rebirthTabButton")], [{requirement: 25}]),
  "Rebirth note 1": new AgeRequirement([document.getElementById("rebirthNote1")], [{requirement: 45}]),
  "Rebirth note 2": new AgeRequirement([document.getElementById("rebirthNote2")], [{requirement: 65}]),
  "Rebirth note 3": new AgeRequirement([document.getElementById("rebirthNote3")], [{requirement: 200}]),
  "Rebirth note 4": new AgeRequirement([document.getElementById("rebirthNote4")], [{requirement: 1000}]),
  "Rebirth note 4": new AgeRequirement([document.getElementById("rebirthNote4")], [{requirement: 1000}]),
  "Rebirth note 5": new AgeRequirement([document.getElementById("rebirthNote5")], [{requirement: 10000}]),
  "Rebirth note 6": new TaskRequirement([document.getElementById("rebirthNote6")], [{task: "Perception", requirement: 100000}]),
  "Corruption info": new CorruptionRequirement([document.getElementById("corruptionInfo")], [{requirement: 1}]),
  "Essence info": new EssenceRequirement([document.getElementById("essenceInfo")], [{requirement: 1}]),
  "Time warping info": new TaskRequirement([document.getElementById("timeWarping")], [{task: "Waiting", requirement: 1}]),

  "Automation": new AgeRequirement([document.getElementById("automation")], [{requirement: 20}]),
  "Quick task display": new AgeRequirement([document.getElementById("quickTaskDisplay")], [{requirement: 20}]),

  // Jobs
  "Slacker": new TaskRequirement([getTaskElement("Slacker")], []),
  "Mail boy": new TaskRequirement([getTaskElement("Mail boy")], [{task: "Slacker", requirement: 20}]),
  "Sweeper": new TaskRequirement([getTaskElement("Sweeper")], [{task: "Mail boy", requirement: 20}]),

  //Service
  "Cleaner": new TaskRequirement([getTaskElement("Cleaner")], [{task: "Slacker", requirement: 10}, {task: "Endurance", requirement: 10}]),
  "Shop boy": new TaskRequirement([getTaskElement("Shop boy")], [{task: "Cleaner", requirement: 30}, {task: "Endurance", requirement: 30}]),

  //Military
  "Rookie": new TaskRequirement([getTaskElement("Rookie")], [{task: "Slacker", requirement: 30}, {task: "Strength", requirement: 30}]),
  "Experienced soldier": new TaskRequirement([getTaskElement("Experienced soldier")], [{task: "Rookie", requirement: 30}, {task: "Strength", requirement: 50}]),

  //Media
  "Background actor": new TaskRequirement([getTaskElement("Background actor")], [{task: "Slacker", requirement: 20}, {task: "Communicability", requirement: 20}]),
  "Streamer": new TaskRequirement([getTaskElement("Streamer")], [{task: "Background actor", requirement: 30}, {task: "Communicability", requirement: 30}, {task: "Artistry", requirement: 20}]),

  //IT
  "Support 1st line": new TaskRequirement([getTaskElement("Support 1st line")], [{task: "Slacker", requirement: 20}, {task: "Intelligence", requirement: 20}]),
  "Support 2nd line": new TaskRequirement([getTaskElement("Support 2nd line")], [{task: "Support 1st line", requirement: 30}, {task: "Intelligence", requirement: 30}, {task: "Tech understanding", requirement: 20}]),

  // Medical science
  "Nurse": new TaskRequirement([getTaskElement("Nurse")], [{task: "Slacker", requirement: 10}, {task: "Perception", requirement: 10}]),
  "General doctor": new TaskRequirement([getTaskElement("General doctor")], [{task: "Nurse", requirement: 30}, {task: "Perception", requirement: 30}, {task: "Intelligence", requirement: 30}]),

  // Science
  "Student": new TaskRequirement([getTaskElement("Student")], [{task: "Slacker", requirement: 10}, {task: "Intelligence", requirement: 10}]),
  "Graduate": new TaskRequirement([getTaskElement("Graduate")], [{task: "Student", requirement: 30}, {task: "Intelligence", requirement: 30}, {task: "Communicability", requirement: 30}]),

  // Skills
  "Slacking": new TaskRequirement([getTaskElement("Slacking")], []),
  "Waiting": new TaskRequirement([getTaskElement("Waiting")], [{task: "Slacking", requirement: 200}]),

  //Body
  "Strength": new TaskRequirement([getTaskElement("Strength")], [{task: "Slacking", requirement: 10}]),
  "Perception": new TaskRequirement([getTaskElement("Perception")], [{task: "Strength", requirement: 10}]),
  "Endurance": new TaskRequirement([getTaskElement("Endurance")], [{task: "Strength", requirement: 10}]),

  // Mind
  "Communicability": new TaskRequirement([getTaskElement("Communicability")], [{task: "Slacking", requirement: 10}]),
  "Intelligence": new TaskRequirement([getTaskElement("Intelligence")], [{task: "Communicability", requirement: 10}]),
  "Aptitude": new TaskRequirement([getTaskElement("Aptitude")], [{task: "Intelligence", requirement: 10}]),
  "Luckiness": new TaskRequirement([getTaskElement("Luckiness")], [{task: "Aptitude", requirement: 10}]),

  //Strength
  "Muscle memory": new TaskRequirement([getTaskElement("Muscle memory")], [{task: "Strength", requirement: 10}]),
  "Muscle mass": new TaskRequirement([getTaskElement("Muscle mass")], [{task: "Strength", requirement: 30}, {task: "Endurance", requirement: 30}]),

  // Perception
  "Concentration": new TaskRequirement([getTaskElement("Concentration")], [{task: "Perception", requirement: 10}]),
  "Stealth": new TaskRequirement([getTaskElement("Stealth")], [{task: "Perception", requirement: 30}, {task: "Luckiness", requirement: 30}]),

  // Endurance
  "Walking": new TaskRequirement([getTaskElement("Walking")], [{task: "Endurance", requirement: 10}]),
  "Strong stomach": new TaskRequirement([getTaskElement("Strong stomach")], [{task: "Endurance", requirement: 30}, {task: "Strength", requirement: 30}]),

  // Communicability
  "Bargaining": new TaskRequirement([getTaskElement("Bargaining")], [{task: "Communicability", requirement: 10}]),
  "Artistry": new TaskRequirement([getTaskElement("Artistry")], [{task: "Communicability", requirement: 30}, {task: "Perception", requirement: 30}]),

  // Intelligence
  "Programming": new TaskRequirement([getTaskElement("Programming")], [{task: "Intelligence", requirement: 10}]),
  "Tactics": new TaskRequirement([getTaskElement("Tactics")], [{task: "Intelligence", requirement: 30}, {task: "Strength", requirement: 30}]),
  "Meditation": new TaskRequirement([getTaskElement("Meditation")], [{task: "Intelligence", requirement: 60}, {task: "Concentration", requirement: 60}]),

  // Aptitude
  "Productivity": new TaskRequirement([getTaskElement("Productivity")], [{task: "Aptitude", requirement: 10}]),
  "Tech understanding": new TaskRequirement([getTaskElement("Tech understanding")], [{task: "Aptitude", requirement: 30}, {task: "Intelligence", requirement: 30}]),

  // Luckiness
  "Right in time": new TaskRequirement([getTaskElement("Right in time")], [{task: "Luckiness", requirement: 10}]),
  "Phenomenal agility": new TaskRequirement([getTaskElement("Phenomenal agility")], [{task: "Luckiness", requirement: 30}, {task: "Perception", requirement: 30}]),

  //Properties
  "Parents house": new CoinRequirement([getItemElement("Parents house")], [{requirement: 0}]),
  "Hostel": new CoinRequirement([getItemElement("Hostel")], [{requirement: 0}]),
  "3-star hotel room": new CoinRequirement([getItemElement("3-star hotel room")], [{requirement: gameData.itemData["3-star hotel room"].getExpense() * 100}]),
  "5-star hotel room": new CoinRequirement([getItemElement("5-star hotel room")], [{requirement: gameData.itemData["5-star hotel room"].getExpense() * 100}]),
  "Small apartment": new CoinRequirement([getItemElement("Small apartment")], [{requirement: gameData.itemData["Small apartment"].getExpense() * 100}]),
  "Apartment": new CoinRequirement([getItemElement("Apartment")], [{requirement: gameData.itemData["Apartment"].getExpense() * 100}]),

  //Misc
  "Library card": new CoinRequirement([getItemElement("Library card")], [{requirement: 0}]),
  "Gym membership": new CoinRequirement([getItemElement("Gym membership")], [{requirement: gameData.itemData["Gym membership"].getExpense() * 100}]),
}

tempData["requirements"] = {}
for (key in gameData.requirements) {
  var requirement = gameData.requirements[key]
  tempData["requirements"][key] = requirement
}

loadGameData()

initUI()

setCustomEffects()
addMultipliers()

setTab(jobTabButton, "jobs")

update()
setInterval(update, 1000 / updateSpeed)
setInterval(saveGameData, 3000)
setInterval(setSkillWithLowestMaxXp, 1000)
