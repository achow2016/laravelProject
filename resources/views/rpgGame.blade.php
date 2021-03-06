<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

	<!--
	image credit or sources
	Player Face
	https://publicdomainvectors.org/en/free-clipart/Chef-face-silhouette/86041.html
	
	Enemy Face
	https://publicdomainvectors.org/en/free-clipart/Dragon-monochrome-stencil-art/86033.html
	
	game temp image
	https://www.publicdomainpictures.net/pictures/70000/velka/red-dice-set.jpg
	
	-->

    <head>
		<title>Rpg Game</title>
        
		<meta charset="utf-8">
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1">

        <!-- Fonts -->
        <!--link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet"-->
		
		<!--styles-->
		
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" 
		integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

		<link href="{{ asset('css/all.css') }}" rel="stylesheet">
		<link href="{{ asset('css/rpgGame.css') }}" rel="stylesheet">
		
		<script src="https://js.pusher.com/7.0/pusher.min.js"></script>
		<!--javascript at bottom-->
    </head>
    <body>
		<div class="content .container" id="outer">
		
			<!--game intro screen-->
			<div class="col" id="gameIntroMenu">			
				<div class="row">
					<div class="col">
						<div id="gameTitle">
						
							<!--messages box-->
							<div class="text-center d-flex w-100 fixed-top flex-row-reverse">
								<div class="p-2">
									<button id="openMessages" type="button" class="introButtons btn btn-primary active w-100">Messages &#9993</button>
								</div>
							</div>
							<!--messages modal-->
							<div class="modal fade" id="messageModal" role="dialog">
								<div class="modal-dialog">
									<!--Modal content-->
									<div class="modal-content">
										<div class="modal-header">
											Messages Center
											<button type="button" class="close" data-dismiss="modal">&times;</button>
										</div>
										<div class="modal-body">
											<form action="javascript:void(0);">
												Send Message
												<input type="text" name="msgUserName" id="msgUserName" placeholder="Enter Target User">
												<input type="text" name="msgUserMessage" id="msgUserMessage" placeholder="Enter Message">
												<br>
												<button id="sendMessage" type="button" class="btn btn-primary primary mt-1">Send</button>
												<br>
											</form>
											<form action="javascript:void(0);">
												Load quantity
												<br>
												"all" or a numeric value
												<br>
												<input type="text" name="userMessageQty" id="userMessageQty" placeholder="Amount" value="all">
												<br>
												Load by sender(s) 
												<br>
												"all" or space-seperated names
												<br>
												<input type="text" name="userMessageSender" id="userMessageSender" placeholder="Amount" value="all">
												<button id="loadMessages" type="button" class="btn btn-primary primary mb-2">Load</button>
											</form>	
											<br>
											
											<div class="alert alert-info">
												<input type="password" name="password" id="messagePassword" placeholder="Confirm Password">
											</div>
											
											<div id="messageText"></div>
										</div>
										<div class="modal-footer centered-button">
											<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
										</div>
									</div>	
								</div>	
							</div>
							
						
							<img class="mx-auto d-block mt-2" src="/img/gameTitleTempImage.jpg" width="120px" height="120px" alt="Game Title Art"/>
							<h1>My Game</h1>
							<!--Flashed message from AJAX middleware if direct url access-->
							{{session('message')}}
							<p>Membership: <?php echo $membership ?? ''; ?></p>
							<p><?php echo $endDate ?? ''; ?></p>
							@if( auth()->check() )
							<p id="authName">User: {{ auth()->user()->name }}</p>
							<div id="mainUserOptions">
								<a class="nav-link" href="/rpgGame/userManagement">Account</a>
								<a class="nav-link" href="/rpgGame/userCashStore">Store</a>
								<a class="nav-link" href="/rpgGame/textBoard">Textboard</a>
								<a class="nav-link" href="/rpgGame/logout">Logout</a>
							</div>
							<div id="backupAuthForm" class="mb-3" style="display:none">
								<input type="text" name="restoreEmail" id="restoreEmail" placeholder="confirm email">
								<br>
								<input type="text" name="restorePass" id="restorePass" placeholder="confirm password">
								<br><br>
								<button disabled id="closeRestore" type="button" class="introButtons btn btn-primary active w-100">Close</button>
							</div>
							<?php echo $data ?? ''; ?></p> <!--backup load button only available if save data available-->
							<!--button disabled id="restoreButton" type="button" class="introButtons btn btn-primary active w-100">Load Backup Data</button-->
							@endif
						</div>
					</div>
				</div>
				<div class="row">
					<div class="btn-group d-flex w-100 fixed-bottom" role="group">
						<button id="startButton" type="button" class="introButtons btn btn-primary active w-100">New Game</button>
						<button id="continueButton" type="button" class="introButtons btn btn-primary active w-100">Continue</button>
						<button type="button" class="listScoresButton introButtons btn btn-primary active w-100">Scores</button>
					</div>					
				</div>
			</div>
			
			<!-- 
			Nav pills game tabs
				hidden before game start
				only visible during game
			-->
			<div class="row" id="gameTopTab" style="display:none">
				<div class="col">
					<ul class="nav nav-pills nav-justified" role="tablist" id="gamePanelTop">
						<li class="nav-item">
							<a class="nav-link active" data-toggle="pill" href="#homePanel">Home</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" data-toggle="pill" href="#playerPanel">Player</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" data-toggle="pill" href="#scorePanel">Score</a>
						</li>					
						<li>
							<button id="battleGameMenu" type="button" class="btn btn-dark active w-100" data-toggle="modal" data-target="#battleMenuModal">Menu</button>
						</li>
					</ul>
				</div>
			</div>

			<!--configuration screen for character
				allocation of points 12
					strength training atk
					endurance training sp
					lifestyle hp
			-->
			<div id="playerConfigMenu" style="display:none">
				<div class="col">
					<div class="row">
						<div class="col">
							<br>
							<p id="configMessageArea">
								Assign 12 points, +5% bonus per point
							</p>
						</div>					
					</div>
				
					<div class="row">
						<div class="col">
							<div class="row"><p>Strength</p></div><br>
							<div class="row"><p>Endurance</p></div><br>
							<div class="row"><p>Life</p></div><br>
						</div>
						<div class="col">
							<div class="row justify-content-center">
								<button id="decreaseStrengthAlloc" type="button" class="btn btn-danger" >-</button>
							</div><br>
							<div class="row justify-content-center">
								<button id="decreaseEnduranceAlloc" type="button" class="btn btn-danger" >-</button>
							</div><br>
							<div class="row justify-content-center">
								<button id="decreaseLifeAlloc" type="button" class="btn btn-danger" >-</button>
							</div><br>							
						</div>
						<div class="col">
							<div class="row justify-content-center">
								<p id="strengthAlloc">0</p>
							</div><br>
							<div class="row justify-content-center">
								<p id="enduranceAlloc">0</p>
							</div><br>
							<div class="row justify-content-center">
								<p id="lifeAlloc">0</p>
							</div><br>					
						</div>
						<div class="col">
							<div class="row justify-content-center">
								<button id="increaseStrengthAlloc"  type="button" class="btn btn-success" >+</button>
							</div><br>
							<div class="row justify-content-center">
								<button id="increaseEnduranceAlloc" type="button" class="btn btn-success" >+</button>
							</div><br>
							<div class="row justify-content-center">
								<button id="increaseLifeAlloc" type="button" class="btn btn-success" >+</button>
							</div><br>							
						</div>
					</div>
					
					<div class="row">
						<div class="col">
							<input type="text" class="form-control" id="name" placeholder="name">
						</div>	
					</div>

					<br>
					
					<div class="row">
						<div class="col">
							<select class="form-control" name="gameClass" id="gameClass">
								<option>warrior</option>
							</select>
						</div>	
					</div>
					
					<br>
					
					<div class="row">
						<div class="col">
							<label for="race">Choose a race:</label>
							<select name="race" id="race">
								<option value="human">human</option>
								<option value="android">android</option>
							</select>	
						</div>	
					</div>
					
					<div class="row">
						<div class="col">
							<p id="characterChoice"></p> 
							<p id="raceStats"></p>
						</div>	
					</div>			
					
					<div class="row">
						<div class="col">
							<div class="centered-button">
								<button id="completeConfig" type="button" class="btn btn-primary active">Create</button>
							</div>
						</div>	
					</div>	
				</div>
			</div>				


			<!--story page-->
			<div id="storyMain" style="display:none">
			
				<div class="row" id="storyImage">
					<div class="col" id="activeStoryBackground"></div>	
				</div>	
				<div class="row" id="storyTextContent">
					<div class="col">
						<p id="storyText"></p>
					</div>	
				</div>	
				
				<div class="row storyMenu">
					<div class="col">
						<div id="ctrlButtonContainer" class="btn-group w-100 fixed-bottom" role="group">
							<button id="storyProgress" type="button" class="btn btn-primary active w-100">Next</button>
							<button style="display:none" id="storyEnd" type="button" class="btn btn-primary active w-100"></button>
							<button type="button" class="saveGame btn btn-primary active w-100">QSave</button>
							<button id="storySaveQuit" type="button" class="btn btn-primary active w-100">Save and Quit</button>
						</div>
						<p class="saveMessage"></p>
						<div id="storySaveQuitMenu" style="display:none" class="btn-group w-100 fixed-bottom">
							<form action="javascript:void(0);">
								<input type="password" class="archivePassCheckStory w-100 text-center" name="archivePassCheck" placeholder="Confirm Password">
								<button type="button" class="saveQuit btn btn-primary active w-100">Confirm</button>
								<button id="storySaveClose" class="btn btn-primary active w-100">Close</button>
							</form>
						</div>
					</div>	
					
					
					</div>	
				</div>						
			</div>
			
			<!--world map page and navigation-->
			<div id="mapMain" style="display:none" class="container-fluid">
				<div class="row">
					<div class="btn-group d-flex w-100" role="group">
						<button type="button" class="saveGame btn btn-primary active w-100">QSave</button>
						<button type="button" id="mapScore" class="btn btn-primary active w-100">Score</button>
						<button type="button" class="operationMenu btn btn-primary active w-100" data-toggle="modal" data-target="#mapMenuModal">Menu</button>
					</div>	
				</div>
				<div class="row">
					<div class="col">
						<div class="row map" id="mapRow8">
						</div>	
						<div class="row map" id="mapRow7">
						</div>	
						<div class="row map" id="mapRow6">
						</div>	
						<div class="row map" id="mapRow5">
						</div>	
						<div class="row map" id="mapRow4">
						</div>	
						<div class="row map" id="mapRow3">
						</div>	
						<div class="row map" id="mapRow2">
						</div>	
						<div class="row map" id="mapRow1">
						</div>	
					</div>	
				</div>				
				<div class="row mapMenu">
					<div class="col">
						<div class="btn-group d-flex w-100 mt-1" role="group">
							<button disabled id="mapExit" type="button" class="mapControl btn btn-primary active w-100 mr-1">Exit</button>
							<button disabled id="mapShop" type="button" class="mapControl btn btn-primary active w-100 mr-1">Shop</button>
							<button disabled id="mapFight" type="button" class="mapControl btn btn-primary active w-100 mr-1">Fight</button>
							<button id="mapExamine" type="button" class="mapControl btn btn-primary active w-100 ml-1 mr-1">Examine</button>
							<button id="mapItem" type="button" class="mapControl btn btn-primary active w-100 ml-1 mr-1">Item</button>
							<button id="mapEquip" type="button" class="mapControl btn btn-primary active w-100 ml-1">Equip</button>
						</div>	
						
						<div class="d-flex w-100 mt-1">
							<p id="mapStatus"></p>
						</div>
					
						<div id="mapCtrlButtonContainer" class="btn-group d-flex w-100 fixed-bottom" role="group">
							<button id="mapLeft" type="button" class="mapDirControl btn btn-primary active w-100">Left</button>	
							<button id="mapUp" type="button" class="mapDirControl btn btn-primary active w-100">Up</button>
							<button id="mapDown" type="button" class="mapDirControl btn btn-primary active w-100">Down</button>
							<button id="mapRight" type="button" class="mapDirControl btn btn-primary active w-100">Right</button>
						</div>	
					</div>	
				</div>	
				
				<!--game operation modal-->
				<!--Modal-->
				<div class="modal fade" id="mapMenuModal" role="dialog">
					<div class="modal-dialog">

				<!--Modal content-->
						<div class="modal-content">
							<div class="modal-header">
								<div class="row w-100">
									<p class="col-11 saveMessage"></p>
									<button type="button" class="col-1 close" data-dismiss="modal">&times;</button>
								</div>
							</div>
							<div class="modal-body">
								<div class="gameOpMenu" role="group">
									<button type="button" class="menuSaveQuit btn btn-primary active w-100 mb-2">Save and Quit</button>
									<button type="button" class="returnButton btn btn-primary active w-100">Quit</button>
								</div>
								<div style="display:none" class="modalSaveQuitMenu btn-group w-100">
									<form action="javascript:void(0);">
										<input type="password" class="archivePassCheckMap w-100 text-center mb-2" name="archivePassCheck" placeholder="Confirm Password">
										<button type="button" class="saveQuit btn btn-primary active w-100 mb-2">Confirm</button>
										<button class="modalSaveClose btn btn-primary active w-100 mb-2">Close</button>
									</form>
								</div>								
							</div>
							<div class="modal-footer centered-button">
								<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
							</div>
						</div>	
					</div>	
				</div>
				
				<!--item modal-->
					
				<!-- Modal -->
				<div class="modal fade" id="mapItemModal" role="dialog">
					<div class="modal-dialog">

				<!-- Modal content-->
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal">&times;</button>
							</div>
							<div class="modal-body">
								<div class="itemButtonArray btn-group-vertical centered-button"></div>
							</div>
							<div class="modal-footer centered-button">
								<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
							</div>
						</div>	
					</div>	
				</div>

				<!--shop map items modal-->
					
				<!-- Modal -->
				<div class="modal fade" id="mapShopModal" role="dialog">
					<div class="modal-dialog">

				<!-- Modal content-->
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal">&times;</button>
							</div>
							<div class="modal-body">
								<div id="shopMainMenu">
									<p class="mapShopMoney"></p>
									<p class="mapPlayerMoney"></p>
									<button id="shopBuy" class="btn btn-primary active w-100 mb-1">Buy</button>
									<button id="shopSell" class="btn btn-primary active w-100">Sell</button>
								</div>
								<div id="shopBuyMenu" style="display:none">
									<p>Buy</p>
									<p class="mapShopMoney"></p>
									<p class="mapPlayerMoney"></p>
									<div id="shopSellInventory" class="btn-group-vertical centered-button"></div>
									<button class="shopMain btn btn-primary active w-100 mb-1">Back</button>
								</div>
								<div id="shopSellMenu" style="display:none">
									<p>Sell</p>
									<p class="mapShopMoney"></p>
									<p class="mapPlayerMoney"></p>
									<div id="playerShopSellList" class="btn-group-vertical centered-button"></div>
									<button class="shopMain btn btn-primary active w-100 mb-1">Back</button>
								</div>
							</div>
							<div class="modal-footer centered-button">
								<p id="buyMessage"></p>
								<p id="sellMessage"></p>
								<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
							</div>
						</div>	
					</div>	
				</div>

				
				<!--map score modal-->
					
				<!-- Modal -->
				<div class="modal fade" id="mapScoreModal" role="dialog">
					<div class="modal-dialog">

				<!-- Modal content-->
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal">&times;</button>
							</div>
							<div class="modal-body">
								<p class="playerName" data-toggle="tooltip" title=""></p>
								<p class="playerScore" data-toggle="tooltip" title=""></p>
								<p class="playerKills" data-toggle="tooltip" title=""></p>
								<p class="playerDamageDone" data-toggle="tooltip" title=""></p>
								<p class="playerDamageReceived" data-toggle="tooltip" title=""></p>
								<p class="playerChaptersCleared" data-toggle="tooltip" title=""></p>
								<p class="playerEarnings" data-toggle="tooltip" title=""></p>
								
								
								<!--p class="playerHealth" data-toggle="tooltip" title=""></p>
								<p class="playerArmourName" data-toggle="tooltip" title=""></p>
								<p class="playerArmour" data-toggle="tooltip" title=""></p>
								<p class="playerAttackWeapon" data-toggle="tooltip" title=""></p>
								<p class="playerAttack" data-toggle="tooltip" title=""></p>	
								<p class="playerAgility" data-toggle="tooltip" title=""></p-->
							</div>
							<div class="modal-footer centered-button">
								<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
							</div>
						</div>	
					</div>	
				</div>

				<!--examine modal-->
					
				<!-- Modal -->
				<div class="modal fade" id="mapExamineModal" role="dialog">
					<div class="modal-dialog">

				<!-- Modal content-->
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal">&times;</button>
							</div>
							<div class="modal-body">
								<div id="examineControl">
									<button id="examSelf" class="btn btn-primary active w-100 mb-1">Self</button>
									<button id="examOther" class="btn btn-primary active w-100 mb-1">Other</button>
									<button id="examSpace" class="btn btn-primary active w-100 mb-1">Space</button>
								</div>
								<div style="display:none" id="examineSelfData">
									<p class="playerName" data-toggle="tooltip" title=""></p>
									<p data-toggle="tooltip" title="">Status:</p>
									<div class="row text-center" id="playerMapConditions">
									</div>
									<p class="playerHealth" data-toggle="tooltip" title=""></p>
									<p class="playerMoney" data-toggle="tooltip" title=""></p>
									<p class="playerArmourName" data-toggle="tooltip" title=""></p>
									<p class="playerArmour" data-toggle="tooltip" title=""></p>
									<p class="playerAttackWeapon" data-toggle="tooltip" title=""></p>
									<p class="playerAttack" data-toggle="tooltip" title=""></p>	
									<p class="playerAgility" data-toggle="tooltip" title=""></p>	
								</div>
								<div style="display:none" id="examineOtherData">
									<p id="otherName" data-toggle="tooltip" title=""></p>
									<p id="otherArmourName" data-toggle="tooltip" title=""></p>
									<p id="otherAttackWeapon" data-toggle="tooltip" title=""></p>
									<p id="otherAttackWeapon" data-toggle="tooltip" title=""></p>
								</div>		
								<div style="display:none" id="examineSpaceData">
									<p id="spaceTerrain" data-toggle="tooltip" title=""></p>
								</div>									
							</div>
							<div class="modal-footer centered-button">
								<button style="display:none" id="examMain" class="btn btn-primary active w-100 mb-1">Back</button>
								<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
							</div>
						</div>	
					</div>	
				</div>
			</div>

			<!--equipment modal-->
					
			<!-- Modal -->
			<div class="modal fade" id="equipModal" role="dialog">
				<div class="modal-dialog">

			<!-- Modal content-->
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal">&times;</button>
						</div>
						<div class="modal-body">
							<div id="equipButtonArray" class="btn-group-vertical centered-button"></div>
						</div>
						<div class="modal-footer centered-button">
							<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
						</div>
					</div>	
				</div>	
			</div>

						
			
			<!--battle main page-->
			<div id="battleMain" style="display:none">
			
					<!-- Tab panes -->
					<div class="tab-content">
					
						<div id="homePanel" class="container tab-pane active"><br>	
							<div id="gamePanel" class="panel panel-default">
								<div class="container col">

									<!--
									"terrain box"
									attack animations and background here
									-->
									
									<div class="row terrainBox">
										<div class="col">
											<img id="activePlayer" src="data:," alt="Player Image" class="playerImage" height="80px" width="80px">
											<div id="playerConditionTriangle"></div>
										</div>
										
										<div class="col">
											<img id="activeEnemy" src="data:," alt="Enemy Image" height="80px" width="80px">		
											<div id="enemyHealthSquare"></div>
											<div id="enemyConditionTriangle"></div>
											<div id="enemyStaminaCircle"></div>
										</div>
									</div>

									<!--
									grid of position on field
									1 x 8
									movement distance can be changed with skill
									option to just move instead of attack
									predefined colour on grid of position
									-->
									
									<div class="row" id="characterGrid">
										<div id="playerGridColumn3" class="col characterPosition">
										</div>
										<div id="playerGridColumn2" class="col characterPosition">
										</div>
										<div id="playerGridColumn1" class="col characterPosition">
										</div>
										<div id="playerGridColumn0" class="col characterPosition">
										</div>
										<div id="enemyGridColumn0" class="col characterPosition">
										</div>
										<div id="enemyGridColumn1" class="col characterPosition">
										</div>
										<div id="enemyGridColumn2" class="col characterPosition">
										</div>
										<div id="enemyGridColumn3" class="col characterPosition">
										</div>
									</div>
									
								
								<!--player body grid-->
								
								<br>	
									<div class="row">
										<div class="col">
											<p id="playerDamagedAmount">---</p>
										</div>	
										<div class="col">
											<p id="enemyDamagedAmount">---</p>
										</div>											
									</div>
									
									<!--body grids-->
									<div class="row">
									
									<!--player-->
										<div class="col actorGridContainer">
											<div class="row">
												<div class="col-1">
													<div class="playerBodyGrid p1" id="pUpperLeft"></div>
												</div>
												<div class="col-1">
													<div class="playerBodyGrid p2" id="pHead"></div>
												</div>
												<div class="col-1">
													<div class="playerBodyGrid p3" id="pUpperRight"></div>
												</div>
											</div>	
											<div class="row">
												<div class="col-1">
													<div class="playerBodyGrid p4" id="pLeftHand">L</div>
												</div>
												<div class="col-1">
													<div class="playerBodyGrid p5" id="pTorso"></div>
												</div>
												<div class="col-1">
													<div class="playerBodyGrid p6" id="pRightHand">R</div>
												</div>
											</div>
											<div class="row">
												<div class="col-1">
													<div class="playerBodyGrid p7" id="pLeftLeg"></div>
												</div>
												<div class="col-1">
													<div class="playerBodyGrid p8" id="pGroin"></div>
												</div>
												<div class="col-1">
													<div class="playerBodyGrid p9" id="pRightLeg"></div>
												</div>
											</div>	
										</div>
										
										<!--enemy body grid-->	
										<div class="col actorGridContainer">
											<div class="row">
												<div class="col-1">
													<div class="playerBodyGrid e1" id="eUpperLeft"></div>
												</div>
												<div class="col-1">
													<div class="playerBodyGrid e2" id="eHead"></div>
												</div>
												<div class="col-1">
													<div class="playerBodyGrid e3" id="eUpperRight"></div>
												</div>
											</div>
											<div class="row">
												<div class="col-1">
													<div class="playerBodyGrid e4" id="eLeftHand">L</div>
												</div>
												<div class="col-1">
													<div class="playerBodyGrid e5" id="eTorso"></div>
												</div>
												<div class="col-1">
													<div class="playerBodyGrid e6" id="eRightHand">R</div>
												</div>
											</div>
											<div class="row">
												<div class="col-1">
													<div class="playerBodyGrid e7" id="eLeftLeg"></div>
												</div>
												<div class="col-1">
													<div class="playerBodyGrid e8" id="eGroin"></div>
												</div>
												<div class="col-1">
													<div class="playerBodyGrid e9" id="eRightLeg"></div>
												</div>
											</div>
										</div>
									</div>				
									<!--player control row-->
										
									<div class="row" id="gameControlRow">	
										<!--divides in two, adds status effect and skill-->
										<div class="col" id="playerMainDashboard">
											<div class="row">
												<div class="col">
													<p id="playerStatus" data-toggle="tooltip" title=""></p>
													
													
													
											<div class="d-flex w-100" role="group">
												<p class="w-100 mr-1" id="playerGameStatus" data-toggle="tooltip" title="">---</p>
												<p class="w-100 mr-1" id="enemyGameStatus" data-toggle="tooltip" title="">---</p>
											</div>	
													
													
													<!--p id="gameStatus" data-toggle="tooltip" title="">---</p-->
												</div>
												
											</div>
											<div class="row">
												<div class="col">
													<div class="progress">
														<div id="playerHealthSquare">HP</div>
														<div id="playerHealthBar" class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" 
														aria-valuemax="100" style="width:100%">
														</div>
													</div>
													
													<br>
													<div class="progress">
														<div id="playerStaminaCircle">SP</div>	
														<div id="playerStaminaBar" class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" 
														aria-valuemax="100" style="width:100%">
														</div>
													</div>
												</div>
											</div>
										</div>
										
										<!--player commands center-->
										<div class="col-sm-4" id="playerCommandCenter">
											<div class="btn-group d-flex w-100" id="gameCommandMenu" role="group">
												<button id="attackButton" type="button" class="btn btn-primary active w-100 mr-1">Attack</button>
												<button id="defendButton" type="button" class="btn btn-primary active w-100 mr-1">Defend</button>
												<button id="itemButton" type="button" class="btn btn-primary active w-100 mr-1">Item</button>
												<button style="display:none" id="nextTurnButton" type="button" class="btn btn-primary active w-100 mr-1">Next</button>
												<button id="skillMenu" type="button" class="btn btn-primary active w-100" data-toggle="modal" data-target="#skillModal">Skill</button>
												<button style="display:none" id="nextChapterButton" type="button" class="btn btn-primary active w-100 mr-1">Next Chapter</button>
												<button style="display:none" id="battleReturnMap" type="button" class="btn btn-primary active w-100 mr-1">Map</button>
											</div>	
										</div>
									</div>
								</div>
							</div>
						</div>
				
				<!--enemy detail modal-->
				
				<!-- Modal -->
				<div class="modal fade" id="enemyModal" role="dialog">
					<div class="modal-dialog">
					
				<!-- Modal content-->
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal">&times;</button>
							</div>
							<div class="modal-body">
								<div class="col">
									<div class="row">
										<p>Health:</p>&nbsp;
										<p id="enemyHealthCondition" data-toggle="tooltip" title=""></p>
									</div>
									<div class="row">
										<p>Stamina:</p>&nbsp;
										<p id="enemyStaminaCondition" data-toggle="tooltip" title=""></p>
									</div>
									<div class="row">
										<p>Last Skill:</p>&nbsp;
										<p id="enemySkill"  data-toggle="tooltip" title=""></p>
									</div>
									<div class="row">
										<p>Effects:</p>&nbsp;
										<div id="enemyActiveEffects"></div>
									</div>
								</div>		
							</div>
							<div class="modal-footer centered-button">
								<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
							</div>
						</div>	
					</div>	
				</div>
				
				
				<!--player click modal-->
				<div class="modal fade" id="playerModal" role="dialog">
					<div class="modal-dialog">
				<!-- Modal content-->
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal">&times;</button>
							</div>
							<div class="modal-body">
								<div class="col">
									<div class="row">
										<p>Condition:</p>&nbsp;
										<p id="playerCondition" data-toggle="tooltip" title=""></p>
									</div>
									<div class="row">
										<p>Effects:</p>&nbsp;
										<div id="playerActiveEffects"></div>
									</div>
								</div>	
							</div>	
							<div class="modal-footer centered-button">
								<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
							</div>
						</div>	
					</div>	
				</div>
				
				<!--game operation modal-->
				<!--Modal-->
				<div class="modal fade" id="battleMenuModal" role="dialog">
					<div class="modal-dialog">

				<!--Modal content-->
						<div class="modal-content">
							<div class="modal-header">
								<div class="row w-100">
									<p class="col-11 saveMessage"></p>
									<button type="button" class="col-1 close" data-dismiss="modal">&times;</button>
								</div>
							</div>
							<div class="modal-body">
								<div class="gameOpMenu" role="group">
									<button type="button" class="saveGame btn btn-primary active w-100 mb-2">QSave</button>
									<button type="button" class="menuSaveQuit btn btn-primary active w-100 mb-2">Save and Quit</button>
									<button type="button" class="returnButton btn btn-primary active w-100">Quit</button>
								</div>
								<div style="display:none" class="modalSaveQuitMenu btn-group w-100">
									<form action="javascript:void(0);">
										<input type="password" class="archivePassCheckBattle w-100 text-center mb-2" name="archivePassCheck" placeholder="Confirm Password">
										<button type="button" class="saveQuit btn btn-primary active w-100 mb-2">Confirm</button>
										<button class="modalSaveClose btn btn-primary active w-100 mb-2">Close</button>
									</form>
								</div>
								
							</div>
							<div class="modal-footer centered-button">
								<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
							</div>
						</div>	
					</div>	
				</div>
				
				<!--skill operation modal-->
					
				<!-- Modal -->
				<div class="modal fade" id="skillModal" role="dialog">
					<div class="modal-dialog">

				<!-- Modal content-->
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal">&times;</button>
							</div>
							<div class="modal-body">
								<div id="skillButtonArray" class="btn-group-vertical centered-button">
								</div>
							</div>
							<div class="modal-footer centered-button">
								<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
							</div>
						</div>	
					</div>	
				</div>
				
				<!--battle item modal-->
					
				<!-- Modal -->
				<div class="modal fade" id="itemModal" role="dialog">
					<div class="modal-dialog">

				<!-- Modal content-->
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal">&times;</button>
							</div>
							<div class="modal-body">
								<div class="itemButtonArray btn-group-vertical centered-button">
								</div>
							</div>
							<div class="modal-footer centered-button">
								<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
							</div>
						</div>	
					</div>	
				</div>
			</div>
		</div>
		
		<!--scripts
		<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" 
		integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" 
		crossorigin="anonymous"></script>
		-->
		<script src="https://code.jquery.com/jquery-3.5.1.js"
		integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc="
		crossorigin="anonymous"></script>
				
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" 
		integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" 
		crossorigin="anonymous"></script>
		
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" 
		integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" 
		crossorigin="anonymous"></script>
		
		<script src="/js/rpgGame.js"></script>
		<script src="/js/rpgGamePusher.js"></script>
		
	
    </body>
</html>
