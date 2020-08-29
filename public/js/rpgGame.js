//game data

var weaponList = [{ "name":"Wood Sword" , "damage":"1" } ];

var armourList = [{ "name":"Wood armour" , "reduction":"1" } ];
	
var enemyList = [{ "name":"Pickpocket", "health":"10", "attack":"1", "stamina":"10", "avatar":"/img/enemyFace.jpg" },
	{ "name":"Mugger", "health":"15", "attack":"1", "stamina":"10", "avatar":"/img/enemyFace.jpg" }];
					
var raceList = [{ "name":"human", "health":"10", "attack":"1", "stamina":"10", "avatar":"/img/playerFace.jpg", "melee":"/img/playerFaceMelee.jpg" }];		


var meleeSkillList = [{ "name":"Arm Smash", "debuff":"Attack Reduction", "effect":"none", "range":"0", "effectQuantity":"1", "percent":"25", "meleePercentage":"10", "staminaCost":"1" },
	{ "name":"Advancing Swing I", "debuff":"none", "effect":"Decrease Distance", "range":"1", "effectQuantity":"1", "percent":"100", "meleePercentage":"50", "staminaCost":"2" },
	{ "name":"Disengage II", "debuff":"none", "effect":"Increase Distance", "range":"6", "effectQuantity":"2", "percent":"100", "meleePercentage":"50", "staminaCost":"2" }];


var battleItemList = [{ "name":"Auto-Injector: Berserker" , "effect":"Attack Increase", "effectStackLimit":"1", "meleePercentage":"10" },
	{ "name":"Auto-Injector: Clot Enzyme", "effect":"Remove Bleed", "effectStackLimit":"1" }];
	

//melee skill object
class MeleeSkill {
	constructor(name,effect,percent,penalty,cost) {
		this.name = name;
		this.effect = effect;
		this.percent = percent;
		this.powerPenalty = penalty;
		this.staminaCost = cost;
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
	//health and chance add 1 to 10
	//attack and chance add 0 to 5
	constructor(name,health,attack,stamina) {
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
	}	
	
	setPosition(position) {
		this.position = position;	
	}	
	getPosition() {
		return this.position;	
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
	
	getCurrentHealth() {
		return this.currentHealth;
	}
	
	setCurrentHealth(health) {
		this.currentHealth = health;
	}
	
	randomizeHealth() {
		this.health = parseInt(this.health) + Math.floor((Math.random() * 10) + 1);
		this.currentHealth = this.health;
	}

	randomizeAttack() {
		this.attack = parseInt(this.attack) + Math.floor(((Math.random() * 10) + 1) / 2);
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
}

/*
init objects from json data strings
init player and enemy

*/

var weaponObj;
var armourObj;
var battleItemObj;
var enemyObj;
var raceObj;
var player;
var enemy;

var playerHealth = null;
var playerCurrentHealth = null;
var playerStamina = null;
var playerCurrentStamina = null;

var enemyHealth = null;
var enemyCurrentHealth = null;
var enemyStamina = null;
var enemyCurrentStamina = null;
var playerWeapon = null;
var playerArmourName = null;
var playerArmour = null;
var playerAttack = null;
var enemyArmour = null;
var enemyAttack = null;

var playerSkillCount = 0;
var playerSkillArray = null;
var playerAttackPenalty = 0;
var enemyAttackPenalty = 0;

var playerPosition = 0;
var enemyPosition = 0;

var playerAttackFailure = false;
var enemyAttackFailure = false;


var firstRun = true;



//sets initial game mechanic values
//called from start and on reset
function gameInit() {
	
	//get game data from JSON
	weaponObj = weaponList;
	armourObj = armourList;
	battleItemObj = battleItemList;
	enemyObj = enemyList;
	raceObj = raceList;
	meleeSkillObj = meleeSkillList;
	
	
	//init player
	player = new Actor(
	raceObj[0].name,
	raceObj[0].health,
	raceObj[0].attack,
	raceObj[0].stamina
	);

	player.equipWeapon(
		weaponObj[0].name, 
		weaponObj[0].damage
	);

	player.equipArmour(
		armourObj[0].name, 
		armourObj[0].reduction
	);
	
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
		enemyObj[0].stamina
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
	player.randomizeHealth();
	player.randomizeAttack();
	enemy.randomizeHealth();
	enemy.randomizeAttack();
	
	//get and set initial game values
	playerHealth = player.getHealth();
	playerCurrentHealth = player.getHealth();
	playerStamina = player.getStamina();
	playerCurrentStamina = player.getStamina();
	
	enemyHealth = enemy.getHealth();
	enemyCurrentHealth = enemy.getHealth();
	enemyStamina = enemy.getStamina();
	enemyCurrentStamina = enemy.getStamina();
	
	playerWeapon = player.getWeaponName();
	playerArmourName = player.getArmourName();
	
	playerArmour = player.getArmourValue();
	playerAttack = player.getAttackValue();
	enemyArmour = enemy.getArmourValue();
	enemyAttack = enemy.getAttackValue();
	
	//add buttons for each skill in possession
	//prints skill names
	//attacks right after with modifiers applied
	if(firstRun) {
		playerSkillArray = player.getMeleeSkills();
		var skillName = null;
		for(var i = 0; i < playerSkillArray.length; i++) {
			skillName = playerSkillArray[i].getName();
			$('#skillButtonArray').append('<input name="' + skillName + '" id=skillButton' + i + ' type="button" class="btn btn-primary active"></button>');								
			
			$('#skillButton' + i).prop('value',skillName).click({param1:skillName}, function(event) {
				//for(var j = 0; j < Object.keys(meleeSkillObj).length; j++) {	
				for(var j = 0; j < meleeSkillObj.length; j++) {	
					//finds skill details in data
					if(meleeSkillObj[j].name == event.data.param1) {
						playerAttackPenalty = meleeSkillObj[j].meleePercentage;
						enemyAttackPenalty = meleeSkillObj[j].percent;

						//first checks if stamina available, if not attack fails and regular exchange happens
						if((playerCurrentStamina - meleeSkillObj[j].staminaCost) < 0) {
							$('#skillModal').modal('toggle');
							$("#gameStatus").text("Stamina too low!");
							playerAttackFailure = true;
							setTimeout(function(){
								$("#gameStatus").text("---");
							}, 1500);
							$('#skillModal').modal('toggle');
							$("#attackButton").click();
						}
						//next checks if target in range, if not attack fails and regular exchange happens
						else if((playerPosition + enemyPosition) > meleeSkillObj[j].range) {
							$("#gameStatus").text("Target out of range!");
							playerAttackFailure = true;
							setTimeout(function(){
								$("#gameStatus").text("---");
							}, 1500);
							$('#skillModal').modal('toggle');
							$("#attackButton").click();
						}
						//if enough stamina, executes skill
						else {					
							playerCurrentStamina = playerCurrentStamina - meleeSkillObj[j].staminaCost;
							$("#playerStaminaBar").text(playerCurrentStamina + "/" + playerStamina);
							$("#playerStaminaBar").css('width', (Math.floor((playerCurrentStamina / playerStamina) * 100)) + "%");
									
							$("#gameStatus").text(meleeSkillObj[j].name);
							
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

							//applies debuff if any			
							if(meleeSkillObj[j].debuff != "none") {
								$("#enemyActiveEffects").text(meleeSkillObj[j].debuff);
								$("#enemyConditionTriangle").css('border-top', '20px solid red');
							}
							
							setTimeout(function(){
								$("#gameStatus").text("---");
							}, 1500);
							$('#skillModal').modal('toggle');
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
	
	$("#gameStatus").text("---");
	
	$("#playerHealthCondition").text('Uninjured').css('color', 'green');
	$("#playerHealthBar").css('width', 100 + "%");
	$("#playerStaminaBar").css('width', 100 + "%");
	
	//reset health bars back to default
	$("#playerHealthBar").removeClass();
	$("#playerHealthBar").addClass('progress-bar');
	$("#playerHealthBar").addClass('bg-success');
	
	//reset stamina bar back to default
	$("#playerStaminaBar").removeClass();
	$("#playerStaminaBar").addClass('progress-bar');
	$("#playerStaminaBar").addClass('bg-success');
	
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
}	

//game starting scripts	
$(document).ready(function(){
	
	$("#startButton").click(function() {
		
		//call set game values
		gameInit();
		
		//panel set for game session
		$('[data-toggle="tooltip"]').tooltip();
		
		$("#gameIntroMenu").hide();
		$("#startlogoTitle").hide();
		$("#gameIntroMenu").hide();
		$("#gameIntroMenu").hide();
		$(".spacerBox").hide();
		
		$("#gameMain").show();
		$("#gameTopTab").show();
		
		
		//set game text or picture values
		player.setName($("#name").val());
		
		$(".playerImage").attr("src", raceObj[0].avatar);
		$("#playerName").text(player.getName());
		$("#playerArmour").text(playerArmour);
		$("#playerAttack").text(playerAttack);
		$("#playerHealthBar").text(playerCurrentHealth + "/" + playerHealth)
		
		$("#playerStaminaBar").text(playerCurrentStamina + "/" + playerStamina)
				
		$("#playerHealthMaximum").text(playerHealth);
		$("#playerAttackWeapon").text(playerWeapon);
		$("#playerArmourName").text(playerArmourName);
		
		
		$("#activeEnemy").attr("src", enemyObj[0].avatar);
		$("#enemyName").text(enemy.getName());
		$("#enemyArmour").text(enemyArmour);
		$("#enemyAttack").text(enemyAttack);
		
			
	});	
		
	//calculates damages, updates fields on attack button

	$("#attackButton").click(function() {
					
		//player attack sequence only happens if attack did not fail, resets after
		if(playerAttackFailure == false) {
			playerCurrentStamina--;
			$("#playerStaminaBar").text(playerCurrentStamina + "/" + playerStamina);
			$("#playerStaminaBar").css('width', (Math.floor((playerCurrentStamina / playerStamina) * 100)) + "%");
			var playerDamage = 0;
			if(playerAttackPenalty != 0) {
				playerDamage = Math.floor(playerDamage * (playerAttackPenalty / 100));
			}	
			else {
				playerDamage = playerAttack - enemyArmour;
			}
			playerAttackPenalty = 0;
			if(playerDamage > 0) {
				enemyCurrentHealth = enemyCurrentHealth - playerDamage;
			}
		}
		playerAttackFailure = false;
		
		//enemy moves forward if not close enough to attack 
		if(playerPosition == 0 && enemyPosition != 0) {
			enemyPosition--;	
		}	
		else if(playerPosition > 0 && enemyPosition == 0) {
			playerPosition--;
		}
		else if(playerPosition != 0 && enemyPosition != 0) {
			enemyPosition--;
		}	
		else {			
			enemyCurrentStamina--;
			var enemyDamage = 0; 
			enemyDamage = enemyAttack - playerArmour;
			if(enemyAttackPenalty != 0) {
				enemyDamage = Math.floor(enemyDamage * (enemyAttackPenalty / 100));
			}	
			if(enemyDamage > 0) {
				playerCurrentHealth = playerCurrentHealth - enemyDamage;
			}	
		}
		
		//sets grid based on distance
		$(".characterPosition").css('background-color', 'green');
		$("#playerGridColumn" + playerPosition).css('background-color', 'gray');
		$("#enemyGridColumn" + enemyPosition).css('background-color', 'gray');

			
		//player attack, change to attack frame(s) and back after a while
		$(".playerImage").attr("src", raceObj[0].melee);
		
		setTimeout(function(){
			$(".playerImage").attr("src", raceObj[0].avatar);
		}, 500);
		
		
		//set condition text for player based on health
		if((playerCurrentHealth / playerHealth) == 1) {
			$("#playerCondition").text("Uninjured").css('color', 'blue');
		}
		else if((playerCurrentHealth / playerHealth) >= .75 && (playerCurrentHealth / playerHealth) < 1) {
			$("#playerCondition").text("Lightly Injured").css('color', 'green');
		}
		else if((playerCurrentHealth / playerHealth) >= .50 && (playerCurrentHealth / playerHealth) < .75) {
			$("#playerCondition").text("Injured").css('color', 'red');
		}
		else if((playerCurrentHealth / playerHealth) >= .25 && (playerCurrentHealth / playerHealth) < .50) {
			$("#playerCondition").text("Heavy Injuries").css('color', 'brown');
		}
		else if((playerCurrentHealth / playerHealth) > 0 && (playerCurrentHealth / playerHealth) < .25) {
			$("#playerCondition").text("Near Death").css('color', 'gray');
		}
		else {
			$("#playerCondition").text("Dead").css('color', 'black');
		}
		
		//set enemy health condition text for enemy based on health
		if((enemyCurrentHealth / enemyHealth) == 1) {
			$("#enemyHealthCondition").text("Uninjured").css('color', 'blue');
		}
		else if((enemyCurrentHealth / enemyHealth) >= .75 && (enemyCurrentHealth / enemyHealth) < 1) {
			$("#enemyHealthCondition").text("Lightly Injured").css('color', 'green');
			$("#enemyHealthSquare").css('background-color', 'green');
		}
		else if((enemyCurrentHealth / enemyHealth) >= .50 && (enemyCurrentHealth / enemyHealth) < .75) {
			$("#enemyHealthCondition").text("Injured").css('color', 'red');
			$("#enemyHealthSquare").css('background-color', 'red');
		}
		else if((enemyCurrentHealth / enemyHealth) >= .25 && (enemyCurrentHealth / enemyHealth) < .50) {
			$("#enemyHealthCondition").text("Heavy Injuries").css('color', 'brown');
			$("#enemyHealthSquare").css('background-color', 'brown');
		}
		else if((enemyCurrentHealth / enemyHealth) > 0 && (enemyCurrentHealth / enemyHealth) < .25) {
			$("#enemyHealthCondition").text("Near Death").css('color', 'gray');
			$("#enemyHealthSquare").css('background-color', 'gray');
		}
		else {
			$("#enemyHealthCondition").text("Dead").css('color', 'black');
			$("#enemyHealthSquare").css('background-color', 'black');
		}
		
		//set enemy stamina condition text for enemy based on stamina
		if((enemyCurrentStamina / enemyStamina) == 1) {
			$("#enemyStaminaCondition").text("Alert").css('color', 'blue');
		}
		else if((enemyCurrentStamina / enemyStamina) >= .75 && (enemyCurrentStamina / enemyStamina) < 1) {
			$("#enemyStaminaCondition").text("Somewhat Tired").css('color', 'green');
			$("#enemyStaminaCircle").css('background-color', 'green');
		}
		else if((enemyCurrentStamina / enemyStamina) >= .50 && (enemyCurrentStamina / enemyStamina) < .75) {
			$("#enemyStaminaCondition").text("Tired").css('color', 'red');
			$("#enemyStaminaCircle").css('background-color', 'red');
		}
		else if((enemyCurrentStamina / enemyStamina) >= .25 && (enemyCurrentStamina / enemyStamina) < .50) {
			$("#enemyStaminaCondition").text("Exhausted").css('color', 'brown');
			$("#enemyStaminaCircle").css('background-color', 'brown');
		}
		else if((enemyCurrentStamina / enemyStamina) > 0 && (enemyCurrentStamina / enemyStamina) < .25) {
			$("#enemyStaminaCondition").text("Nearly Spent").css('color', 'gray');
			$("#enemyStaminaCircle").css('background-color', 'gray');
		}
		else {
			$("#enemyStaminaCondition").text("Completely Exhausted").css('color', 'black');
			$("#enemyStaminaCircle").css('background-color', 'black');
		}
		
		
		if(playerCurrentHealth < 1) {
			$("#playerHealthBar").text(playerCurrentHealth);
			$("#playerHealthBar").css('width', 100 + "%");
			$("#playerHealthBar").removeClass();
			$("#playerHealthBar").addClass("bg-danger");
			$("#playerActiveEffects").text("");		
			
			
			$("#gameStatus").text("You lose!");
			$("#attackButton").hide();
			$("#skillMenu").hide();
		}	

		else if(enemyCurrentHealth < 1) {
			$("#playerHealthBar").text(playerCurrentHealth + "/" + playerHealth);
			$("#playerHealthBar").css('width', (Math.floor((playerCurrentHealth / playerHealth) * 100)) + "%");
			
			$("#enemyActiveEffects").text("");	
			$("#enemyConditionTriangle").css('color', 'green');		
			
			$("#gameStatus").text("You win!");
			
			$("#attackButton").hide();
			$("#skillMenu").hide();
		}
		else{
			$("#playerHealthBar").text(playerCurrentHealth + "/" + playerHealth);
			$("#playerHealthBar").css('width', (Math.floor((playerCurrentHealth / playerHealth) * 100)) + "%");
		}
	});
	
	//from modal go to title
	$("#toTitleButton").click(function() {
		$('#menuModal').modal('toggle');

		$("#gameIntroMenu").show();
		$("#startlogoTitle").show();
		$("#gameIntroMenu").show();
		$("#gameIntroMenu").show();
		$(".spacerBox").show();
		
		$("#gameMain").hide();
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