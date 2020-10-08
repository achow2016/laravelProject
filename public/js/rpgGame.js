//city image at story from
//https://www.pexels.com/photo/aerial-view-and-grayscale-photography-of-high-rise-buildings-1105766/

//game data
//8 x 8 tiles, defines points of interest
var mapObj = [
	{ "name":"intro" , "defaultTile":"/img/rpgTiles/grass.png", "startPoint":[4,1], "endPoint":[4,7], "chest":"" } 
];

var weaponObj = [
	{ "name":"wood sword" , "damage":"1" },
	{ "name":"bronze sword" , "damage":"2" },
	{ "name":"iron sword" , "damage":"7" }
];

var armourObj = [
	{ "name":"cloth armour" , "reduction":"0" }, 
	{ "name":"leather armour" , "reduction":"1" }, 
	{ "name":"brigadine armour" , "reduction":"3" } 
];
	
//ST, EN, LI is strength(atk), endurance(sp), life(hp)	
//for android only
var implantObj = [
	{ "name":"pain inhibitor" , "effect":"reduce damage", "buffPercent":"10" }, 
	{ "name":"fatigue inhibitor" , "effect":"increase agility", "buffPercent":"10" }, 
	{ "name":"steroid booster" , "effect":"increase ST-EN-LI", "buffPercent":"10" },
	{ "name":"battlefield aid" , "effect":"regenerate LI-EN", "buffPercent":"1" }
];	

//skill percent is if attacking
var personalityObj = [
	{ "type":"aggressive" , "attackPercent":"100", "defendPercent":"0", "skillPercent":"25", "staminaCautionThreshold":"3"}, 
	/*
	{ "type":"aggressive" , "attackPercent":"100", "defendPercent":"0", "skillPercent":"50", "staminaCautionThreshold":"4"}, 
	{ "type":"defensive" , "attackPercent":"50", "defendPercent":"50", "skillPercent":"0", "staminaCautionThreshold":"3"},
	{ "type":"tactical" , "attackPercent":"50", "defendPercent":"50", "skillPercent":"50", "staminaCautionThreshold":"3"}
	*/
];	
	
var enemyObj = [
	{ "name":"guard", "race":"human", "actorClass":"none", "health":"70", "attack":"10", "stamina":"100", "staminaRegen":"10", "healthRegen":"0", "baseAttackCost":"10", "agility":"10", "skills":"Arm Smash", "avatar":"/img/enemyFace.jpg" },
];

var raceObj = [
	{ "race":"human", "health":"100", "attack":"10", "stamina":"100", "staminaRegen":"10", "healthRegen":"0", "baseAttackCost":"10", "agility":"10", "avatar":"/img/playerFace.jpg", "melee":"/img/playerFaceMelee.jpg" },
	{ "race":"android", "health":"150", "attack":"15", "stamina":"150", "staminaRegen":"15", "healthRegen":"1", "baseAttackCost":"7", "agility":"15", "avatar":"/img/playerFace.jpg", "melee":"/img/playerFaceMelee.jpg" }
];		

var storyObj = [
	{ 
		"chapter":"0",
		"title":"opening chapter", 
		"storyImage":"/img/chapterImages/cityNight.jpg", 
		"pageLength":"6",
		"enemyCount":"2",
		"enemy": [
			"guard",
			"guard"
		],
		"enemyEquipmentTier" :"1",
		"enemyCoords":[[4,8],[4,4]],
		"pages" : [
			"Welcome to rpgGame!",
			"You are a slave working at an arena where people pay to watch slaves fight each other and wild animals for entertainment.",
			"Despite being enslaved the slaves are well fed and looked after in order to ensure that they provide maximum entertainment for guests.",
			"One day, while preparing to receive a shipment of food you notice that there are less guards than usual assigned to watch your work area.", 
			"This could be opportunity to escape. Despite not being assigned to fight, you have received the same training as some of the substitute fighters in the arena.",
			"What will you do?"			
		],
		"nextState":[
			{"itemGift" : [
				{"name":"First Aid Injector", "quantity":"1"},
				{"name":"Small Treatment Kit", "quantity":"1"},
				{"name":"Throwing Stone", "quantity":"1"},
			]},
			{"map" : "intro"}
		]	
	},
	{ 
		"chapter":"1",
		"title":"chapter two", 
		"storyImage":"/img/chapterImages/cityNight.jpg", 
		"pageLength":"3",
		"pages" : [
			"Welcome to the story chapter two!",
			"Page two of story!",
			"Final page of story!"
		],
		"nextState":[
			{"itemGift" : "First Aid Injector"},
			{"fight" : "pickpocket"}
		]	
	},
];

//stance is 000000000
//0 is exposed to attack
//target is 1 for targeted parts
//left upper, head, right upper, left mid, torso, right mid, left leg, groin, right leg 

var meleeSkillObj = [
	{ "name":"Arm Smash", "bodyTarget":"100100000", "stanceResult":"110110111", "debuff":"Attack Reduction", "debuffPercent":"10", "debuffDuration":"10", "effect":"none", "range":"0", "effectQuantity":"1", "percent":"100", "meleePercentagePenalty":"10", "staminaCost":"5" },
	{ "name":"Advancing Swing II", "bodyTarget":"100100000", "stanceResult":"110110111", "debuff":"none", "effect":"Decrease Distance", "range":"2", "effectQuantity":"1", "percent":"100", "meleePercentagePenalty":"0", "staminaCost":"10" },
	{ "name":"Retreating Cut II", "bodyTarget":"100100000", "stanceResult":"110110111", "debuff":"none", "effect":"Increase Distance", "range":"6", "effectQuantity":"2", "percent":"100", "meleePercentagePenalty":"50", "staminaCost":"10" },
	{ "name":"Heavy Attack", "bodyTarget":"100100000", "stanceResult":"100100110", "debuff":"none", "effect":"none", "range":"0", "effectQuantity":"1", "percent":"100", "meleePercentagePenalty":"-100", "staminaCost":"20" }
];

var itemObj = [
	{ "name":"First Aid Injector" , "effect":"Regen", "effectStackLimit":"1", "effectPercent":"5", "cost":"10", "duration":"10"},
	{ "name":"Small Treatment Kit" , "effect":"Regen", "effectStackLimit":"1", "effectPercent":"30", "cost":"10", "duration":"1"},
	{ "name":"Throwing Stone" , "effect":"Direct Damage", "effectStackLimit":"1", "effectPercent":"100", "cost":"0", "duration":"1"}
];

//random helper function
function getRandomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}

//for storing a buff status, placed in player buff array
class BuffStatus {
	constructor(name, effect, stackLimit, effectPercent, duration) {
		this.name = name;
		this.effect = effect;
		this.stackLimit = stackLimit;
		this.effectPercent = effectPercent;
		this.duration = duration;
		this.stackCount = 1;
		this.effectNumberAmount = 0;
	}
	
	setEffectNumberAmount(amount) {
		this.effectNumberAmount = amount;	
	}

	getEffectNumberAmount() {
		return this.effectNumberAmount;	
	}	

	getName() {
		return this.name;	
	}	
	
	setName(name) {
		this.name = name;	
	}	
	
	getEffect() {
		return this.effect;	
	}	
	
	setEffect(effect) {
		this.effect = effect;	
	}
	
	getDuration() {
		return this.duration;	
	}	
	
	setDuration(duration) {
		this.duration = duration;	
	}	
	
	tickDuration() {
		this.duration--;
	}		
	
	getStackCount() {
		return this.stackCount;	
	}	
	
	setStackCount(count) {
		this.stackCount = count;	
	}		
	
	incrementStackCount() {
		this.stackCount++;
	}
	
	getStackLimit() {
		return this.stackLimit;	
	}	
	
	setStackLimit(stackLimit) {
		this.stackLimit = stackLimit;	
	}
	
	getEffectPercent() {
		return this.effectPercent;	
	}	
	
	setEffectPercent(effectPercent) {
		this.effectPercent = effectPercent;	
	}		
}

//inventory item object 
class Item {
	constructor(name, effect, stackLimit, effectPercent, cost, duration, quantity) {
		this.name = name;
		this.effect = effect;
		this.stackLimit = stackLimit;
		this.effectPercent = effectPercent;
		this.cost = cost;
		this.duration = duration;
		this.quantity = quantity;
	}
	
	getQuantity() {
		return this.quantity;	
	}	
	
	setQuantity(quantity) {
		this.quantity = quantity;	
	}	
	
	decrementQuantity() {
		this.quantity--;
	}		
	
	getName() {
		return this.name;	
	}	
	
	setName(name) {
		this.name = name;	
	}	
	
	getEffect() {
		return this.effect;	
	}	
	
	setEffect(effect) {
		this.effect = effect;	
	}
	
	getStackLimit() {
		return this.stackLimit;	
	}	
	
	setStackLimit(stackLimit) {
		this.stackLimit = stackLimit;	
	}
	
	getEffectPercent() {
		return this.effectPercent;	
	}	
	
	setEffectPercent(effectPercent) {
		this.effectPercent = effectPercent;	
	}
	
	getCost() {
		return this.cost;	
	}	
	
	setCost(cost) {
		this.cost = cost;	
	}
}	
	
//melee skill object
/*
class MeleeSkill {
	constructor(name, effect, percent, penalty, cost, stanceResult, bodyTarget) {
		this.name = name;
		this.effect = effect;
		this.percent = percent;
		this.powerPenalty = penalty;
		this.staminaCost = cost;
		this.stanceResult = stanceResult;
		this.bodyTarget = bodyTarget;
	}	
	
	getBodyTarget() {
		return this.bodyTarget;	
	}	
	
	setBodyTarget(target) {
		this.bodyTarget = target;	
	}	

	getStanceResult() {
		return this.stanceResult;	
	}	
	
	setStanceResult(stance) {
		this.stanceResult = stance;	
	}		
	
	getStaminaCost() {
		return this.staminaCost;
	}

	setStaminaCost(cost) {
		this.staminaCost = cost;
	}	
	
	getPenalty() {
		return this.powerPenalty;
	}

	setPenalty(penalty) {
		this.powerPenalty = penalty;
	}	
	
	
	getName(){
		return this.name;	
	}	
	
	setName(same) {
			this.name = name;
	}

	getEffect(){
		return this.effect;	
	}	
	
	setEffect(effect) {
			this.effect = effect;
	}	

	getPercent(){
		return this.percent;	
	}	
	
	setPercent(percent) {
		this.percent = percent;
	}
}
*/	

class Actor {
	//randomizers are for enemy actor and adds up to 30% each to attack and health
	//stamina randomizer added but not used
		//to be adjusted down to 20% each once enemy skill use is implemented
	constructor(name,race,actorClass,health,attack,stamina,staminaRegen,baseAttackCost,agility,avatar) {
		this.position = 1;
		this.name = name;
		this.health = parseInt(health);
		this.currentHealth = parseInt(health);
		this.attack = parseInt(attack);
		this.weaponName = null;
		this.weaponDamage = "0";
		this.armourName = null;
		this.armourValue = "0";
		this.accuracy = 1;
		this.attackMultiplier = 1;
		this.defenseMultiplier = 1;
		this.meleeSkillArray = [];
		this.stamina = stamina;
		this.currentStamina = stamina;
		this.agility = parseInt(agility);
		this.stance = "111111111";
		this.limbHealth = "1111";
		this.staminaRegen = parseInt(staminaRegen);
		this.baseAttackCost = parseInt(baseAttackCost);
		this.attackPenalty = 0;
		this.personality = null;
		this.itemInventory = [];
		this.statusBuffArray = [];
		this.race = race;
		this.actorClass = actorClass;
		this.fatigue = 0;
		this.mapPosition = [];
		this.avatar = avatar;
		this.equipmentArray = [];
	}

	setEquipment(equipment) {
		this.equipmentArray = equipment;
	}

	removeEquipment(item) {
		for(let i = 0; i < (this.equipmentArray).length; i++) {
			if((this.equipmentArray[i].name) === item.name) {
				var processedEquipList = (this.equipmentArray).filter(function(value,index,arr) { return value.name == item.name});
				this.setEquipment(processedEquipList);
			}	
		}
	}

	addEquipment(item) {
		var duplicate = false;
		for(let i = 0; i < (this.equipmentArray).length; i++) {
			if(item.name === (this.equipmentArray[i].name)) {
				duplicate = true; 
				return duplicate;
			}	 		
		}
		if(!duplicate) {
			(this.equipmentArray).push(item);
			return duplicate;
		}			
	}	

	getEquipment() {
		return this.equipmentArray;
	}	

	considerRest() {
		let personalityType = this.getPersonality().type;
		let choice = personalityObj.findIndex(function(personality, i) {
			return personality.type == personalityType;
		});
		if((this.getStaminaThreshold() <  parseInt(personalityObj[choice].staminaCautionThreshold))) {
			return false;
		} 
		else {
			return true;
		}	
	}

	considerDefense() {
		let personalityType = this.getPersonality().type;
		let choice = personalityObj.findIndex(function(personality, i) {
			return personality.type == personalityType;
		});
		let defendChance = parseInt(personalityObj[choice].defendPercent);
		let defenseRoll = getRandomInteger(1, 100);
		
		if(defenseRoll < defendChance) {
			return true;
		} 
		else {
			return false;
		}
	}
	
	getAvatar() {
		return this.avatar;
	}	
	
	setAvatar(url) {
		this.avatar = url;	
	}	
	
	getMapPosition() {
		return this.mapPosition;
	}	
	
	setMapXPosition(position) {
		this.mapPosition[0] = position;
	}
	
	setMapYPosition(position) {
		this.mapPosition[1] = position;
	}
	
	setMapPosition(position) {
		this.mapPosition = position;
	}
	
	getFatigueStacks() {
		return this.fatigue;	
	}	
	
	setFatigueStacks(stacks) {
		this.fatigue = stacks;	
	}		
	
	getActorClass() {
		return this.actorClass;	
	}	
	
	setActorClass(actorClass) {
		this.actorClass = actorClass;	
	}	
	
	getRace() {
		return this.race;	
	}	
	
	setRace(race) {
		this.race = race;	
	}	
	
	tickBuffs(targetOption) {
		for(var i = 0; i < (this.statusBuffArray).length; i++) {		
			if((this.statusBuffArray)[i].getEffect() == "Regen") {
				let targetHealth = (Math.ceil(this.currentHealth *= (1 + ((this.statusBuffArray)[i].getEffectPercent() / 100))));
				if(targetHealth < this.health) { 
					this.setCurrentHealth(Math.ceil(this.currentHealth *= (1 + ((this.statusBuffArray)[i].getEffectPercent() / 100))));
					(this.statusBuffArray)[i].tickDuration();
					if((this.statusBuffArray)[i].getDuration() == 0) {
						this.removeFromStatusBuffArray((this.statusBuffArray)[i].getName());
					}
				} 
				else {
					this.currentHealth = this.health;
					(this.statusBuffArray)[i].tickDuration();
					if((this.statusBuffArray)[i].getDuration() == 0) {
						this.removeFromStatusBuffArray((this.statusBuffArray)[i].getName());
					}
				}
			}	
			else if((this.statusBuffArray)[i].getEffect() == "Reduced Attack Arms") {
				this.setAttackPenalty((this.statusBuffArray)[i].getEffectPercent() * 
					this.statusBuffArray[i].getStackCount());
				(this.statusBuffArray)[i].tickDuration();
				if((this.statusBuffArray)[i].getDuration() == 0) {
					this.removeFromStatusBuffArray((this.statusBuffArray)[i].getName());
				}
			}
			else if((this.statusBuffArray)[i].getEffect() == "Direct Damage") {
				let damage = (this.statusBuffArray)[i].getEffectNumberAmount() - parseInt(this.armourValue);
				let targetHealth = this.currentHealth -= damage;
				(this.statusBuffArray)[i].tickDuration();
				if((this.statusBuffArray)[i].getDuration() == 0) {
					this.removeFromStatusBuffArray((this.statusBuffArray)[i].getName());
				}
				$("#enemyDamagedAmount").text("Item: " + damage);
			}
			else {
				return;
			}
		}	
	}	

	setStatusBuffArray(array) {
		this.statusBuffArray = array;	
	}
	
	getStatusBuffArray() {
		return this.statusBuffArray;	
	}
	
	addToStatusBuffArray(buff) {
		var duplicate = false;
		for(let i = 0; i < (this.statusBuffArray).length; i++) {
			if(buff.getEffect() == (this.statusBuffArray[i]).getEffect() && 
			this.statusBuffArray[i].getStackCount() < this.statusBuffArray[i].getStackLimit() || 
			this.statusBuffArray[i].getStackLimit() == 0) {
				this.statusBuffArray[i].incrementStackCount();
				this.statusBuffArray[i].setDuration(buff.getDuration());
				duplicate = true; 
			}	 		
		}
		if(!duplicate) {
			(this.statusBuffArray).push(buff);	
		}
	}

	removeFromStatusBuffArray(buff) {
		for(let i = 0; i < (this.statusBuffArray).length; i++) {
			if((this.statusBuffArray[i].getName()) === buff) {
				var processedBuffList = (this.statusBuffArray).filter(function(value,index,arr) { return value == buff});
				this.setStatusBuffArray(processedBuffList);
			}	
		}
	}	
	
	setItemInventory(array) {
		this.itemInventory = array;
	}	
	
	getItemInventory() {
		return this.itemInventory;	
	}

	addToItemInventory(item, qty) {
		//if received item is an object or zero quantity
		if(qty == 0) {
			this.itemInventory.push(item);
		}
        else {
			//check if item exists and add to it if found
			for(let i = 0; i < this.itemInventory.length; i++) {
				if((this.itemInventory[i].getName()) === item) {
					(this.itemInventory[i]).setQuantity(this.itemInventory[i].getQuantity() + qty);
					itemAdded = true;
					return;
				}
			}
			
			//if no match found, finds item entry and pushes new item to inventory
			for(let i = 0; i < itemObj.length; i++) {
				if(itemObj[i].name === item) {
					var item = new Item(itemObj[i].name, itemObj[i].effect, 
						itemObj[i].effectStackLimit, itemObj[i].effectPercent, 
						itemObj[i].cost, itemObj[i].duration, qty);
					this.itemInventory.push(item);
				}	
			}
		}
	}	

	useItem(item, actor) {
		if(actor === "enemy") {
			for(var j = 0; j < this.itemInventory.length; j++) {
				if((this.itemInventory[j].getName()) === item) {
					//applies item effect
					var buff;
					if(this.itemInventory[j].effect === "Direct Damage") {
						buff = new BuffStatus(this.itemInventory[j].name, this.itemInventory[j].effect,
							this.itemInventory[j].stackLimit, this.itemInventory[j].effectPercent,
							this.itemInventory[j].duration);
						
						buff.setEffectNumberAmount(this.getAttackValue());
						enemy.addToStatusBuffArray(buff);	
					}
					//decrement item quantity, remove from item array if zero	
					this.itemInventory[j].decrementQuantity();
					if(this.itemInventory[j].getQuantity() == 0) {
						this.removeEmptyFromItemInventory();
					}	
				}
			}
		}
		if(actor === "player") {
			for(var j = 0; j < this.itemInventory.length; j++) {
				if((this.itemInventory[j].getName()) === item) {
					//applies item effect
					var buff = new BuffStatus(this.itemInventory[j].name, this.itemInventory[j].effect,
						this.itemInventory[j].stackLimit, this.itemInventory[j].effectPercent,
						this.itemInventory[j].duration);

					player.addToStatusBuffArray(buff);	
					
					//decrement item quantity, remove from item array if zero	
					this.itemInventory[j].decrementQuantity();
					if(this.itemInventory[j].getQuantity() == 0) {
						this.removeEmptyFromItemInventory(this.itemInventory[j].getName());
					}	
				}
			}
		}
	}
	
	removeEmptyFromItemInventory() {
		var processedItemList = (this.itemInventory).filter(item => item.getQuantity() != 0);
		this.setItemInventory(processedItemList);
	}	
	
	getPersonality() {
		return this.personality;	
	}	
	
	setPersonality(type) {
		this.personality = type;	
	}	
	
	getAttackPenalty() {
		return this.attackPenalty;	
	}	
	
	setAttackPenalty(percent) {
		this.attackPenalty = percent;	
	}	
	
	setBaseAttackCost(baseAttackCost) {
		this.baseAttackCost = baseAttackCost;
	}	
	
	getBaseAttackCost() {
		return this.baseAttackCost;
	}	
	
	setLimbHealth(limbHealth) {
		this.limbHealth = limbHealth;
	}	
	
	getLimbHealth() {
		return this.limbHealth;
	}	
	
	setPersonality(personality) {
		this.personality = personality;
	}	
	
	getPersonality(personality) {
		return this.personality;
	}		
	
	getStance() {
		return this.stance;	
	}	
	
	setStance(stance) {
		this.stance = stance;	
	}	
	
	getAgility() {
		return this.agility;	
	}

	setAgility(agility) {
		this.agility = agility;
	}	
	
	getAttack() {
		return this.attack;		
	}	
	
	setAttack(attack) {
		this.attack = attack;
	}	
	
	getWeaponDamage() {
		return this.weaponDamage;	
	}
	
	setWeaponDamage(damage) {
		this.weaponDamage = damage;	
	}	
	
	setPosition(position) {
		this.position = position;	
	}	
	
	getPosition() {
		return this.position;	
	}		
	
	applyAttackExertion() {
		this.setCurrentStamina(this.currentStamina - this.baseAttackCost);
		if(this.getStaminaThreshold() >= 4) {
			this.fatigue++;
			this.attackPenalty += 5;
		}	
	}	
	
	recoverStamina() {
		if(this.currentStamina <= (this.stamina - this.staminaRegen))
			this.setCurrentStamina(this.currentStamina += this.staminaRegen);
	}	
	
	setStaminaRegen(stamina) {
		this.staminaRegen = stamina;
	}

	getStaminaRegen() {
		return this.staminaRegen;
	}	
	
	setCurrentStamina(stamina) {
		this.currentStamina = stamina;
	}

	getCurrentStamina(stamina) {
		return this.currentStamina;
	}		
	
	setStamina(stamina) {
		this.stamina = stamina;
	}

	getStamina(stamina) {
		return this.stamina;
	}				
	
	//addMeleeSkill(name,effect,percent) {
	addMeleeSkill(name) {
		//var skill = new MeleeSkill(name,effect,percent);
		//this.meleeSkillArray.push(skill);
		this.meleeSkillArray.push({'name':name});
	}

	getMeleeSkills() {
		return this.meleeSkillArray;
	}	

	setMeleeSkills(skills) {
		this.meleeSkillArray = skills;
	}	
	
	reduceAttack(percent) {
		this.attackMultiplier * ((100 - percent) / 100);
	}
	
	reduceArmour(percent) {
		this.defenseMultiplier * ((100 - percent) / 100);
	}
	
	reduceAccuracy(percent) {
		this.defenseMultiplier * ((100 - percent) / 100);
	}
	
	getHealth() {
		return this.health;
	}
	
	setHealth(health) {
		this.health = parseInt(health);
	}	
	
	getCurrentHealth() {
		return this.currentHealth;
	}
	
	setCurrentHealth(health) {
		this.currentHealth = health;
	}
	
	randomizeHealth() {
		this.health = parseInt(this.health) + getRandomInteger(0, parseInt(this.health) * 0.3);
		this.currentHealth = this.health;
	}

	randomizeAttack() {
		this.attack = parseInt(this.attack) + getRandomInteger(0, parseInt(this.attack) * 0.3);
	}		

	randomizeStamina() {
		this.stamina = parseInt(this.stamina) + getRandomInteger(0, parseInt(this.stamina) * 0.3);
	}		
	
	getAttackValue() {
		return parseInt(this.attack) + parseInt(this.weaponDamage);
	}
	
	getArmourValue() {
		return parseInt(this.armourValue);
	}

	getWeaponValue() {
		return parseInt(this.weaponDamage);
	}
	
	equipWeapon(weaponName, weaponDamage) {
		this.weaponName = weaponName;
		this.weaponDamage = weaponDamage;
	}
	
	unequipWeapon() {
		this.weaponName = null;
		this.weaponDamage = null;
	}
	
	getWeaponName() {
		return this.weaponName;	
	}	
	
	defend() {
		this.setArmourValue(this.armourValue * 10); 
	}	
	
	stopDefend() {
		this.setArmourValue(this.armourValue / 10); 	
	}	
	
	applyDefenseBreak() {
		this.setArmourValue(this.armourValue / 10); 
	}
	
	removeDefenseBreak() {
		this.setArmourValue(this.armourValue * 10); 
	}	
	
	setArmourValue(value) {
		this.armourValue = value;
	}	

	equipArmour(armourName, armourValue) {
		this.armourName = armourName;
		this.armourValue = armourValue;
	}	
	
	getArmourName() {
		return this.armourName;	
	}	

	unequipArmour() {
		this.armourName = null;
		this.armourValue = null;
	}
	
	getName(name) {
		return this.name;
	}
	
	setName(name) {
		this.name = name;
	}
	
	getHealthThreshold() {
		if((this.currentHealth / this.health) == 1) {
			return 0;
		}
		else if((this.currentHealth / this.health) >= .75 && (this.currentHealth / this.health) < 1) {
			return 1;
		}
		else if((this.currentHealth / this.health) >= .50 && (this.currentHealth / this.health) < .75) {
			return 2
		}
		else if((this.currentHealth / this.health) >= .25 && (this.currentHealth / this.health) < .50) {
			return 3;
		}
		else if((this.currentHealth / this.health) > 0 && (this.currentHealth / this.health) < .25) {
			return 4;		
		}
		else {
			return 5;
		}	
	}

	getStaminaThreshold() {
		if((this.currentStamina / this.stamina) == 1) {
			return 0;
		}
		else if((this.currentStamina / this.stamina) >= .75 && (this.currentStamina / this.stamina) < 1) {
			return 1;
		}
		else if((this.currentStamina / this.stamina) >= .50 && (this.currentStamina / this.stamina) < .75) {
			return 2;
		}
		else if((this.currentStamina / this.stamina) >= .25 && (this.currentStamina / this.stamina) < .50) {
			return 3;
		}
		else if((this.currentStamina / this.stamina) > 0 && (this.currentStamina / this.stamina) < .25) {
			return 4;
		}
		else {
			return 5;
		}
	}
	
	applyDamage(damage) {
		this.currentHealth = this.currentHealth - damage;
	}	
	
	applyStaminaSkillCost(cost) {
		this.currentStamina = this.currentStamina - cost;	
	}

	getMeleeAttackDamage(enemy) {
		let damage = 0;
		if(this.attackPenalty != 0) {
			damage = Math.ceil((this.getAttackValue() * ((100 - this.attackPenalty) / 100) - enemy.getArmourValue()));
		}
		else {
			damage = Math.ceil(this.getAttackValue() - enemy.getArmourValue());
		}
		return damage;
	}	
}

/*
global vars
init game mechanic values
story, player, enemy
*/

//ui data 
var currentPage = 0;
var currentChapter = 0;
var currentState = 0;
var currentMap = 0;
var enemyCount = 0;
var firstRun = true;
var gameEnd = false;	
var mapLoaded = false;
var currentEnemy = null; //stores at fight time to load proper enemy from array

//game settings
var currentConfigAlloc = 0;
var strengthAlloc = 0;
var enduranceAlloc = 0;
var lifeAlloc = 0;
var raceSelection;

//game variables
var player;
var enemiesLeft; 
var enemies = []; //all enemies in chapter
var enemy; //stores current enemy being fought

var playerPosition = 0;
var enemyPosition = 0;

var playerSkillCount = 0;
var playerSkillArray = null;
var playerItemArray = null;

var playerAttackFailure = false;
var enemyAttackFailure = false;
var enemyAttackMade = false;

var enemyDamage;
var playerDamage;

var playerDefenseBroken = false;
var enemyDefenseBroken = false;	
		
var playerBasicAttack = true;		

var playerDefend = false;
var enemyDefend = false;

var playerUseItem = false;

//random enemy skill use based on what they have
function skillEnemyAttack() {
	//gets enemy assigned skill array
	let skills = enemy.getMeleeSkills();
	//random selection
	let skillChoice = getRandomInteger(0, (skills.length - 1));
	
	for(var j = 0; j < meleeSkillObj.length; j++) {	
	
		//finds skill details in enemy skill array
		if(meleeSkillObj[j].name === skills[skillChoice].name) {
			enemy.setAttackPenalty(parseInt(meleeSkillObj[j].meleePercentagePenalty));
			
			//no agility check, enemy moves first or last determined at attack phase
			//agilityCheck();
			
			//checks if stamina available, if not attack fails and regular exchange happens
			if((enemy.getCurrentStamina - meleeSkillObj[j].staminaCost) < 0) {
				enemyAttackFailure = true;
			}
			//next checks if target in range, if not attack fails and regular exchange happens
			else if((playerPosition + enemyPosition) > meleeSkillObj[j].range) {
				enemyAttackFailure = true;
			}
			//if enough stamina, executes skill
			else {					
				enemy.applyStaminaSkillCost(parseInt(meleeSkillObj[j].staminaCost));
				$("#enemyGameStatus").text(meleeSkillObj[j].name);
				
				//moves back enemy. 
				//if enemy at +3, player is shifted back if possible
				//+3, +3 is maximum distance in moving zone
				if(meleeSkillObj[j].effect === "Increase Distance") {
					if(enemyPosition < 3) {
						enemyPosition = enemyPosition + parseInt(meleeSkillObj[j].effectQuantity);
						if(enemyPosition > 3)
							enemyPosition = 3;	
					}
					if(enemyPosition == 3 && playerPosition < 3) {
						playerPosition = playerPosition +  parseInt(meleeSkillObj[j].effectQuantity);
						if(playerPosition > 3)
							playerPosition = 3;
					}	
					
					//sets grid based on distance
					$(".characterPosition").css('background-color', 'green');
					$("#playerGridColumn" + playerPosition).css('background-color', 'gray');
					$("#enemyGridColumn" + enemyPosition).css('background-color', 'gray');							
				}
				
				//moves forward enemy. 
				//if opponent already at +0, enemy is shifted forward instead
				if(meleeSkillObj[j].effect === "Decrease Distance") {
					if(playerPosition > 0) {
						playerPosition = playerPosition -  parseInt(meleeSkillObj[j].effectQuantity);
						if(playerPosition < 0)
							playerPosition = 0;										
					}
					if(playerPosition == 0 && enemyPosition > 0) {
						enemyPosition = enemyPosition -  parseInt(meleeSkillObj[j].effectQuantity);
						if(enemyPosition < 0)
							enemyPosition = 0;	
					}	
					//sets grid based on distance
					$(".characterPosition").css('background-color', 'green');
					$("#playerGridColumn" + playerPosition).css('background-color', 'gray');
					$("#enemyGridColumn" + enemyPosition).css('background-color', 'gray');
				}
				
				//set new enemy stance (yellow indicates is open)
				//sets targeted enemy side grid by player to red 
				enemy.setStance(meleeSkillObj[j].stanceResult);
				for(let i = 0; i < 9; i++) {
					if(meleeSkillObj[j].stanceResult[i] == 0)
						$(".e" + (i + 1)).css({"border": "2px solid yellow"});
				}
				for(let i = 0; i < 9; i++) {
					if(meleeSkillObj[j].bodyTarget[i] == 1)
						$(".p" + (i + 1)).css({"border": "2px solid red"});
				}			
				
				//check player stance to see if defense broken
				let enemyTargeting = meleeSkillObj[j].bodyTarget;
				let playerStance = player.getStance();
				for(let i = 0; i <  enemyTargeting.length; i++) {
					if(enemyTargeting[i] == 1 && playerStance[i] == 0) {
						playerDefenseBroken = true;	
					}	
				}	

				//applies debuff if any, does not apply it if defended against or duplicate name and stack limit hit			
				if(meleeSkillObj[j].debuff != "none") {
					//attack reduction debuff
					if(meleeSkillObj[j].debuff === "Attack Reduction") {
						let penalty = 0;					
						//effect at time depends on defending target			
						if(playerDefend)
							penalty = (Math.floor(meleeSkillObj[j].debuffPercent / 2));
						if(!playerDefend)
							penalty = (meleeSkillObj[j].debuffPercent);
						if(playerDefenseBroken)
							penalty = (Math.floor(meleeSkillObj[j].debuffPercent * 1.5));								

						let newDebuff = new BuffStatus("Attack Reduction", "Reduced Attack Arms", 0, 
							penalty, meleeSkillObj[j].debuffDuration);
						player.addToStatusBuffArray(newDebuff);
					}	
				}
				//is using skill, next step calculates damage
				enemyAttackMade = false;
			}
		}
	}	
}	

//enemy attack function	
function enemyAttack() {
	
	//check if call skill
	let enemyPersonality = enemy.getPersonality();
	let personalityType = enemyPersonality.type;
	let choice = personalityObj.findIndex(function(personality, i) {
		return personality.type == personalityType;
	});

	let skillDecision = false;
	
	if(!enemyDefend) {	
		
		//check if use skill or regular attack
		let attackRoll = getRandomInteger(1, 100);
		if(attackRoll < parseInt(personalityObj[choice].skillPercent)) {
			skillDecision = true;			
		}	
		//regular attack
		if(!skillDecision) {
			//enemy moves forward if not close enough to attack
			//decreases player distance if enemy forward most and player at max distance
			if(playerPosition == 0 && enemyPosition != 0) {
				enemyPosition--;
				enemyAttackFailure = true;	
			}	
			else if(playerPosition > 0 && enemyPosition == 0) {
				playerPosition--;
				enemyAttackFailure = true;	
			}
			else if(playerPosition != 0 && enemyPosition != 0) {
				enemyPosition--;
				enemyAttackFailure = true;	
			}	
			//close enough to attack
			else {			
				//apply stamina use and penalties if any
				enemy.applyAttackExertion(); 
				if(enemy.getStaminaThreshold() >= 4) {
					$("#enemyActiveEffects p:contains('fatigued')").remove();
					$("#enemyActiveEffects").append("<p>" + "Fatigued: " + enemy.getFatigueStacks() + "</p>");
				}	
				
				//selects spot on player stance to target
				let targetSquare = getRandomInteger(1,9);
				let playerStance = player.getStance();
				if(playerStance[targetSquare - 1] == 0) {
					playerDefenseBroken = true;	
					player.applyDefenseBreak();
				}	
				
				//target square becomes red
				$(".p" + targetSquare).css({"border": "2px solid red"});	
					
				enemyDamage = enemy.getMeleeAttackDamage(player);		

				if(enemyDamage > 0) {
					player.applyDamage(enemyDamage);
				} 
				
				//reset armour break
				if(playerDefenseBroken)
					player.removeDefenseBreak();
			}
		}
		//enemy uses skill
		else {
			skillEnemyAttack();
			//player attack sequence only happens if attack did not fail, resets after
			if(enemyAttackFailure == false) {
				//apply stamina use and penalties if any
				enemy.applyAttackExertion();
				if(enemy.getStaminaThreshold() >= 4) {
					$("#enemyActiveEffects p:contains('fatigued')").remove();
					$("#enemyActiveEffects").append("<p>" + "Fatigued: " + enemy.getFatigueStacks() + "</p>");
				}
				
				if(playerDefenseBroken == true) {
					player.applyDefenseBreak();	
				}		
				
				enemyDamage = enemy.getMeleeAttackDamage(player);
				
				if(enemyDamage > 0) {
					player.applyDamage(enemyDamage);
				}	
			}
		}
		//sets grid based on distance
		$(".characterPosition").css('background-color', 'green');
		$("#playerGridColumn" + playerPosition).css('background-color', 'gray');
		$("#enemyGridColumn" + enemyPosition).css('background-color', 'gray');
	}	
	skillDecision = false;
	enemyAttackMade = true;
	enemy.setAttackPenalty(0);
}

//update of ui and clean up after each turn
function postAttackUpdates() {

	//set status conditions player
	let tempBuffArray = player.getStatusBuffArray();
	let buffStr;
	$("#playerActiveEffects").empty();

	for(let i = 0; i < tempBuffArray.length; i++) {
		buffStr = tempBuffArray[i].getName() + " " + tempBuffArray[i].getEffect() + " " +
			tempBuffArray[i].getEffectPercent() + "% x" + tempBuffArray[i].getStackCount() + " " +
			tempBuffArray[i].getDuration() + " left";
		$("#playerActiveEffects").append("<p>" + buffStr + "</p>");
	};
	if(tempBuffArray.length != 0)
		$("#playerConditionTriangle").css('border-top', '20px solid orange');

	//set status conditions enemy
	tempBuffArray = enemy.getStatusBuffArray();
	$("#enemyActiveEffects").empty();
	for(let i = 0; i < tempBuffArray.length; i++) {
		buffStr = tempBuffArray[i].getName() + " " + tempBuffArray[i].getEffect() + " " +
			tempBuffArray[i].getEffectPercent() + "% x" + tempBuffArray[i].getStackCount() + " " +
			tempBuffArray[i].getDuration() + " left";
		$("#enemyActiveEffects").append("<p>" + buffStr + "</p>");
	};
	if(tempBuffArray.length != 0)
		$("#enemyConditionTriangle").css('border-top', '20px solid orange');
	

	//set condition text for player based on health
	switch (player.getHealthThreshold()) {
		case 0:
			$("#playerCondition").text("Uninjured").css('color', 'blue');
			break;
		case 1:
			$("#playerCondition").text("Lightly Injured").css('color', 'green');
			$("#playerHealthBar").removeClass();
			$("#playerHealthBar").addClass("progress-bar");
			break;
		case 2:
			$("#playerCondition").text("Injured").css('color', 'orange');
			$("#playerHealthBar").removeClass();
			$("#playerHealthBar").addClass("progress-bar bg-warning");
			break;
		case 3:
			$("#playerCondition").text("Heavy Injuries").css('color', 'brown');
			break;
		case 4:
			$("#playerCondition").text("Near Death").css('color', 'gray');
			$("#playerHealthBar").removeClass();
			$("#playerHealthBar").addClass("progress-bar bg-dark");	
			break;
		case 5:
			$("#playerCondition").text("Dead").css('color', 'black');
			break;	
	}
	//set enemy health condition based on health
	switch (enemy.getHealthThreshold()) {
		case 0:
			$("#enemyHealthCondition").text("Uninjured").css('color', 'blue');
			break;
		case 1:
			$("#enemyHealthCondition").text("Lightly Injured").css('color', 'green');
			$("#enemyHealthSquare").css('background-color', 'green');
			break;
		case 2:
			$("#enemyHealthCondition").text("Injured").css('color', 'orange');
			$("#enemyHealthSquare").css('background-color', 'orange');
			break;
		case 3:
			$("#enemyHealthCondition").text("Heavy Injuries").css('color', 'brown');
			$("#enemyHealthSquare").css('background-color', 'brown');
			break;
		case 4:
			$("#enemyHealthCondition").text("Near Death").css('color', 'gray');
			$("#enemyHealthSquare").css('background-color', 'gray');
			break;
		case 5:
			$("#enemyHealthCondition").text("Dead").css('color', 'black');
			$("#enemyHealthSquare").css('background-color', 'black');
			break;
	}	
	
	//set enemy stamina condition text for enemy based on stamina
	switch (enemy.getStaminaThreshold()) {
		case 0:
			$("#enemyStaminaCondition").text("Alert").css('color', 'blue');
			break;
		case 1:
			$("#enemyStaminaCondition").text("Somewhat Tired").css('color', 'green');
			$("#enemyStaminaCircle").css('background-color', 'green');
			break;
		case 2:
			$("#enemyStaminaCondition").text("Tired").css('color', 'red');
			$("#enemyStaminaCircle").css('background-color', 'red');
			break;
		case 3:
			$("#enemyStaminaCondition").text("Exhausted").css('color', 'brown');
			$("#enemyStaminaCircle").css('background-color', 'brown');
			break;
		case 4:
			$("#enemyStaminaCondition").text("Nearly Spent").css('color', 'gray');
			$("#enemyStaminaCircle").css('background-color', 'gray');
			break;
		case 5:
			$("#enemyStaminaCondition").text("Completely Exhausted").css('color', 'black');
			$("#enemyStaminaCircle").css('background-color', 'black');
			break;
	}	
	//player loses
	if(player.getCurrentHealth() <= 0) {
		$("#playerHealthBar").text(player.getCurrentHealth());
		$("#playerHealthBar").css('width', 100 + "%");
		$("#playerHealthBar").removeClass();
		$("#playerHealthBar").addClass("bg-danger");
		$("#playerActiveEffects").text("");		
		
		$("#playerGameStatus").text("You lose!");
		//reset to start
		currentPage = 0;
		currentChapter = 0;
		currentEnemy = null;
		enemyCount = 0;
		currentState = null;		

		$("#attackButton").hide();
		$("#skillMenu").hide();
		gameEnd = true;
	}	
	//player wins
	//decrement enemy count
	else if(enemy.getCurrentHealth() <= 0) {
		enemyCount--; 
		enemies[currentEnemy] = enemy; //assign updated value to enemy array
		enemy = null; //clears enemy
		$("#playerHealthBar").text(player.getCurrentHealth() + "/" + player.getHealth());
		$("#playerHealthBar").css('width', Math.floor(player.getCurrentHealth() / player.getHealth() * 100) + "%");
		
		$("#enemyActiveEffects").text("");
		$("#enemyStaminaCondition").text("");				
		$("#enemyConditionTriangle").css('border-top', '20px solid blue');	
		
		$("#playerGameStatus").text("You win!");
		
		//advance story to next chapter if no more enemies
		if(enemiesLeft == 0) {
			currentPage = 0;
			currentChapter++;
			currentState = null;	
			$("#attackButton").hide();
			$("#defendButton").hide();
			$("#itemButton").hide();
			$("#skillMenu").hide();		
			$("#nextTurnButton").hide();			
			$("#nextChapterButton").show();
		}
		//offers option to go back to map on winning
		else {
			$("#attackButton").hide();
			$("#defendButton").hide();
			$("#itemButton").hide();
			$("#skillMenu").hide();
			$("#nextTurnButton").hide();
			$("#battleReturnMap").show();
		}	
	}
	else{
		$("#playerHealthBar").text(player.getCurrentHealth() + "/" + player.getHealth());
		$("#playerHealthBar").css('width', Math.floor(player.getCurrentHealth() / player.getHealth() * 100) + "%");
	}
}

function agilityCheck() {
	
	//speed check, enemy performs attack first if slower
	if(player.getAgility() < enemy.getAgility()) {
		if(!enemyDefend) {
			enemyAttack();
			postAttackUpdates();
			enemyAttackMade = true;
		}	
	}
	//equal a flip is made, on a 1 enemy attacks first
	if(player.getAgility() == enemy.getAgility()) {
		var flip = Math.random() + 1;
		flip = Math.round(flip);
		if(flip == 1) {
			if(!enemyDefend) {
				enemyAttack();
				postAttackUpdates();
				enemyAttackMade = true;
				$("#playerStatus").text("Enemy moved first!");
			}	
		}
	}	
}	

//refreshes list of all player items in modal
function refreshItems() {
	$('.itemButtonArray').empty();
	playerItemArray = player.getItemInventory();
	var itemName = null;
	var itemQty = null;
	for(var i = 0; i < playerItemArray.length; i++) {
		let itemName = playerItemArray[i].getName();
		let itemQty = playerItemArray[i].getQuantity(); 
		$('.itemButtonArray').append('<div class="row"><input value=' + '"' + itemName + '"' +
			' type="button" class="itemButton' + i + ' btn btn-primary active mb-1"></button><p class="ml-1">' +
			itemQty + '</p></div>');
		//item logic
		$('.itemButton' + i).click(function() {
			for(var j = 0; j < itemObj.length; j++) {	
				//finds item details in data
				if(itemObj[j].name == $(this).attr("value")) {
					//calls helper function in class
					if(itemObj[j].effect === "Direct Damage") {
						player.useItem(itemObj[j].name, "enemy");
					}
					else {
						player.useItem(itemObj[j].name, "player");
					}
					//fight specific
					if(enemy != null) {	
						//no damage and using item
						player.setAttackPenalty(100);
						playerUseItem = true;
						
						//agility check
						agilityCheck();
						
						$('#itemModal').modal('toggle');
						refreshItems();
						playerBasicAttack = false;//is using item
						$("#attackButton").click();//goes to battle turn processing
					}
					//map specific
					if(enemy == null) {	
						refreshItems();
						//$('#mapItemModal').modal('toggle');
						if($('#mapItemModal').hasClass('show'))
							$('#mapItemModal').modal('toggle');
						if($('#itemModal').hasClass('show'))
							$('#itemModal').modal('toggle');
					}
				}
			}
		});				
	}	
}

//refreshes list of all player equipment in modal
function refreshEquipment() {
	$('#equipButtonArray').empty();
	playerEquipmentArray = player.getEquipment();
	for(var i = 0; i < playerEquipmentArray.length; i++) {
		let itemName = playerEquipmentArray[i].name;
		let value = playerEquipmentArray[i].value;
		$('#equipButtonArray').append('<div class="row"><input value=' + '"' + itemName + '"' +
			' type="button" id="equipButton' + i + '" class="btn btn-primary active mb-1"></button><p class="ml-1 mt-1">' +
			value + '</p></div>');
		//equip logic
		$('#equipButton' + i).click(function() {
			//check weapons
			for(var j = 0; j < weaponObj.length; j++) {	
				//finds item details in data
				if(weaponObj[j].name == $(this).attr("value")) {
					//calls helper function in class
					player.equipWeapon(weaponObj[j].name, weaponObj[j].damage);
					//map specific
					if($('#equipModal').hasClass('show'))
						$('#equipModal').modal('toggle');
					return;
				}
			}
			for(var j = 0; j < armourObj.length; j++) {
				//finds item details in data
				if(armourObj[j].name == $(this).attr("value")) {
					//calls helper function in class
					player.equipWeapon(armourObj[j].name, armourObj[j].reduction);
					//map specific
					if($('#equipModal').hasClass('show'))
						$('#equipModal').modal('toggle');
					return;
				}
			}	
		});				
	}	
}		

//refresh all player skills from available list in modal
function refreshSkills() {
	//init skill list	
	playerSkillArray = player.getMeleeSkills();
	var skillName = null;
	for(var i = 0; i < playerSkillArray.length; i++) {
		//skillName = playerSkillArray[i].getName();
		skillName = playerSkillArray[i].name;
		$('#skillButtonArray').append('<input name="' + skillName + '" id=skillButton' + i + ' type="button" class="btn btn-primary active mb-1"></button>');								
		
		//skill logic
		//currently iterates over entire skill list to find matching name of skill
		$('#skillButton' + i).prop('value',skillName).click({param1:skillName}, function(event) {
			//for(var j = 0; j < Object.keys(meleeSkillObj).length; j++) {	
			for(var j = 0; j < meleeSkillObj.length; j++) {	
				//finds skill details in data
				if(meleeSkillObj[j].name == event.data.param1) {
					player.setAttackPenalty(parseInt(meleeSkillObj[j].meleePercentagePenalty));
					
					//agility check
					agilityCheck();
					
					//checks if stamina available, if not attack fails and regular exchange happens
					if((player.getCurrentStamina() - meleeSkillObj[j].staminaCost) < 0) {
						$('#skillModal').modal('toggle');
						$("#playerGameStatus").text("Stamina too low!");
						playerAttackFailure = true;
						$('#skillModal').modal('toggle');
						$("#attackButton").click();
					}
					//next checks if target in range, if not attack fails and regular exchange happens
					else if((playerPosition + enemyPosition) > meleeSkillObj[j].range) {
						$("#playerGameStatus").text("Target out of range!");
						playerAttackFailure = true;
						$('#skillModal').modal('toggle');
						$("#attackButton").click();
					}
					//if enough stamina, executes skill
					else {					
						player.applyStaminaSkillCost(parseInt(meleeSkillObj[j].staminaCost));
						$("#playerStaminaBar").text(player.getCurrentStamina() + "/" + player.getStamina());
						$("#playerStaminaBar").css('width', (Math.floor((player.getCurrentStamina() / player.getStamina()) * 100)) + "%");
								
						$("#playerGameStatus").text(meleeSkillObj[j].name);
						
						//moves back player. 
						//if player already at +3, opponent is shifted instead
						//+3, +3 is maximum distance in moving zone
						if(meleeSkillObj[j].effect === "Increase Distance") {
							if(playerPosition < 3) {
								playerPosition = playerPosition + parseInt(meleeSkillObj[j].effectQuantity);
								if(playerPosition > 3)
									playerPosition = 3;	
							}
							if(playerPosition == 3 && enemyPosition < 3) {
								enemyPosition = enemyPosition +  parseInt(meleeSkillObj[j].effectQuantity);
								if(enemyPosition > 3)
									enemyPosition = 3;
							}	
							$(".characterPosition").css('background-color', 'green');
							$("#playerGridColumn" + playerPosition).css('background-color', 'gray');
							$("#enemyGridColumn" + enemyPosition).css('background-color', 'gray');								
						}
						
						//moves forward player. 
						//if opponent already at +0, player is shifted forward instead
						if(meleeSkillObj[j].effect === "Decrease Distance") {
							if(enemyPosition > 0) {
								enemyPosition = enemyPosition -  parseInt(meleeSkillObj[j].effectQuantity);
								if(enemyPosition < 0)
									enemyPosition = 0;										
							}
							if(enemyPosition == 0 && playerPosition > 0) {
								playerPosition = playerPosition -  parseInt(meleeSkillObj[j].effectQuantity);
								if(playerPosition < 0)
									playerPosition = 0;	
							}	
							//sets grid based on distance
							$(".characterPosition").css('background-color', 'green');
							$("#playerGridColumn" + playerPosition).css('background-color', 'gray');
							$("#enemyGridColumn" + enemyPosition).css('background-color', 'gray');
						}
						
						//set new player stance (yellow indicates is open)
						//sets targeted enemy side grid by player to red 
						player.setStance(meleeSkillObj[j].stanceResult);
						for(let i = 0; i < 9; i++) {
							if(meleeSkillObj[j].stanceResult[i] == 0)
								$(".p" + (i + 1)).css({"border": "2px solid yellow"});
						}
						for(let i = 0; i < 9; i++) {
							if(meleeSkillObj[j].bodyTarget[i] == 1)
								$(".e" + (i + 1)).css({"border": "2px solid red"});
						}
						
						//check enemy stance to see if damage increased
						let playerTargeting = meleeSkillObj[j].bodyTarget;
						let enemyStance = enemy.getStance();
						for(let i = 0; i <  playerTargeting.length; i++) {
							if(playerTargeting[i] == 1 && enemyStance[i] == 0) {
								enemyDefenseBroken = true;	
							}	
						}	

						//applies debuff if any, does not apply it fully if defended against			
						if(meleeSkillObj[j].debuff != "none") {
							if(meleeSkillObj[j].debuff === "Attack Reduction") {
								let penalty = 0;
								//effect at time depends on defending target			
								if(enemyDefend)
									penalty = (Math.floor(meleeSkillObj[j].debuffPercent / 2));
								if(!enemyDefend)
									penalty = (meleeSkillObj[j].debuffPercent);
								if(enemyDefenseBroken)
									penalty = (Math.floor(meleeSkillObj[j].debuffPercent * 1.5));								
								let newDebuff = new BuffStatus("Attack Reduction", "Reduced Attack Arms", 0, 
									penalty, meleeSkillObj[j].debuffDuration);
								enemy.addToStatusBuffArray(newDebuff);
							}
						}
						$('#skillModal').modal('toggle');
						playerBasicAttack = false;//is using skill
						$("#attackButton").click();
					}
				}
			}
		});		
	}
}	

//enemy initialization
function enemyInit() {
	enemyCount = parseInt(storyObj[currentChapter].enemyCount);
	for(var i = 0; i < enemyCount; i++) {
		//finds matching enemy in enemyObj
		let selectedEnemy = enemyObj.findIndex(function(item, j){
			return item.name === "guard"
		});
		
		//set enemy equipment tier
		let enemyTier = parseInt(storyObj[currentChapter].enemyEquipmentTier);
		//init and equip enemy 
		let enemy = new Actor(
			enemyObj[selectedEnemy].name,
			enemyObj[selectedEnemy].race,
			enemyObj[selectedEnemy].actorClass,
			enemyObj[selectedEnemy].health,
			enemyObj[selectedEnemy].attack,
			enemyObj[selectedEnemy].stamina,
			enemyObj[selectedEnemy].staminaRegen,
			enemyObj[selectedEnemy].baseAttackCost,
			enemyObj[selectedEnemy].agility,
			enemyObj[selectedEnemy].avatar
		);
		
		enemy.equipWeapon(
			weaponObj[enemyTier].name, 
			weaponObj[enemyTier].damage
		);

		enemy.equipArmour(
			armourObj[enemyTier].name, 
			armourObj[enemyTier].reduction
		);

		//assign enemy list of skills
		//first pulls skills from data as array
		var enemySkillList = enemyObj[selectedEnemy].skills;
		enemySkillList = enemySkillList.split(",");

		for(var k = 0; k < meleeSkillObj.length; k++) {
			if(enemySkillList.includes(meleeSkillObj[k].name)) {
				enemy.addMeleeSkill(meleeSkillObj[k].name, meleeSkillObj[k].effect,
					meleeSkillObj[k].percent, meleeSkillObj[k].penalty,
					meleeSkillObj[k].staminaCost);
			}	
		}
		
		//randomize personality
		let choice = getRandomInteger(0, personalityObj.length - 1);
		enemy.setPersonality(personalityObj[choice]);
		
		//randomize attack and health values
		//player.randomizeHealth();
		//player.randomizeAttack();
		enemy.randomizeHealth();
		enemy.randomizeAttack();
		
		//resets stances at beginning and grids
		enemy.setStance("111111111");
	
		//sets enemy personality at beginning
		let enemyPersonalityChoice = getRandomInteger(0, (personalityObj.length - 1));
		enemy.setPersonality(personalityObj[enemyPersonalityChoice]);

		enemies.push(enemy);
	}
}	

//player initialization
function playerInit() {
	let playerName = $("#name").val();
	let className = $("#gameClass").val();
	
	//init and equip player
	for(var i = 0; i < raceObj.length; i++) {
		if(raceObj[i].race == raceSelection) {
			player = new Actor(
				playerName,
				raceObj[i].race,
				className,
				raceObj[i].health,
				raceObj[i].attack,
				raceObj[i].stamina,
				raceObj[i].staminaRegen,
				raceObj[i].baseAttackCost,		
				raceObj[i].agility,
				raceObj[i].avatar
			);			
		}	
	}	
	
	player.addEquipment({name: weaponObj[0].name, value: weaponObj[0].damage});

	player.equipWeapon(
		weaponObj[0].name, 
		weaponObj[0].damage
	);

	player.addEquipment({name: armourObj[0].name, value: armourObj[0].reduction});

	player.equipArmour(
		armourObj[0].name, 
		armourObj[0].reduction
	);
	player.setCurrentHealth(Math.ceil(player.getHealth() * (1 + (0.05 * lifeAlloc))));
	player.setHealth(Math.ceil(player.getHealth() * (1 + (0.05 * lifeAlloc))));
	player.setCurrentStamina(Math.ceil(player.getStamina() * (1 + (0.05 * enduranceAlloc))));
	player.setStamina(Math.ceil(player.getStamina() * (1 + (0.05 * enduranceAlloc))));
	player.setAttack(Math.ceil(player.getAttack() * (1 + (0.05 * strengthAlloc))));
	
	//assign player list of skills
	for(var i = 0; i < meleeSkillObj.length; i++) {
		player.addMeleeSkill(meleeSkillObj[i].name, meleeSkillObj[i].effect,
			meleeSkillObj[i].percent, meleeSkillObj[i].penalty,
			meleeSkillObj[i].staminaCost);
	}
	
	//resets stances at beginning and grids
	player.setStance("111111111");
	player.setMapPosition([]);
}	

//game init function
//sets initial game mechanic values
//inits player here
//called from start and on reset
function gameInit() {

	//story reset
	currentPage = 0;
	currentChapter = 0;
	currentState = 0;	

	//story panel reset
	$('#storyProgress').prop('disabled', false);
	$('.saveGame').prop('disabled', false).text("Save");
	$('#storyEnd').css('display', 'none').text("");
	
	//initialize player actor
	playerInit();
	
	//reset body grids for fight
	for(let i = 0; i < 10; i++) {
		$(".p" + i).css({"border": "1px solid black"});
		$(".e" + i).css({"border": "1px solid black"});
	}

	//map reset
	mapLoaded = false;
	for(let j = 1; j < 9; j++) {
		$("#mapRow" + j).empty().removeAttr("style");
	}
	
	//at first run, populates skill and item list in battle
	//add buttons for each skill and item in possession
	//prints skill and item names
	//selecting skill causes player attack right after with modifiers applied
	//selecting item applies effect and player skips attack
	if(firstRun) {
		refreshItems();
		refreshSkills();
		refreshEquipment();
		firstRun = false;
	}

	//game UI reset
	
	//reset race select
	$("#race").prop('selectedIndex',0);
	
	//battle ui
	$(".characterPosition").css('background-color', 'green');
	$("#playerGridColumn0").css('background-color', 'gray');
	$("#enemyGridColumn0").css('background-color', 'gray');
	
	$("#enemyGameStatus").text("---");
	$("#playerGameStatus").text("---");
	$("#playerStatus").text("---");
	$("#playerDamagedAmount").text("---");
	$("#enemyDamagedAmount").text("---");
	
	$("#playerCondition").text('Uninjured').css('color', 'green');
	$("#playerConditionTriangle").css('border-top', '20px solid blue');
	$("#playerHealthBar").css('width', 100 + "%");
	$("#playerStaminaBar").css('width', 100 + "%");
	
	//reset health bars back to default
	$("#playerHealthBar").removeClass();
	$("#playerHealthBar").addClass('progress-bar');
	
	//reset stamina bar back to default
	$("#playerStaminaBar").removeClass();
	$("#playerStaminaBar").addClass('progress-bar');
	
	//enemy condition reset
	$("#enemyHealthCondition").text('Uninjured').css('color', 'green');
	$("#enemyStaminaCondition").text('Alert').css('color', 'green');
	$("#enemyActiveEffects").text("");
	$("#enemyStaminaCircle").css('background-color', 'blue');
	$("#enemyConditionTriangle").css('border-top', '20px solid blue');
	$("#enemyHealthSquare").css('background-color', 'blue');
	
	//show buttons again
	$("#attackButton").show();
	$("#itemButton").show();
	$("#skillMenu").show();
	
	//reset game so buttons show
	gameEnd = false;
	enemy = null;
}	

//reset ui elements
//to be called from continue button
function uiReset() {
	//reset body grids		
	for(let i = 0; i < 10; i++) {
		$(".p" + i).css({"border": "1px solid black"});
		$(".e" + i).css({"border": "1px solid black"});
	}

	//if player not at full health and stamina sets ui properly
	if((player.getCurrentHealth() / player.getHealth()) != 1) {
		$("#playerHealthBar").text(player.getCurrentHealth() + "/" + player.getHealth());
		$("#playerHealthBar").css('width', Math.floor(player.getCurrentHealth() / player.getHealth() * 100) + "%");
		switch (player.getHealthThreshold()) {
			case 0:
				$("#playerCondition").text("Uninjured").css('color', 'blue');
				break;
			case 1:
				$("#playerCondition").text("Lightly Injured").css('color', 'green');
				$("#playerHealthBar").removeClass();
				$("#playerHealthBar").addClass("progress-bar");
				break;
			case 2:
				$("#playerCondition").text("Injured").css('color', 'orange');
				$("#playerHealthBar").removeClass();
				$("#playerHealthBar").addClass("progress-bar bg-warning");
				break;
			case 3:
				$("#playerCondition").text("Heavy Injuries").css('color', 'brown');
				break;
			case 4:
				$("#playerCondition").text("Near Death").css('color', 'gray');
				$("#playerHealthBar").removeClass();
				$("#playerHealthBar").addClass("progress-bar bg-dark");	
				break;
			case 5:
				$("#playerCondition").text("Dead").css('color', 'black');
				break;	
		}
	}
	if((player.getCurrentStamina() / player.getStamina()) != 1) {
		$("#playerStaminaBar").text(player.getCurrentStamina() + "/" + player.getStamina());
		$("#playerStaminaBar").css('width', (Math.floor((player.getCurrentStamina() /player.getStamina()) * 100)) + "%");
	}
	if((player.getCurrentHealth() / player.getHealth()) == 1 && (player.getCurrentStamina() / player.getStamina()) == 1) {

		//condition check here
		$("#playerCondition").text('Uninjured').css('color', 'green');
		$("#playerConditionTriangle").css('border-top', '20px solid blue');
		
		$("#playerHealthBar").css('width', 100 + "%");
		$("#playerStaminaBar").css('width', 100 + "%");

		//reset health bars back to default
		$("#playerHealthBar").removeClass();
		$("#playerHealthBar").addClass('progress-bar');

		//reset stamina bar back to default
		$("#playerStaminaBar").removeClass();
		$("#playerStaminaBar").addClass('progress-bar');
	}

	//enemy update if load from save
	if(enemy != null) {
		if((enemy.getCurrentHealth() / enemy.getHealth()) != 1) {
			switch (enemy.getHealthThreshold()) {
				case 0:
					$("#enemyHealthCondition").text("Uninjured").css('color', 'blue');
					break;
				case 1:
					$("#enemyHealthCondition").text("Lightly Injured").css('color', 'green');
					$("#enemyHealthSquare").css('background-color', 'green');
					break;
				case 2:
					$("#enemyHealthCondition").text("Injured").css('color', 'orange');
					$("#enemyHealthSquare").css('background-color', 'orange');
					break;
				case 3:
					$("#enemyHealthCondition").text("Heavy Injuries").css('color', 'brown');
					$("#enemyHealthSquare").css('background-color', 'brown');
					break;
				case 4:
					$("#enemyHealthCondition").text("Near Death").css('color', 'gray');
					$("#enemyHealthSquare").css('background-color', 'gray');
					break;
				case 5:
					$("#enemyHealthCondition").text("Dead").css('color', 'black');
					$("#enemyHealthSquare").css('background-color', 'black');
					break;
			}
		}
		if((enemy.getCurrentStamina() / enemy.getStamina()) != 1) {
			switch (enemy.getStaminaThreshold()) {
				case 0:
					$("#enemyStaminaCondition").text("Alert").css('color', 'blue');
					break;
				case 1:
					$("#enemyStaminaCondition").text("Somewhat Tired").css('color', 'green');
					$("#enemyStaminaCircle").css('background-color', 'green');
					break;
				case 2:
					$("#enemyStaminaCondition").text("Tired").css('color', 'red');
					$("#enemyStaminaCircle").css('background-color', 'red');
					break;
				case 3:
					$("#enemyStaminaCondition").text("Exhausted").css('color', 'brown');
					$("#enemyStaminaCircle").css('background-color', 'brown');
					break;
				case 4:
					$("#enemyStaminaCondition").text("Nearly Spent").css('color', 'gray');
					$("#enemyStaminaCircle").css('background-color', 'gray');
					break;
				case 5:
					$("#enemyStaminaCondition").text("Completely Exhausted").css('color', 'black');
					$("#enemyStaminaCircle").css('background-color', 'black');
					break;
			}
		}
		if((enemy.getCurrentHealth() / enemy.getHealth()) == 1 && (enemy.getCurrentStamina() / enemy.getStamina()) == 1) {
			//condition check here
			$("#enemyHealthCondition").text('Uninjured').css('color', 'green');
			$("#enemyStaminaCondition").text('Alert').css('color', 'green');
			$("#enemyActiveEffects").text("");
			$("#enemyStaminaCircle").css('background-color', 'blue');
			$("#enemyConditionTriangle").css('border-top', '20px solid blue');
			$("#enemyHealthSquare").css('background-color', 'blue');
		}	
	}		
	
	//reset race select
	$("#race").prop('selectedIndex',0);
	
	//battle ui
	$(".characterPosition").css('background-color', 'green');
	$("#playerGridColumn0").css('background-color', 'gray');
	$("#enemyGridColumn0").css('background-color', 'gray');
	
	$("#enemyGameStatus").text("---");
	$("#playerGameStatus").text("---");
	$("#playerStatus").text("---");
	$("#playerDamagedAmount").text("---");
	$("#enemyDamagedAmount").text("---");	
	
	//show buttons again
	$("#attackButton").show();
	$("#itemButton").show();
	$("#skillMenu").show();
	
	//reset game so buttons show
	gameEnd = false;	
}	

//populates story page after creating character
//pulls image and first page in pages array
//initializes all enemies present in story chapter
function startStory() {
	currentChapter = 0;
	$("#storyMain").show();
	$("#activeStoryBackground").css("background-image", "url(" + storyObj[0].storyImage + ")");
	$("#storyText").text(storyObj[currentChapter].pages[currentPage]);
	progressStory();
}

//called at map and in battle to populate player status fields
function printPlayerStatus() {
	$(".playerImage").attr("src", raceObj[0].avatar);
	$(".playerName").text("Name: " + player.getName());
	$(".playerArmour").text(player.getArmourValue());
	$(".playerArmourName").text("Armour: " + player.getArmourName());
	$(".playerAttack").text(player.getAttack() + " + " + player.getWeaponDamage());
	$(".playerAttackWeapon").text("Weapon: " + player.getWeaponName());
	$("#playerHealthBar").text(player.getCurrentHealth() + "/" + player.getHealth())
	$("#playerStaminaBar").text(player.getCurrentStamina() + "/" + player.getStamina())
	$(".playerHealth").text("Health: " + player.getCurrentHealth() + " / " + player.getHealth());
	$(".playerAgility").text("Agility: " + player.getAgility());	
}	

//called at map movement to clear enemy detail of square
function printOthersExamination() {
	let enemyMapPosition = storyObj[currentMap].enemyCoords;
	let playerMapPosition = player.getMapPosition();
	let enemyId;
	let otherArmour;
	let otherWeapon;
		
	//populates enemy name information using square id enemy[x] and story obj
	for(var i = 0; i < enemyMapPosition.length; i++) {
		if(JSON.stringify(player.getMapPosition()) === JSON.stringify(enemyMapPosition[i])) {
			enemyId = $("#" + playerMapPosition[0] + "-" + playerMapPosition[1]).children().attr('id').match(/\d+/)[0];
			otherArmour = enemies[enemyId].getArmourName();
			otherWeapon = enemies[enemyId].getWeaponName();	

			$("#otherName").text("Enemy: " + enemies[enemyId].getName());
			if(otherArmour != null)
				$("#otherArmourName").text("Wearing: " + enemies[enemyId].getArmourName());	
			else
				$("#otherArmourName").text("Wearing: none");
			if(otherWeapon != null)
				$("#otherAttackWeapon").text("Holding: " + enemies[enemyId].getWeaponName());
			else
				$("#otherAttackWeapon").text("Holding: none");
		}
		else {
			$("#otherName").text("Enemy: none");
			$("#otherArmourName").text("Wearing: none");
			$("#otherAttackWeapon").text("Holding: none");
		}
	}
}

//sets ui to battle or fight state
function startBattle() {
	//getting correct enemy if needed
	if(enemy == null) {
		temp = player.getMapPosition();
		//enemy1 -> 1
		currentEnemy = $("#" + temp[0] + "-" + temp[1]).children().attr('id').match(/\d+/)[0];
		enemy = enemies[currentEnemy];
		$("#activeEnemy").attr("src", enemies[currentEnemy].getAvatar());
	} 
	else {
		$("#activeEnemy").attr("src", enemy.getAvatar());
	}
	uiReset();
	$("#mapMain").hide();
	printPlayerStatus();
	$("#battleMain").show();
	$("#gameTopTab").show();
	
	//$("#enemyName").text(enemy.getName());
	//$("#enemyArmour").text(enemyArmour);
	//$("#enemyAttack").text(enemyAttack);		
}	

//generates map onto main map div
function populateMap() {
	//enable save and title buttons, hide exit button
	$(".saveGame").prop('disabled', false);
	$(".toTitleButton").prop('disabled', false);


	//generates map tiles, applies background tile image or design
	for(var i = 1; i < 9; i++) {
		$("#mapRow" + i).empty().removeAttr("style");
		for(var j = 1; j < 9; j++) {
			$("#mapRow" + i).append("<div class='mapTile col text-center' id='" + j + "-" + i + "'><p>g</p></div>")
				.css("background-color", "white").css("color", "green");
		}
	}
	//can use images here
	//$(".mapTile").css("background-image", "url(" + mapObj[0].defaultTile + ")");
	//set player, endpoint and enemy current position
	
	//change p tag in correct tiles to show player, enemy and endpoint on ui	
	let playerMapPosition = [];
	playerMapPosition = playerMapPosition.concat(storyObj[currentChapter].startPoint);	
	$("#" + playerMapPosition[0] + "-" + playerMapPosition[1]).empty().append("<p id='player'>c</p>")
		.css("background-color", "green").css("color", "white");
			
	let enemyCount = parseInt(storyObj[currentChapter].enemyCount);
	let enemyMapPosition = storyObj[currentMap].enemyCoords;
	let exitMapPosition = mapObj[currentMap].endPoint;
	
	//enemy positions added to enemy objs from story obj listing
	for(var k = 0; k < enemyCount; k++) {
		enemies[k].setMapPosition(enemyMapPosition[k]);
	}		
	//change p tag in correct tiles to show player, enemy and endpoint on ui	
	$("#" + playerMapPosition[0] + "-" + playerMapPosition[1]).empty().append("<p id='player'>c</p>")
		.css("background-color", "green").css("color", "white");
		
	//populates map with enemies only if their health is above zero	
	for(var i = 0; i < enemyMapPosition.length; i++) {
		if(enemies[i].currentHealth > 0) {
			let temp = enemyMapPosition[i];
			$("#" + temp[0] + "-" + temp[1]).empty().append("<p id=enemy" + i + ">e</p>")
				.css("background-color", "red").css("color", "black");
		}
	}	
	//mark exit point
	$("#" + exitMapPosition[0] + "-" + exitMapPosition[1]).empty()
		.append("<p id='exit' class='row pl-2'>exit</p>").css("background-color", "blue").css("color", "white");
	
	$("#mapMain").show();
}
	
/*
reads through story text to maximum number of defined pages and then 
displays next option
*/
function progressStory() {
	//enable save
	$(".saveGame").prop('disabled', false).text("Save");
	
	//displays next page if available
	if(currentPage < parseInt(storyObj[currentChapter].pageLength - 1)) {
		currentPage++;
		$("#storyText").text(storyObj[currentChapter].pages[currentPage]);
	} 
	//disables next button at end of chapter
	//if((currentPage + 1) == storyObj[currentChapter].pageLength) {
	if(currentPage == parseInt(storyObj[currentChapter].pageLength - 1)) {
		//if next state is gift, gives an item then moves to next state
		if(Object.keys(storyObj[currentChapter].nextState[currentState]) == "itemGift") {
			let giftArray = storyObj[currentChapter].nextState[currentState].itemGift;
			for(var i = 0; i < giftArray.length; i++) {
				player.addToItemInventory(giftArray[i].name, parseInt(giftArray[i].quantity));
			}
			refreshItems();
			currentState++;
		}
		//if fight state, presents fight button
		if(Object.keys(storyObj[currentChapter].nextState[currentState]) == "fight") {
			$("#storyEnd").text("Fight!").show();
			$("#storyEnd").click(function() {
				$("#storyMain").hide();
				startBattle();
			});	
			//disables next page button if next state is a fight
			$("#storyProgress").prop('disabled', true);
		}
		//if just to next chapter
		if(Object.keys(storyObj[currentChapter].nextState[currentState]) == "end") {
			$("#storyEnd").text("Next chapter!").show();
			$("#storyEnd").click(function() {
				currentChapter++;
				currentPage = 0;
				currentState = 0;
				currentEnemy = 0;
				enemyCount = 0;
			});	
			//disables next page button if next state is a new chapter
			$("#storyProgress").prop('disabled', true);
		}
		
		//if map state, allows go to map or loads map from save
		if(Object.keys(storyObj[currentChapter].nextState[currentState]) == "map") {
			uiReset();
			//if in battle does not disable
			if(enemy != null) {
				$(".saveGame").prop('disabled', false);
				$(".toTitleButton").prop('disabled', false);
				startBattle();
			}

			//shows go to map if not currently in a battle (load in)
			if(player.getMapPosition().length == 0) {
				if(enemies.length == 0)
					enemyInit();
				let playerMapPosition = [];
				let startPoint = mapObj[currentChapter].startPoint;
				let newPosition = playerMapPosition.concat(startPoint);
				player.setMapPosition(newPosition);
				$("#storyEnd").text("To Map").show();
				$("#storyEnd").click(function() {
					$("#storyMain").hide();
					populateMap();
					updateMap("player", null);
					updateMap(null, null);
				});					
				//disables next chapter button if next state is a map
				$("#storyProgress").prop('disabled', true);	
			}
			else {
				$("#storyMain").hide();
				populateMap();
				updateMap("player", null);
				updateMap(null, null);
				$("#mapMain").show();
			}	
		}		
	}		
}	

//helper function for switch calling map update
function updateMap(actor, direction) {
	let exitMapPosition = mapObj[currentMap].endPoint;
	//let enemyMapPosition = enemy.getMapPosition();
	let enemyMapPosition = storyObj[currentMap].enemyCoords;
	let playerMapPosition = player.getMapPosition();
	
	//for previous spot after movement
	if(actor === "player") {
		
		//if was on same spot, restores square to enemy, corpse or end marker
		for(var i = 0; i < enemyMapPosition.length; i++) {
			//restores enemy spot or corpse
			if(JSON.stringify(player.getMapPosition()) === JSON.stringify(enemyMapPosition[i])) {	
				let temp = enemyMapPosition[i];
				if(enemies[i].getCurrentHealth() > 0) {
					$("#" + temp[0] + "-" + temp[1]).empty().append("<p id=enemy" + i + ">e</p>")
						.css("background-color", "red").css("color", "black");
				}
				else {
					$("#" + temp[0] + "-" + temp[1]).empty().append("<p id=corpse" + i + ">e</p>")
						.css("background-color", "black").css("color", "white");	
				}	
			
			} 
			//restores exit
			else if (JSON.stringify(player.getMapPosition()) === JSON.stringify(exitMapPosition)) {
				$("#" + exitMapPosition[0] + "-" + exitMapPosition[1]).empty()
					.append("<p id='exit' class='row pl-2'>exit</p>").css("background-color", "blue").css("color", "white");
				$("#mapFight").show();
				$("#mapExit").hide();
			}	
			//restores base
			else {
			$("#" + playerMapPosition[0] + "-" + playerMapPosition[1]).empty().append("<p>g</p>")
				.css("border", "1px solid black").css("background-color", "white").css("color", "green");	
			}					
		}	
		
		//set player new position
		if(direction === "mapLeft")
			player.setMapXPosition(playerMapPosition[0] - 1);
		if(direction === "mapRight")
			player.setMapXPosition(playerMapPosition[0] + 1);
		if(direction === "mapUp")
			player.setMapYPosition(playerMapPosition[1] + 1);
		if(direction === "mapDown")
			player.setMapYPosition(playerMapPosition[1] - 1);
		
		//get new location of player and update detail text
		playerMapPosition = player.getMapPosition();
		$("#mapFight").prop("disabled", true);

		//update map status tag based on what the player is going to be walking on
		//base terrain
		if($("#" + playerMapPosition[0] + "-" + playerMapPosition[1]).text() === "g") {
			$("#mapStatus").text("You are walking on a grassy field.");
			$("#mapExit").hide().prop('disabled', true);	
		}

		//exit point, update text and shows exit button
		if($("#" + playerMapPosition[0] + "-" + playerMapPosition[1]).text() === "exit") {
			$("#mapStatus").text("You are walking on a grassy field. There is a path leading out of this area.");
			$("#mapFight").hide();	
			if(enemyCount <= 0)	
				$("#mapExit").show().prop('disabled', false);
			else 
				$("#mapExit").show().prop('disabled', true);
		}
			

		if($("#" + playerMapPosition[0] + "-" + playerMapPosition[1]).text() === "e") {
			$("#mapExit").hide().prop('disabled', true);	
			
			if($("#" + playerMapPosition[0] + "-" + playerMapPosition[1]).children().attr('id').match(/^corpse/)) {
				let tempName = "";
				for(var i = 0; i < enemyMapPosition.length; i++) {
					if(JSON.stringify(player.getMapPosition()) === JSON.stringify(enemyMapPosition[i])) {
						tempName = enemies[i].name;
					}
				}
				$("#mapStatus").text("There is a corpse of a " + tempName + " here.");
				
				//add logic if dquare is also an exit square
				if(JSON.stringify(player.getMapPosition()) === JSON.stringify(exitMapPosition)) {
					$("#mapStatus").text("There is a corpse of a " + tempName + " here. There is a way out of the area here.");
					$("#mapFight").hide();
					$("#mapExit").show().prop('disabled', false);
				}
			}	
			else {
				$("#mapStatus").text("There is someone here...");	
				$("#mapFight").prop("disabled", false);
			}
			//logic for if corpse but exit point
		}	

		//updates new spot moved onto to player marker and preserves enemy id		
		let enemyMapId = $("#" + playerMapPosition[0] + "-" + playerMapPosition[1]).children().attr('id');
 		if(enemyMapId != undefined) {
			$("#" + playerMapPosition[0] + "-" + playerMapPosition[1]).empty().append("<p id=" + enemyMapId + ">c</p>")
			.css("background-color", "green").css("color", "white");
		}
		else {
			$("#" + playerMapPosition[0] + "-" + playerMapPosition[1]).empty().append("<p id='player'>c</p>")
			.css("background-color", "green").css("color", "white");
		}	
	}
	//for endpoint and enemies
	else {
		//populates enemy position if health greater than zero and exit point		
		for(var i = 0; i < enemyMapPosition.length; i++) {
			let temp = enemyMapPosition[i];
			if(enemies[i].getCurrentHealth() > 0) {
				if(temp.every((val, index) => val === playerMapPosition[index])) {
					$("#" + temp[0] + "-" + temp[1]).empty().append("<p id=enemy" + i + ">ce</p>")
					.css("background-color", "yellow").css("color", "black");
				}
				else {	
					$("#" + temp[0] + "-" + temp[1]).empty().append("<p id=enemy" + i + ">e</p>")
						.css("background-color", "red").css("color", "black");
				}
			}
			else {
				if(temp.every((val, index) => val === playerMapPosition[index]) && temp.every((val, index) => val === exitMapPosition[index])) {
					$("#" + temp[0] + "-" + temp[1]).empty().append("<p id=enemy" + i + ">ce</p>")
					.css("background-color", "green").css("color", "black");
					
				}
				else if(temp.every((val, index) => val === playerMapPosition[index]) && enemies[i].getCurrentHealth() > 0) {
					$("#" + temp[0] + "-" + temp[1]).empty().append("<p id=enemy" + i + ">ce</p>")
					.css("background-color", "green").css("color", "black");
				}
				else if(temp.every((val, index) => val === playerMapPosition[index]) && enemies[i].getCurrentHealth() <= 0) {
					$("#" + temp[0] + "-" + temp[1]).empty().append("<p id=corpse" + i + ">ce</p>")
					.css("background-color", "green").css("color", "black");
				}
				else {
					$("#" + temp[0] + "-" + temp[1]).empty().append("<p id=corpse" + i + ">e</p>")
						.css("background-color", "black").css("color", "white");	
				}
			}	
		}		
	}
}	
//populates examine modal depending on where player is standing
function getExaminationResults() {

	//populate player conditions
	let tempBuffArray = player.getStatusBuffArray();
	let buffStr;
	$("#playerMapConditions").empty();

	for(let i = 0; i < tempBuffArray.length; i++) {
		buffStr = tempBuffArray[i].getName() + " " + tempBuffArray[i].getEffect() + " " +
			tempBuffArray[i].getEffectPercent() + "% x" + tempBuffArray[i].getStackCount() + " " +
			tempBuffArray[i].getDuration() + " left";
		$("#playerMapConditions").append("<p>" + buffStr + "</p>");
	};

	if($("#playerMapConditions").children().length < 1) {
		$("#playerMapConditions").append("<p class='col'>normal</p>");
	}

	let enemyMapPosition = storyObj[currentMap].enemyCoords;
	let playerMapPosition = player.getMapPosition();
	let enemyId = $("#" + playerMapPosition[0] + "-" + playerMapPosition[1]).children().attr('id').match(/\d+/)[0];
	let otherArmour = enemies[enemyId].getArmourName();
	let otherWeapon = enemies[enemyId].getWeaponName();	

	printOthersExamination();

	//examining a corpse loots it
	if($("#" + playerMapPosition[0] + "-" + playerMapPosition[1]).children().attr('id').match(/^corpse/)) {
		let otherArmourValue = enemies[enemyId].getArmourValue();
		if(otherArmour != null)
			if(!player.addEquipment({name: otherArmour, value: otherArmourValue}))
				enemies[enemyId].unequipArmour();
		let otherWeapon = enemies[enemyId].getWeaponName();
		let otherWeaponvalue = enemies[enemyId].getWeaponValue();
		if(otherWeapon != null)	
			if(!player.addEquipment({name: otherWeapon, value: otherWeaponvalue}))
				enemies[enemyId].unequipWeapon();
	}
}	

//game starting scripts
//button functions	
$(document).ready(function(){
		
	if(localStorage.getItem("player") === null) {
		$("#continueButton").prop('disabled', true);
	}
	
	//new game selected
	$("#startButton").click(function() {
		//reset page progress
		localStorage.clear();
		currentChapter = 0;
		currentPage = 0;
		currentState = 0;
		currentEnemy = null;
		enemyCount = 0;
		
		//panel set for game session
		$('[data-toggle="tooltip"]').tooltip();
		$("#gameIntroMenu").hide();
		$(".introButtons").hide();
		$("#playerConfigMenu").show();
	});
	
	//saving character configuration and starting story
	$("#completeConfig").click(function() {
		$("#playerConfigMenu").hide();
			
		//call set game values
		gameInit();
		
		//reset before-game configuration values
		currentConfigAlloc = 0;
		strengthAlloc = 0;
		enduranceAlloc = 0;
		lifeAlloc = 0;
		$("#strengthAlloc").text("0");
		$("#enduranceAlloc").text("0");
		$("#lifeAlloc").text("0");
		
		startStory();	
	});

	//player actor configuration logic
	$("#decreaseStrengthAlloc").click(function() {
		if(strengthAlloc > 0) {
			strengthAlloc--;
			$("#strengthAlloc").text(strengthAlloc);
			currentConfigAlloc--;
		}	
	});

	$("#decreaseEnduranceAlloc").click(function() {
		if(enduranceAlloc > 0) {
			enduranceAlloc--;
			$("#enduranceAlloc").text(enduranceAlloc);
			currentConfigAlloc--;
		}		
	});

	$("#decreaseLifeAlloc").click(function() {
		if(lifeAlloc > 0) {
			lifeAlloc--;
			$("#lifeAlloc").text(lifeAlloc);
			currentConfigAlloc--;
		}		
	});

	$("#increaseStrengthAlloc").click(function() {
		if(currentConfigAlloc <= 11) {
			strengthAlloc++;
			$("#strengthAlloc").text(strengthAlloc);
			currentConfigAlloc++;
		}		
	});

	$("#increaseEnduranceAlloc").click(function() {
		if(currentConfigAlloc <= 11) {
			enduranceAlloc++;
			$("#enduranceAlloc").text(enduranceAlloc);
			currentConfigAlloc++;
		}	
	});

	$("#increaseLifeAlloc").click(function() {
		if(currentConfigAlloc <= 11) {
			lifeAlloc++;
			$("#lifeAlloc").text(lifeAlloc);
			currentConfigAlloc++;
		}		
	});
			
	//calculates damages, updates fields on attack button
	function battleTurn() {
		$(".saveGame").text("Save").prop('disabled', false);
		$("#attackButton").hide();
		$("#defendButton").hide();
		$("#itemButton").hide();
		$("#skillMenu").hide();
		$("#nextTurnButton").show();	
			
		//if defends, increases armour and stamina
		if(playerDefend) {
			player.recoverStamina();
			$("#playerStaminaBar").text(player.getCurrentStamina() + "/" + player.getStamina());
			$("#playerStaminaBar").css('width', (Math.floor((player.getCurrentStamina() /player.getStamina()) * 100)) + "%");
			player.defend();
			playerDamage = 0;
		}	
		
		//if enemy defends, increases armor and stamina
		//checks against personality
		enemyDefend = enemy.considerDefense();

		//check against their stamina risk threshold, if at then enemy defends	
		enemyDefend = enemy.considerRest();
	
		if(enemyDefend) {
			enemy.recoverStamina();
			enemy.defend(); 	
			enemyDamage = 0;
			enemyAttackMade = true;
		}
		
		//if player and enemy didn't defend, attacks happen	
		//else {
		if(!playerDefend && !playerUseItem) {
			//if player chose to fight despite low stamina, attack fails
			if(player.getCurrentStamina() < player.getBaseAttackCost()) {
				playerAttackFailure = true;	
				$("#playerDamagedAmount").text("0");
				$("#playerDamagedAmount").text("0");
				$("#playerGameStatus").text("Fatigued");
			}	
			
			//agility check on regular attack
			agilityCheck();
			
			//player checks distance, if too far attack is failure for player
			//only checked if player using basic attack since calculated on skill use
			if(playerBasicAttack) {
				if((playerPosition + enemyPosition) > 0) {
					$("#playerGameStatus").text("Target out of range!");
					playerAttackFailure = true;
				}	
			}
			
			//player attack sequence only happens if attack did not fail, resets after
			if(playerAttackFailure == false) {
					//apply stamina use and penalties if any
					player.applyAttackExertion();
					if(player.getStaminaThreshold() >= 4) {
						$("#playerActiveEffects p:contains('fatigued')").remove();
						$("#playerActiveEffects").append("<p>" + "Fatigued: " + player.getFatigueStacks() + "</p>");
					}	
					$("#playerStaminaBar").text(player.getCurrentStamina() + "/" + player.getStamina());
					$("#playerStaminaBar").css('width', (Math.floor((player.getCurrentStamina() / player.getStamina()) * 100)) + "%");
					
				//random square targeted by player on basic attack
				if(playerBasicAttack) {
					//selects spot on enemy stance to target
					let targetSquare = getRandomInteger(1,9);
					let enemyStance = enemy.getStance();
					if(enemyStance[targetSquare - 1] == 0) {
						enemyDefenseBroken = true;
					}	
					//target square becomes red
					$(".e" + targetSquare).css({"border": "2px solid red"});		
				}	
				
				if(enemyDefenseBroken == true) {
					enemy.applyDefenseBreak();	
				}	
				
				playerDamage = player.getMeleeAttackDamage(enemy);
				
				player.setAttackPenalty(0);
				
				if(playerDamage > 0) {
					enemy.applyDamage(playerDamage);
				} 
				else {
					playerDamage = 0;	
				}	
			}
		}
		
		//checks if enemy made attack already (on skill use with player lower agility)
		if(enemyAttackMade == false) {
			enemyAttack();
		}
		
		//sets grid based on distance
		$(".characterPosition").css('background-color', 'green');
		$("#playerGridColumn" + playerPosition).css('background-color', 'gray');
		$("#enemyGridColumn" + enemyPosition).css('background-color', 'gray');
				
		//player attack, change to attack frame(s) and back after a while
		$(".playerImage").attr("src", raceObj[0].melee);
		
		//player attack animation code goes here
		setTimeout(function(){
			$(".playerImage").attr("src", raceObj[0].avatar);
		}, 500);
	
		//show damage
		//show defense broken damage
		if(playerDefenseBroken) {
			$("#playerDamagedAmount").text("Break!: " + enemyDamage);
		}	
		else {
			if(!playerAttackFailure) 
				$("#playerDamagedAmount").text("Hit: " + enemyDamage);	
		}
		
		if(enemyDefenseBroken) {
			$("#enemyDamagedAmount").text("Break!: " + playerDamage);
		}	
		else {
			if(!enemyAttackFailure) 
				$("#enemyDamagedAmount").text("Hit: " + playerDamage);	
		}
		//reset attack modifiers
		if(playerDefend) {
			player.stopDefend();
		}	
		if(enemyDefend) {
			enemy.stopDefend();
		}
		
		//reset
		enemyDefend = false;
		playerDefend = false;
		playerBasicAttack = true;
		playerAttackFailure = false;
		enemyAttackFailure = false;
		enemyAttackMade = false;
		player.setStance("111111111");
		enemy.setStance("111111111");
		enemyDefenseBroken = false;
		playerDefenseBroken = false;
		playerUseItem = false;	
			
			
		//process buffs at end of turn
		player.tickBuffs(enemy);
		enemy.tickBuffs(player);
			
			
		//update game based on changed values
		postAttackUpdates();
		if(gameEnd) 
			$("#nextTurnButton").hide();	
	}	


	$("#defendButton").click(function() {
		playerDefend = true;
		battleTurn();
	});

	$("#attackButton").click(function() {
		playerDefend = false;
		battleTurn();
	});
	
	//on clicking next button
	$("#nextTurnButton").click(function() {
		
		//reset damage values shown after display
		$("#playerDamagedAmount").text("---");
		$("#enemyDamagedAmount").text("---");
	
		//reset grids		
		for(let i = 0; i < 10; i++) {
			$(".p" + i).css({"border": "1px solid black"});
			$(".e" + i).css({"border": "1px solid black"});
		}
		
		//reset status messages
		$("#playerStatus").text("---");
		$("#playerGameStatus").text("---");
		$("#enemyGameStatus").text("---");
		
		//swap next button for attack button for new turn
		$("#nextTurnButton").hide();
		if(!gameEnd) {
			$("#attackButton").show();
			$("#defendButton").show();
			$("#itemButton").show();
			$("#skillMenu").show();
		}
	});	
	
	//from menu modal back to main website
	//<a href="{{ route('home') }}">Home</a>
	$(".returnButton").click(function() {
		window.location.href='/work';
	});
	
	$("#battleGameMenu").click(function() {
		$('#menuModal').modal('toggle');
	});	
	
	$("#skillMenu").click(function() {
		$('#skillModal').modal('toggle');
	});	
	
	$("#itemButton").click(function() {
		refreshItems();
		$('#itemModal').modal('toggle');
	});	
	
	$("#activeEnemy").click(function() {
		$('#enemyModal').modal('toggle');
	});	
	
	$("#activePlayer").click(function() {
		$('#playerModal').modal('toggle');
	});	
	
	//character design page race select script
	//on select box, populates race stats p element with race params
	//0 = check class 1 = check race
	$("#race").change(function () {
		var index = 0;
		var str = "";
		$( "select option:selected" ).each(function() {
			str += $( this ).text() + " ";
			//class details
			if(index == 0) {
				
			}
			//race status details
			if(index == 1) {
				for(var i = 0; i < raceObj.length; i++) {
					if(raceObj[i].race == $(this).text()) {
						raceSelection = raceObj[i].race;
						$("#raceStats").text("HP: " + raceObj[i].health + " " + 
							"ATK: " + raceObj[i].attack + " " +
							"SP: " + raceObj[i].stamina + " " +						
							"AGL: " + raceObj[i].agility + " "					
						);	
					}	
				}	
			}	
			index++;	
		});
		$("#characterChoice").text( str );
	}).change();	
	
	//story progress button
	$("#storyProgress").click(function() {
		progressStory();
	});
	
	//save data to local storage
	$(".saveGame").click(function() {
		window.localStorage.setItem('player', JSON.stringify(player));
		window.localStorage.setItem('enemy', JSON.stringify(enemy));
		window.localStorage.setItem('enemies', JSON.stringify(enemies));
		window.localStorage.setItem('state', currentState);
		window.localStorage.setItem('chapter', currentChapter);
		window.localStorage.setItem('page', currentPage);
		window.localStorage.setItem('mapLoaded', mapLoaded);
		window.localStorage.setItem('currentEnemy', currentEnemy);
		$(".saveGame").text("Saved").prop('disabled', true);
	});	
	
	//from modal go to title
	$(".toTitleButton").click(function() {
		$(".toTitleButton").prop('disabled', false);
		$(".saveGame").text("Save").prop('disabled', false);
		if($('#battleMenuModal').hasClass('show'))
			$('#battleMenuModal').modal('toggle');
		if($('#mapMenuModal').hasClass('show'))
			$('#mapMenuModal').modal('toggle');		
		if(window.localStorage.getItem('player')) {
			$("#continueButton").prop('disabled', false);	
		}
		$("#nextChapterButton").hide();
		$("#gameIntroMenu").show();
		$(".introButtons").show();
		$("#battleMain").hide();
		$("#gameTopTab").hide();
		$("#storyMain").hide();
		$("#mapMain").hide();
	});

	//loads player data from local storage, battle progress not saved 
	$("#continueButton").click(function() {
		//enable buttons
		$(".toTitleButton").prop('disabled', false);
		$(".saveGame").text("Save").prop('disabled', false);

		//player
		playerData = JSON.parse(window.localStorage.getItem('player'));
		player = new Actor(playerData.name, playerData.race, playerData.actorClass, playerData.health, 
			playerData.attack, playerData.stamina, playerData.staminaRegen, playerData.baseAttackCost,
			playerData.agility, playerData.avatar);			
		
		player.equipWeapon(
			playerData.weaponName, 
			playerData.weaponDamage
		);

		player.equipArmour(
			playerData.armourName, 
			playerData.armourValue
		);	

		player.setCurrentHealth(playerData.currentHealth);
		player.setCurrentStamina(playerData.currentStamina);
		player.setMeleeSkills(playerData.meleeSkillArray);

		for(var i = 0; i < (playerData.itemInventory).length; i++) {
			let tempItem = new Item((playerData.itemInventory)[i].name, (playerData.itemInventory)[i].effect, 
				(playerData.itemInventory)[i].stackLimit, (playerData.itemInventory)[i].effectPercent, 
				(playerData.itemInventory)[i].cost, (playerData.itemInventory)[i].duration,
				(playerData.itemInventory)[i].quantity);
			player.addToItemInventory(tempItem, 0);
		}

		for(var i = 0; i < (playerData.equipmentArray).length; i++) {
			player.addEquipment({name: (playerData.equipmentArray)[i].name, 
				value: (playerData.equipmentArray)[i].value});
		}

		player.setMapPosition(playerData.mapPosition);	

		//enemies
		enemies.length = 0;
		enemyData = JSON.parse(window.localStorage.getItem('enemies'));
		let enemyCount = parseInt(storyObj[currentChapter].enemyCount);
		for(var i = 0; i < enemyCount; i++) {
			enemy = new Actor(enemyData[i].name, enemyData[i].race, enemyData[i].actorClass, enemyData[i].health, 
				enemyData[i].attack, enemyData[i].stamina, enemyData[i].staminaRegen, enemyData[i].baseAttackCost,
				enemyData[i].agility, enemyData[i].avatar);			
			
			enemy.equipWeapon(
				enemyData[i].weaponName, 
				enemyData[i].weaponDamage
			);

			enemy.equipArmour(
				enemyData[i].armourName, 
				enemyData[i].armourValue
			);

			enemy.setCurrentHealth(enemyData[i].currentHealth);
			enemy.setCurrentStamina(enemyData[i].currentStamina);	
			enemy.setMeleeSkills(enemyData[i].meleeSkillArray);
			enemy.setItemInventory(enemyData[i].itemInventory);
			enemy.setMapPosition(enemyData[i].mapPosition);		
			enemy.setPersonality(enemyData[i].personality);			

			enemies.push(enemy);
		}
		
		//current enemy
		currentEnemy = window.localStorage.getItem('currentEnemy');
		enemy = enemies[currentEnemy];
		
		currentState = window.localStorage.getItem('state');
		currentChapter = window.localStorage.getItem('chapter');
		currentPage = window.localStorage.getItem('page');
		mapLoaded = window.localStorage.getItem('mapLoaded');
		uiReset();
		$("#gameIntroMenu").hide();

		startStory();	
	});
	
	//end of battle victory and going to next page
	$("#nextChapterButton").click(function() {
		
	});	
	
	//map directional control buttons
	$(".mapDirControl").click(function() {
		//empty others examination details in modal
		printOthersExamination();

		//tick buffs on movement
		player.tickBuffs(player);
		//allow save on movement
		$(".saveGame").text("Save").prop('disabled', false);
		
		//populates player new position	
		let playerMapPosition = player.getMapPosition();
		switch (this.id) {
			case "mapLeft": 
				if(playerMapPosition[0] > 1) {
					updateMap("player", this.id);
					updateMap(null, null);
				}
				break;
			case "mapUp": 
				if(playerMapPosition[1] < 8) {
					updateMap("player", this.id);
					updateMap(null, null);
				}
				break;
			case "mapDown":
				if(playerMapPosition[1] > 1) {
					updateMap("player", this.id);
					updateMap(null, null);
				}
				break;
			case "mapRight":
				if(playerMapPosition[0] < 8) {
					updateMap("player", this.id);
					updateMap(null, null);
				}
				break;	
			default:
				break;
		}
	});
	
	//map fight button
	$("#mapFight").click(function() {	
		startBattle();
	});
	
	//exit fight button on victory
	//calls update to remove enemy from square cleared
	$("#battleReturnMap").click(function() {
		$("#battleReturnMap").hide();
		uiReset();	
		updateMap("player", null);
		updateMap(null, null);	
		$("#battleMain").hide();
		$("#gameTopTab").hide();
		$("#mapMain").show();	
	});
	
	//map examine button
	$("#mapExamine").click(function() {
		printPlayerStatus();
		getExaminationResults();
		$('#mapExamineModal').modal('toggle');
	});
	
	//map item button
	$("#mapEquip").click(function() {
		refreshEquipment();
		$('#equipModal').modal('toggle');
	});
	
	//map item button
	$("#mapItem").click(function() {
		refreshItems();
		$('#mapItemModal').modal('toggle');
	});	
});