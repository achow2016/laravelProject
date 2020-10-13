<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
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
		<div class="content .container" id="outer">
		
			<!--game intro screen-->
			<div class="col" id="gameIntroMenu">			
				@isset($scores)
					@foreach($scores as $score)
							<div class="row" style="border:1px solid black">
								<div class="col">
									<p>Name: {{$score->name}}</p>
									<p>Kills: {{$score->kills}}</p>
									<p>Dmg Done: {{$score->damageDone}}</p>
									<p>Dmg rcvd: {{$score->damageReceived}}</p>
									<p>cleared: {{$score->chaptersCleared}}</p>														
								</div>
							</div>
						</div>	
					@endforeach
				@endisset
				<div class="row">
					<div class="btn-group d-flex w-100 fixed-bottom" role="group">
						<button id="homeButton" type="button" class="introButtons btn btn-primary active w-100">Home</button>
						<button type="button" class="introButtons scoreButton btn btn-primary active w-100">Scores</button>
					</div>					
				</div>
			</div>
		</div>

		<!--scripts-->
		<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" 
		integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" 
		crossorigin="anonymous"></script>
		<!--script src="https://code.jquery.com/jquery-3.5.1.min.js"
		integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
		crossorigin="anonymous"></script-->
		
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" 
		integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" 
		crossorigin="anonymous"></script>
		
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" 
		integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" 
		crossorigin="anonymous"></script>
		
		<script src="/js/rpgGame.js"></script>
	</body>
</html>

