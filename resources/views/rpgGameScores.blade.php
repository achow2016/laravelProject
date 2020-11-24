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
		<div>
			@isset($errorMessage)
			<p>{{$errorMessage}}</p>
			@endisset
			@isset($message)
			<p>{{$message}}</p>
			@endisset
			
			@isset($scores)
			<table class="table">
				<tr>
					<th width="33%">Name</th>
					<th width="33%">Score</th>	
					<th width="33%">Detail</th>	
				</tr>			
				@foreach($scores as $score)
				<tr>
					<td>{{$score->name}}</td>
					<td>{{$score->scoreTotal}}</td>	
					<td><a href="{{ URL::to('rpgGame/scores/detail/?name=' . $score->name) }}">View</a></td>
					<!--watch or friend this person-->
					<td><a href="{{ URL::to('rpgGame/scores/addFriend/?name=' . $score->name) }}">+&#128065</a></td>
				</tr>
				@endforeach
			</table>
			@endisset


			@isset($friends)
			<table class="table">
				<tr>
					<th width="33%">Name</th>
					<th width="33%">Score</th>	
					<th width="33%">Detail</th>	
				</tr>			
				@foreach($friends as $friend)
				<tr>
					<td>{{$friend->name}}</td>
					<td>{{$friend->score}}</td>	
					<td><a href="{{ URL::to('rpgGame/scores/detail/?name=' . $friend->name) }}">View</a></td>
				</tr>
				@endforeach
			</table>
			@endisset


			@isset($profile)
			<div class="text-center">
				@if(session()->has('otherAvatar'))
				<img class="col" src="{{ session()->get( 'otherAvatar' ) }}" alt="avatar" >
				@else
				<p>No Avatar</p>
				@endif
				<p>Name: {{$profile->name}}</p>
				<p>Kills: {{$profile->kills}}</p>
				<p>Dmg Done: {{$profile->damageDone}}</p>
				<p>Dmg Recvd: {{$profile->damageReceived}}</p>
				<p>Chapters: {{$profile->chaptersCleared}}</p>
				<p>Earnings: {{$profile->earningsTotal}}</p>
				<p>Total: {{$profile->scoreTotal}}</p>
			</div>
			@endisset

			<div class="row">
				@isset($myScore)
				<p class="col">My last saved score: {{$myScore}}</p>
				@endisset
				<div class="btn-group d-flex w-100 fixed-bottom" role="group">
					<button id="returnFromScoresButton" type="button" class="introButtons btn btn-primary active w-100">Home</button>
					<button type="button" class="listScoresButton introButtons scoreButton btn btn-primary active w-100">Scores</button>
					<button type="button" class="listFriendsButton introButtons scoreButton btn btn-primary active w-100">Friends</button>
				</div>					
			</div>
		</div>
		<!--scripts-->
		<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" 
		integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" 
		crossorigin="anonymous">
		</script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" 
		integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" 
		crossorigin="anonymous">
		</script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" 
		integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" 
		crossorigin="anonymous">
		</script>
		<script src="/js/rpgGame.js"></script>
	</body>
</html>