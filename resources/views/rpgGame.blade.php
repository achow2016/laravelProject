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
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
		
		<!--styles-->
		
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" 
		integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

		<link href="{{ asset('css/all.css') }}" rel="stylesheet">
		<link href="{{ asset('css/rpgGame.css') }}" rel="stylesheet">
		<!--javascript at bottom-->
		
    </head>
    <body>
		<div class="content .container">
			<!--
			game title top div
				image
				title
				hidden on game start
			-->
			<div class="row spacerBox">
				<div class="col">

				</div>
			</div>
			
			<div class="row" id="startlogoTitle">
				<div class="col">
					<div id="gameTitle">
						<img src="/img/gameTitleTempImage.jpg" width="150px" height="150px" alt="Game Title Art"/>
						<h1>My Game</h1>
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
					</ul>
				</div>
			</div>
			
			
			<!--
				start panel
					name
					class
					start game
			-->
			<div class="row" id="gameIntroMenu">
				<div class="col">

					<!--name-->
					<div class="form-group">
					<label for="name">Name:</label>
					<input type="text" class="form-control" id="name">
					</div>

					<!--starting classes-->
					<div class="form-group">
						<label for="gameClass">Select a class</label>
						<select class="form-control" id="gameClass">
							<option>Warrior</option>
						</select>
					</div>
					
					<!--button to start with values in select-->
					<div id="startScreenButtons" class="centered-button">
						<button id="startButton" type="button" class="btn btn-primary active">New Game</button>
					</div>
					
					<div class="centered-button">
						<button type="button" class="returnButton btn btn-primary active">Return to Website</button>
					</div>
					
				</div>
			</div>		

			<!--div class="row" id="gameMain" style="display:none"-->
			<div id="gameMain" style="display:none">
			
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
										</div>
										
										<div class="col">
											<img id="activeEnemy" src="data:," alt="Enemy Image" height="80px" width="80px">		
											<div id="enemyHealthSquare"></div>
											<br>
											<div id="enemyConditionTriangle"></div>
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
										<div id="characterGridColumn1" class="col characterPosition">
											qa
										</div>
										<div id="characterGridColumn2" class="col characterPosition">
										</div>
										<div id="characterGridColumn3" class="col characterPosition">
										</div>
										<div id="characterGridColumn4" class="col characterPosition">
										</div>
										<div id="characterGridColumn5" class="col characterPosition">
										</div>
										<div id="characterGridColumn6" class="col characterPosition">
										</div>
										<div id="characterGridColumn7" class="col characterPosition">
										</div>
										<div id="characterGridColumn8" class="col characterPosition">
										</div>
									</div>
									
								
								<!--player body grid-->
								
								<br>	
									<div class="row">
										<p>Stance:</p>
									</div>	
									<div class="row">
										<div class="col-1">
											<div class="playerBodyGrid" id="pUpperLeft"></div>
										</div>
										<div class="col-1">
											<div class="playerBodyGrid" id="pHead"></div>
										</div>
										<div class="col-1">
											<div class="playerBodyGrid" id="pUpperRight"></div>
										</div>
									</div>
									
									<div class="row">
										<div class="col-1">
											<div class="playerBodyGrid" id="pLeftHand"></div>
										</div>
										<div class="col-1">
											<div class="playerBodyGrid" id="pTorso"></div>
										</div>
										<div class="col-1">
											<div class="playerBodyGrid" id="pRightHand"></div>
										</div>
									</div>
									
									<div class="row">
										<div class="col-1">
											<div class="playerBodyGrid" id="pLeftLeg"></div>
										</div>
										<div class="col-1">
											<div class="playerBodyGrid" id="pGroin"></div>
										</div>
										<div class="col-1">
											<div class="playerBodyGrid" id="pRightLeg"></div>
										</div>
									</div>	
									
									<!--player control row-->
										
									<div class="row">	
										<!--divides in two, adds status effect and skill-->
										<div class="col" id="playerMainDashboard">
											<div class="row">
												<div class="col">
													<p id="playerStatus" data-toggle="tooltip" title=""></p>
													<p id="playerSkill">---</p>
													<p id="gameStatus" data-toggle="tooltip" title="" style="display:none"></p>
												</div>
												
											</div>
											<div class="row">
												<div class="col">
													<div class="progress">
														<div id="playerHealthBar" class="progress-bar bg-success" role="progressbar" aria-valuenow="100" aria-valuemin="0" 
														aria-valuemax="100" style="width:100%">
														</div>
													</div>
													<br>
													<div class="progress">
														<div id="playerStaminaBar" class="progress-bar bg-success" role="progressbar" aria-valuenow="100" aria-valuemin="0" 
														aria-valuemax="100" style="width:100%">
														</div>													
													</div>
												</div>
											</div>
										</div>
										
										<!--player commands center-->
										<div class="col-sm-4" id="playerCommandCenter">
											<div class="row">
												<div class="col">
													<div class="centered-button">
														<button id="attackButton" type="button" class="btn btn-primary active">Attack!</button>
													</div>
												</div>
												<div class="col">
													<div class="centered-button">
														<button id="skillMenu" type="button" class="btn btn-primary active" data-toggle="modal" data-target="#skillModal">Skill</button>
													</div>
												</div>
												<div class="col">
													<div class="centered-button">
														<button id="operationMenu" type="button" class="btn btn-primary active" data-toggle="modal" data-target="#menuModal">Menu</button>
													</div>
												</div>
											</div>
										</div>
										
										
										
										
									</div>
								</div>
							</div>
						</div>
				
				<!--enemy condition modal-->
				
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
										<p>Condition:</p>&nbsp;
										<p id="enemyCondition" data-toggle="tooltip" title=""></p>
									</div>
									<div class="row">
										<p>Last Skill:</p>&nbsp;
										<p id="enemySkill"  data-toggle="tooltip" title=""></p>
									</div>
									<div class="row">
										<p>Effects:</p>&nbsp;
										<p id="enemyActiveEffects"></p>
									</div>
									<!--
									show body grid of opponent
										attack damage is based on coords targeted and armor 
										at location
										skills change armor ratings
									-->
									<div class="row">
										<p>Stance:</p>
									</div>	
									<div class="row">
										<div class="col">
											<div class="enemyBodyGrid" id="eUpperLeft" style="height:20px;width:20px;background-color: green;"></div>
										</div>
										<div class="col">
											<div class="enemyBodyGrid" id="eHead" style="height:20px;width:20px;background-color: blue;"></div>
										</div>
										<div class="col">
											<div class="enemyBodyGrid" id="eUpperRight" style="height:20px;width:20px;background-color: blue;"></div>
										</div>
									</div>
									<br>
									<div class="row">
										<div class="col">
											<div class="enemyBodyGrid" id="eLeftHand" style="height:20px;width:20px;background-color: blue;"></div>
										</div>
										<div class="col">
											<div class="enemyBodyGrid" id="eTorso" style="height:20px;width:20px;background-color: blue;"></div>
										</div>
										<div class="col">
											<div class="enemyBodyGrid" id="eRightHand" style="height:20px;width:20px;background-color: blue;"></div>
										</div>
									</div>
									<br>
									<div class="row">
										<div class="col">
											<div class="enemyBodyGrid" id="eLeftLeg" style="height:20px;width:20px;background-color: blue;"></div>
										</div>
										<div class="col">
											<div class="enemyBodyGrid" id="eGroin" style="height:20px;width:20px;background-color: blue;"></div>
										</div>
										<div class="col">
											<div class="enemyBodyGrid" id="eRightLeg" style="height:20px;width:20px;background-color: blue;"></div>
										</div>
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
										<p id="playerActiveEffects"></p>
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
					
				<!-- Modal -->
				<div class="modal fade" id="menuModal" role="dialog">
					<div class="modal-dialog">

				<!-- Modal content-->
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal">&times;</button>
							</div>
							<div class="modal-body">
								<div class="centered-button">
									<button id="toTitleButton" type="button" class="btn btn-primary active">To Title</button>
								</div>
								<div class="centered-button">
									<button type="button" class="returnButton btn btn-primary active">Return to Website</button>
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
				
				<!--
					status tab
					
					equipment
					stats
				-->
				
				<div id="playerPanel" class="container tab-pane fade">
					<img src="data:," alt="Player Image" class="playerImage" height="80px" width="80px">
					<p>Name:</p> 
					<p id="playerName" data-toggle="tooltip" title=""></p>
					<p>Health:</p> 
					<p id="playerHealthMaximum" data-toggle="tooltip" title=""></p>
					<p>Armour:</p>
					<p id="playerArmourName" data-toggle="tooltip" title=""></p>
					<p id="playerArmour" data-toggle="tooltip" title=""></p>
					<p>Attack:</p>
					<p id="playerAttackWeapon" data-toggle="tooltip" title=""></p>
					<p id="playerAttack" data-toggle="tooltip" title=""></p>	
				</div>
				
				<!--
					score tab
					
					statistics
					score
				-->
				
				<div id="scorePanel" class="container tab-pane fade"><br>
					<h3>Menu 2</h3>
					<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
				</div>
				
						
					</div>

				
				
			</div>
		</div>
		
		<!--scripts-->
		<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" 
		integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" 
		crossorigin="anonymous"></script>
		
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" 
		integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" 
		crossorigin="anonymous"></script>
		
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" 
		integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" 
		crossorigin="anonymous"></script>
		
		<script src="/js/rpgGame.js"></script>
		
	
    </body>
</html>
