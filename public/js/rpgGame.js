//game data

var weaponObj = [{ "name":"Wood Sword" , "damage":"1" } ];

var armourObj = [{ "name":"Wood armour" , "reduction":"1" } ];
	
//ST, EN, LI is strength(atk), endurance(sp), life(hp)	
//for android only
var implantObj = [
	{ "name":"Pain Inhibitor" , "effect":"Reduce Damage", "buffPercent":"10" }, 
	{ "name":"Fatigue Inhibitor" , "effect":"Increase agility", "buffPercent":"10" }, 
	{ "name":"Steroid Booster" , "effect":"Increase ST-EN-LI", "buffPercent":"10" },
	{ "name":"Battlefield Aid" , "effect":"Regenerate LI-EN", "buffPercent":"1" }
];	

var personalityObj = [
	{ "type":"Aggressive" , "attackPercent":"100", "defendPercent":"0", "skillPercent":"0" }, 
	{ "type":"Defensive" , "attackPercent":"50", "defendPercent":"50", "skillPercent":"0" }
];	
	
var enemyObj = [
	{ "name":"Pickpocket", "health":"100", "attack":"10", "stamina":"100", "staminaRegen":"10", "healthRegen":"0", "baseAttackCost":"10", "agility":"1", "avatar":"/img/enemyFace.jpg" },
	{ "name":"Mugger", "health":"150", "attack":"10", "stamina":"100", "staminaRegen":"10", "healthRegen":"0", "baseAttackCost":"10", "agility":"1", "avatar":"/img/enemyFace.jpg" }
];

var raceObj = [
	{ "name":"human", "health":"100", "attack":"10", "stamina":"100", "staminaRegen":"10", "healthRegen":"0", "baseAttackCost":"10", "agility":"1", "avatar":"/img/playerFace.jpg", "melee":"/img/playerFaceMelee.jpg" },
	{ "name":"android", "health":"100", "attack":"100", "stamina":"100", "staminaRegen":"10", "healthRegen":"0", "baseAttackCost":"10", "agility":"1", "avatar":"/img/playerFace.jpg", "melee":"/img/playerFaceMelee.jpg" }
];		

//stance is 000000000
//0 is exposed to attack
//target is 1 for targeted parts
//left upper, head, right upper, left mid, torso, right mid, left leg, groin, right leg 

var meleeSkillObj = [
	{ "name":"Arm Smash", "bodyTarget":"100100000", "stanceResult":"110110111", "debuff":"Attack Reduction", "debuffPercent":"10", "effect":"none", "range":"0", "effectQuantity":"1", "percent":"100", "meleePercentagePenalty":"10", "staminaCost":"5" },
	{ "name":"Advancing Swing II", "bodyTarget":"100100000", "stanceResult":"110110111", "debuff":"none", "effect":"Decrease Distance", "range":"2", "effectQuantity":"1", "percent":"100", "meleePercentagePenalty":"0", "staminaCost":"10" },
	{ "name":"Retreating Cut II", "bodyTarget":"100100000", "stanceResult":"110110111", "debuff":"none", "effect":"Increase Distance", "range":"6", "effectQuantity":"2", "percent":"100", "meleePercentagePenalty":"50", "staminaCost":"10" },
	{ "name":"Heavy Attack", "bodyTarget":"100100000", "stanceResult":"100100110", "debuff":"none", "effect":"none", "range":"0", "effectQuantity":"1", "percent":"100", "meleePercentagePenalty":"-100", "staminaCost":"20" }
];


var battleItemObj = [
	{ "name":"Auto-Injector: Berserker" , "effect":"Attack Increase", "effectStackLimit":"1", "buffPercent":"10" },
	{ "name":"Auto-Injector: Clot Enzyme", "effect":"Remove Bleed", "effectStackLimit":"1" }
];

//random helper function
function getRandomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}	

//melee skill object
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
		return this.penalty;
	}

	setPenalty(penalty) {
		this.penalty = penalty;
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

class Actor {
	//randomizers are for enemy actor and adds up to 30% each to attack and health
	//stamina randomizer added but not used
		//to be adjusted down to 20% each once enemy skill use is implemented
	constructor(name,health,attack,stamina,staminaRegen,baseAttackCost,agility) {
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
		this.personality = null;
		this.limbHealth = "1111";
		this.staminaRegen = parseInt(staminaRegen);
		this.baseAttackCost = parseInt(baseAttackCost);
		this.attackPenalty = 0;
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
	
	addMeleeSkill(name,effect,percent) {
		var skill = new MeleeSkill(name,effect,percent);
		this.meleeSkillArray.push(skill);
	}

	getMeleeSkills() {
		return this.meleeSkillArray;
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
			damage = Math.ceil((this.getAttackValue() * ((100 - this.attackPenalty()) / 100) - enemy.getArmourValue()));
		}	
		
		else if(this.attackPenalty < 0) {
			playerDamage = Math.ceil((this.getAttackValue() * ((100 - this.attackPenalty()) / 100) - enemy.getArmourValue()));
		}
		
		else {
			playerDamage = Math.ceil(this.getAttackValue() - enemy.getArmourValue());
		}
		return damage;
	}	
}

/*
init player and enemy
*/

var player;
var enemy;

var playerPosition = 0;
var enemyPosition = 0;



var playerSkillCount = 0;
var playerSkillArray = null;

var playerAttackFailure = false;
var enemyAttackFailure = false;
var enemyAttackMade = false;

var enemyDamage;
var playerDamage;

var playerDefenseBroken = false;
var enemyDefenseBroken = false;


var firstRun = true;

var currentConfigAlloc = 0;
var strengthAlloc = 0;
var enduranceAlloc = 0;
var lifeAlloc = 0;
		
var gameEnd = false;		
		
var playerBasicAttack = true;		

var playerDefend = false;
var enemyDefend = false;


//random enemy skill use based on what they have
function skillEnemyAttack() {
	//gets enemy assigned skill array
	let skills = enemy.getMeleeSkills();
	//random selection
	let skillChoice = getRandomInteger(0, (skills.length - 1));
	
	for(var j = 0; j < meleeSkillObj.length; j++) {	
	
		//finds skill details in enemy skill array
		if(meleeSkillObj[j].name == skills[skillChoice].name) {
			enemy.setAttackPenalty(parseInt(meleeSkillObj[j].meleePercentagePenalty));
			
			//no agility check, enemy moves first or last determined at attack phase
			//agilityCheck();
			
			//checks if stamina available, if not attack fails and regular exchange happens
			if((enemyCurrentStamina - meleeSkillObj[j].staminaCost) < 0) {
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
				for(let i = 0; i < 10; i++) {
					if(meleeSkillObj[j].stanceResult[i] == 0)
						$(".p" + i).css({"border": "2px solid yellow"});
				}
				for(let i = 0; i < 10; i++) {
					if(meleeSkillObj[j].bodyTarget[i] == 1)
						$(".e" + i).css({"border": "2px solid red"});
				}			
				
				//check player stance to see if damage reduced
				let enemyTargeting = meleeSkillObj[j].bodyTarget;
				let playerStance = player.getStance();
				for(let i = 0; i <  enemyTargeting.length; i++) {
					if(enemyTargeting[i] == 1 && playerStance[i] == 0) {
						playerDefenseBroken = true;	
					}	
				}	

				//applies debuff if any, does not apply it if defended against			
				if(meleeSkillObj[j].debuff != "none") {
					$("#playerActiveEffects").text(meleeSkillObj[j].debuff);
					$("#playerConditionTriangle").css('border-top', '20px solid red');
					
					//debuff list
					if(meleeSkillObj[j].debuff === "attack reduction") {
						if(enemyDefend)
							enemyAttackPenalty = Math.floor(meleeSkillObj[j].debuffPercent / 2);
						if(!enemyDefend)
							enemyAttackPenalty = meleeSkillObj[j].debuffPercent;
						if(enemyDefenseBroken)
							enemyAttackPenalty = Math.floor(meleeSkillObj[j].debuffPercent * 1.5);						
					}	
				}
				
				//is using skill, next step calculates damage
				enemyAttackMade = false;
			}
		}
	}	
}	

	
function basicEnemyAttack() {
	
	//if defends, increases armour and stamina
	if(enemyDefend == true) {
		enemy.recoverStamina();
		enemy.defend(); 	
		enemyDamage = 0;
	}
	else {
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
			enemy.applyAttackExertion(); 
			
			//selects spot on player stance to target
			let targetSquare = getRandomInteger(0,8);
			let playerStance = player.getStance();
			if(playerStance[targetSquare] == 0) {
				playerDefenseBroken = true;	
				player.applyDefenseBreak();
			}	
			
			//target square becomes red
			$(".p" + targetSquare).css({"border": "2px solid red"});	
				
				
				
			/*	
			if(enemy.getAttackPenalty() != 0) {
				enemyDamage = Math.ceil((enemy.getAttackValue() * ((100 - enemy.getAttackPenalty()) / 100) - player.getArmourValue()));
			}	
			else {
				enemyDamage = Math.ceil(enemy.getAttackValue() - player.getArmourValue());
			}	
			
			if(enemyDamage > 0) {
				player.applyDamage(enemyDamage);
			}	
			else {
				enemyDamage = 0;	
			}
			*/

			enemyDamage = getMeleeAttackDamage(player);		
			
			//reset armour break
			if(playerDefenseBroken)
				player.removeDefenseBreak();
		}
		//sets grid based on distance
		$(".characterPosition").css('background-color', 'green');
		$("#playerGridColumn" + playerPosition).css('background-color', 'gray');
		$("#enemyGridColumn" + enemyPosition).css('background-color', 'gray');
	}	
	enemyAttackMade = true;
	enemy.setAttackPenalty(0);
}

function postAttackUpdates() {

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
	
	if(player.getCurrentHealth() < 1) {
		$("#playerHealthBar").text(player.getCurrentHealth());
		$("#playerHealthBar").css('width', 100 + "%");
		$("#playerHealthBar").removeClass();
		$("#playerHealthBar").addClass("bg-danger");
		$("#playerActiveEffects").text("");		
		
		$("#playerGameStatus").text("You lose!");

		$("#attackButton").hide();
		$("#skillMenu").hide();
		gameEnd = true;
	}	

	else if(enemy.getCurrentHealth() < 1) {
		$("#playerHealthBar").text(player.getCurrentHealth() + "/" + player.getHealth());
		$("#playerHealthBar").css('width', (Math.floor(player.getCurrentHealth() / player.getCurrentHealth()) * 100) + "%");
		
		$("#enemyActiveEffects").text("");
		$("#enemyStaminaCondition").text("");				
		
		$("#enemyConditionTriangle").css('color', 'green');		
		
		$("#playerGameStatus").text("You win!");
		
		$("#attackButton").hide();
		$("#skillMenu").hide();
		
		gameEnd = true;
	}
	else{
		$("#playerHealthBar").text(player.getCurrentHealth() + "/" + player.getHealth());
		$("#playerHealthBar").css('width', (Math.floor((player.getCurrentHealth() / player.getHealth()) * 100)) + "%");
	}
}

function agilityCheck() {
	//speed check, enemy performs attack first if slower
	if(player.getAgility() < enemy.getAgility()) {
		basicEnemyAttack();
		postAttackUpdates();
		enemyAttackMade = true;
	}
	//equal a flip is made, on a 1 enemy attacks first
	if(player.getAgility() == enemy.getAgility()) {
		var flip = Math.random() + 1;
		flip = Math.round(flip);
		if(flip == 1) {
			basicEnemyAttack();
			postAttackUpdates();
			enemyAttackMade = true;
			$("#playerStatus").text("Enemy moved first!");
		}
	}	
}	


//sets initial game mechanic values
//called from start and on reset
function gameInit() {
	
	//init player
	player = new Actor(
		raceObj[0].name,
		raceObj[0].health,
		raceObj[0].attack,
		raceObj[0].stamina,
		raceObj[0].staminaRegen,
		raceObj[0].baseAttackCost,		
		raceObj[0].agility
	);

	player.equipWeapon(
		weaponObj[0].name, 
		weaponObj[0].damage
	);

	player.equipArmour(
		armourObj[0].name, 
		armourObj[0].reduction
	);
	
	player.setHealth(Math.ceil(player.getHealth() * (1 + (0.05 * lifeAlloc))));
	player.setStamina(Math.ceil(player.getStamina() * (1 + (0.05 * enduranceAlloc))));
	player.setAttack(Math.ceil(player.getAttack() * (1 + (0.05 * strengthAlloc))));
	
	//assign list of skills
	for(var i = 0; i < meleeSkillObj.length; i++) {
		player.addMeleeSkill(meleeSkillObj[i].name, meleeSkillObj[i].effect,
			meleeSkillObj[i].percent, meleeSkillObj[i].penalty,
			meleeSkillObj[i].staminaCost);
	}
	
	//init enemy 
	enemy = new Actor(
		enemyObj[0].name,
		enemyObj[0].health,
		enemyObj[0].attack,
		enemyObj[0].stamina,
		enemyObj[0].staminaRegen,
		enemyObj[0].baseAttackCost,
		enemyObj[0].agility		
	);
	
	enemy.equipWeapon(
		weaponObj[0].name, 
		weaponObj[0].damage
	);

	enemy.equipArmour(
		armourObj[0].name, 
		armourObj[0].reduction
	);
	
	//randomize attack and health values
	//player.randomizeHealth();
	//player.randomizeAttack();
	enemy.randomizeHealth();
	enemy.randomizeAttack();

	
	//resets stances at beginning and grids
	player.setStance("111111111");
	enemy.setStance("111111111");
	for(let i = 0; i < 10; i++) {
		$(".p" + i).css({"border": "1px solid black"});
		$(".e" + i).css({"border": "1px solid black"});
	}

	//sets enemy personality at beginning
	let enemyPersonalityChoice = getRandomInteger(0, (personalityObj.length - 1));
	enemy.setPersonality(personalityObj[enemyPersonalityChoice]);
	
	
	//add buttons for each skill in possession
	//prints skill names
	//attacks right after with modifiers applied
	if(firstRun) {
		playerSkillArray = player.getMeleeSkills();
		var skillName = null;
		for(var i = 0; i < playerSkillArray.length; i++) {
			skillName = playerSkillArray[i].getName();
			$('#skillButtonArray').append('<input name="' + skillName + '" id=skillButton' + i + ' type="button" class="btn btn-primary active mb-1"></button>');								
			
			//skill logic
			//currently iterates over entire skill list to find matching name
			
			$('#skillButton' + i).prop('value',skillName).click({param1:skillName}, function(event) {
				//for(var j = 0; j < Object.keys(meleeSkillObj).length; j++) {	
				for(var j = 0; j < meleeSkillObj.length; j++) {	
					//finds skill details in data
					if(meleeSkillObj[j].name == event.data.param1) {
						player.setAttackPenalty(parseInt(meleeSkillObj[j].meleePercentagePenalty));
						
						//agility check
						agilityCheck();
						
						//checks if stamina available, if not attack fails and regular exchange happens
						if((playerCurrentStamina - meleeSkillObj[j].staminaCost) < 0) {
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
							applyStaminaSkillCost(parseInt(meleeSkillObj[j].staminaCost));
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
							for(let i = 0; i < 10; i++) {
								if(meleeSkillObj[j].stanceResult[i] == 0)
									$(".p" + i).css({"border": "2px solid yellow"});
							}
							for(let i = 0; i < 10; i++) {
								if(meleeSkillObj[j].bodyTarget[i] == 1)
									$(".e" + i).css({"border": "2px solid red"});
							}			
							
							//check enemy stance to see if damage reduced
							let playerTargeting = meleeSkillObj[j].bodyTarget;
							let enemyStance = enemy.getStance();
							for(let i = 0; i <  playerTargeting.length; i++) {
								if(playerTargeting[i] == 1 && enemyStance[i] == 0) {
									enemyDefenseBroken = true;	
								}	
							}	

							//applies debuff if any, does not apply it if defended against			
							if(meleeSkillObj[j].debuff != "none" && enemyDefenseBroken == true) {
								$("#enemyActiveEffects").text(meleeSkillObj[j].debuff);
								$("#enemyConditionTriangle").css('border-top', '20px solid red');
								if(meleeSkillObj[j].debuff === "attack reduction")
									enemyAttackPenalty = meleeSkillObj[j].debuffPercent;
							}

							$('#skillModal').modal('toggle');
							playerBasicAttack = false;//is using skill
							$("#attackButton").click();
						}
					}
				}
			});		
		}
		firstRun = false;
	}

	//game UI reset
	$(".characterPosition").css('background-color', 'green');
	$("#playerGridColumn0").css('background-color', 'gray');
	$("#enemyGridColumn0").css('background-color', 'gray');
	
	$("#playerGameStatus").text("---");
	$("#playerStatus").text("---");
	$("#playerDamagedAmount").text("---");
	$("#enemyDamagedAmount").text("---");
	
	$("#playerCondition").text('Uninjured').css('color', 'green');
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
	$("#skillMenu").show();
	
	//reset game so buttons show
	gameEnd = false;
}	

//game starting scripts	
$(document).ready(function(){
	
	$("#startButton").click(function() {
		
		//panel set for game session
		$('[data-toggle="tooltip"]').tooltip();
		$("#gameIntroMenu").hide();
		$(".introButtons").hide();
		$("#playerConfigMenu").show();
	});
	
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
		
		
		//show battle UI
		$("#battleMain").show();
		$("#gameTopTab").show();
		
		
		//set game text or picture values
		player.setName($("#name").val());
		
		$(".playerImage").attr("src", raceObj[0].avatar);
		$("#playerName").text("Name: " + player.getName());
		$("#playerArmour").text(player.getArmourValue());
		$("#playerArmourName").text("Armour: " + player.getArmourName());
		$("#playerAttack").text(player.getAttack() + " + " + player.getWeaponDamage());
		$("#playerAttackWeapon").text("Weapon: " + player.getWeaponName());
		
		$("#playerHealthBar").text(player.getCurrentHealth() + "/" + player.getHealth())
		$("#playerStaminaBar").text(player.getCurrentStamina() + "/" + player.getStamina())
				
		$("#playerHealthMaximum").text("Health: " + player.getHealth());
		$("#playerAgility").text("Agility: " + player.getAgility());
		
		$("#activeEnemy").attr("src", enemyObj[0].avatar);
		//$("#enemyName").text(enemy.getName());
		//$("#enemyArmour").text(enemyArmour);
		//$("#enemyAttack").text(enemyAttack);
		
			
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
		}		
	});
			
	//calculates damages, updates fields on attack button
	function battleTurn() {
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
		//if player didn't defend, attacks	
		else {
			//agility check on regular attack
			agilityCheck();
			
			//player checks distance, if too far attack is failure for player
			//only checked if player using basic attack
			if(playerBasicAttack) {
				if((playerPosition + enemyPosition) > 0) {
					$("#playerGameStatus").text("Target out of range!");
					playerAttackFailure = true;
				}	
			}
			
			//player attack sequence only happens if attack did not fail, resets after
			if(playerAttackFailure == false) {
					player.applyAttackExertion();
					$("#playerStaminaBar").text(player.getCurrentStamina() + "/" + player.getStamina());
					$("#playerStaminaBar").css('width', (Math.floor((player.getCurrentStamina() / player.getStamina()) * 100)) + "%");
				
				if(enemyDefenseBroken == true) {
					enemy.applyDefenseBreak();	
				}		
				
				/*
				if(player.getAttackPenalty != 0) {
					playerDamage = Math.ceil((player.getAttackValue() * ((100 - player.getAttackPenalty()) / 100) - enemy.getArmourValue()));
				}	
				
				else if(player.getAttackPenalty < 0) {
					playerDamage = Math.ceil((player.getAttackValue() * ((100 - player.getAttackPenalty()) / 100) - enemy.getArmourValue()));
				}
				
				else {
					playerDamage = Math.ceil(player.getAttackValue() - enemy.getArmourValue());
				}
				*/
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
			basicEnemyAttack();
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
		if(enemyDefend = true) {
			enemy.stopDefend();
		}
		
		enemyDefend = false;
		playerBasicAttack = true;
		playerAttackFailure = false;
		enemyAttackFailure = false;
		enemyAttackMade = false;
		player.setStance("111111111");
		enemy.setStance("111111111");
		enemyDefenseBroken = false;
		playerDefenseBroken = false;
			
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
		
		//swap next button for attack button for new turn
		$("#nextTurnButton").hide();
		if(!gameEnd) {
			$("#attackButton").show();
			$("#defendButton").show();
			$("#itemButton").show();
			$("#skillMenu").show();
		}
	});	
	
	
	//from modal go to title
	$("#toTitleButton").click(function() {
		$('#menuModal').modal('toggle');

		$("#gameIntroMenu").show();
		$(".introButtons").show();
		
		$("#battleMain").hide();
		$("#gameTopTab").hide();
	});
	
	//from menu modal back to main website
	//<a href="{{ route('home') }}">Home</a>
	$(".returnButton").click(function() {
		window.location.href='/work';
	});
	
	$("#operationMenu").click(function() {
		$('#menuModal').modal('toggle');
	});	
	
	$("#killMenu").click(function() {
		$('#skillModal').modal('toggle');
	});	
	
	$("#activeEnemy").click(function() {
		$('#enemyModal').modal('toggle');
	});	
	
	$("#activePlayer").click(function() {
		$('#playerModal').modal('toggle');
	});	
	
});