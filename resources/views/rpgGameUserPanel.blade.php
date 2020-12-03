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
		<script src="https://js.pusher.com/7.0/pusher.min.js"></script>
    
	</head>
    <body>
		<header class="row">
			<div class="col text-center">
				<h1>User Account</h1>
			</div>
		</header>
	
		@isset($errorMessage)
		<div class="row">
			<div class="col text-center">
				<p>{{$errorMessage}}</p>
			</div>
		</div>
		@endisset
		
		@isset($message)
		<div class="row">
			<div class="col text-center">
				<p>{{$message}}</p>
			</div>
		</div>
		@endisset
	
		<button id="selectAvatarRow" type="button" class="btn btn-primary active w-100">Avatars</button>

		<div class="row mgmtRow mb-1" id="avatarRow">
			<div class="col">
				<div class="text-center" id="avatarMenu" style="display:none">
					<form method="post" action="/rpgGame/addAvatar" enctype="multipart/form-data">
						Avatar
						<input type="file" name="avatar" id="avatar">
						<br><br>
						<input type="submit" value="Upload Image" name="submit">
					</form>
					<br>
				</div>
				<div class="text-center">
					<div class="col">
						@if (!empty($avatar))
						Current Avatar	
						<img class="img-responsive mt-1 mb-1" src="{{$avatar}}" alt="avatar">
						<button id="showAvatarMenu" type="button" class="mb-1 btn btn-primary active">Upload Avatar</button>
						<button style="display:none" id="hideAvatarMenu" type="button" class="btn btn-primary active w-100">Close Avatar Menu</button>
						@else 
						<p>No Avatar</p>
						<button id="showAvatarMenu" type="button" class="mb-1 btn btn-primary active">Upload Avatar</button>
						<button style="display:none" id="hideAvatarMenu" type="button" class="btn btn-primary active w-100">Close Avatar Menu</button-->
						@endif
					</div>
				</div>
			</div>
		</div>
		
		<button id="selectNameRow" type="button" class="btn btn-primary active w-100">Username</button>
		
		<div class="row mb-2 mgmtRow" id="nameRow" style="display:none">
			<div class="col text-center">
				<form method="post" action="/rpgGame/updateName" enctype="multipart/form-data">
					Update Name
					<br>
					@isset($currentName)
					Current Name: {{$currentName}}
					@endisset
					@empty($currentName)
					No name set
					@endempty
					<br>
					<input type="text" name="name" id="name" placeholder="new name" required>
					<br><br>
					<input type="text" name="nameConf" id="nameConf" placeholder="name confirm" required>
					<input type="submit" name="submit" value=">">
				</form>		
			</div>
		</div>
		
		<button id="selectEmailRow" type="button" class="btn btn-primary active w-100">Email</button>
		
		<div class="row mb-2 mgmtRow" id="emailRow" style="display:none">
			<div class="col text-center">
				<form method="post" action="/rpgGame/updateEmail" enctype="multipart/form-data">
					Update Email
					<br>
					@isset($currentEmail)
					Current Email: 
					<br>
					{{$currentEmail}}
					@endisset
					@empty($currentEmail)
					No email set
					@endempty
					<br>
					<input type="text" name="email" id="email" placeholder="new email" required>
					<br><br>
					<input type="text" name="emailConf" id="emailConf" placeholder="email confirm" required>
					<input type="submit" name="submit" value=">">
				</form>					
			</div>
		</div>

		<button id="selectPasswordRow" type="button" class="btn btn-primary active w-100">Password</button>
		
		<div class="row mb-2 mgmtRow" id="passRow" style="display:none">
			<div class="col text-center">
				<form method="post" action="/rpgGame/updatePassword" enctype="multipart/form-data">
					Update Password
					<br>
					<input type="text" name="password" id="password" placeholder="new password" required>
					<br><br>
					<input type="text" name="passwordConf" id="passwordConf" placeholder="password confirm" required>
					<input type="submit" name="submit" value=">">
				</form>			
			</div>
		</div>
		
		<div class="btn-group d-flex w-100 fixed-bottom" role="group">
			<button id="returnFromPanel" type="button" class="introButtons btn btn-primary active w-100">Home</button>
		</div>	
		<!--scripts-->
		<!--script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" 
		integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" 
		crossorigin="anonymous">
		</script-->
		<script src="https://code.jquery.com/jquery-3.5.1.js"
		integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc="
		crossorigin="anonymous"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" 
		integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" 
		crossorigin="anonymous">
		</script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" 
		integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" 
		crossorigin="anonymous">
		</script>
		<script src="/js/rpgGame.js"></script>
		<script src="/js/rpgGamePusher.js"></script>
	</body>
</html>