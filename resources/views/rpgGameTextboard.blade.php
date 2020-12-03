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
		<div class="col text-center">
			@isset($errorMessage)
			<p>{{$errorMessage}}</p>
			@endisset
			@isset($message)
			<p>{{$message}}</p>
			@endisset
			
			<form action="/rpgGame/textBoard/add">
				<input style="min-width:100%" type="text" name="handle" id="handle" placeholder="name">
				<br>
				<textarea style="min-width:100%" class="form-control-lg" id="post" name="post">
				</textarea>
				 <button type="submit" class="btn btn-primary w-100">Submit</button>
			</form>
			
			@isset($posts)
			<table class="table">
				@foreach($posts as $post)
				<tr>
					<td width="50%">{{$post->name}}</td>
					<td width="50%">{{$post->date}}</td>	
				</tr>			
				<tr>
					<td>{{$post->postText}}</td>
				</tr>
				@endforeach
			</table>
			@endisset
			
			<div style="opacity:0.6" class="btn-group d-flex w-100 fixed-bottom" role="group">
				<button id="returnFromPostsButton" type="button" class="introButtons btn btn-primary active w-100">Home</button>
				<button id="refreshPostsButton" type="button" class="introButtons btn btn-primary active w-100">Refresh</button>
			</div>	
			
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