<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

    <head>
		<title>Corkboard</title>
        
		<meta charset="utf-8">
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1">

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
		
		<!--styles-->
		
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" 
		integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

		<link href="{{ asset('css/all.css') }}" rel="stylesheet">
		<link href="{{ asset('css/corkboard.css') }}" rel="stylesheet">
		
		<!--javascript at bottom-->
		
    </head>
    <body>	
		<div class="content container" id="corkboardContainer">
			<a id="corkboardReturn" href="/work"><<</a>
			
			<div class="row">
				<div class="col">
					<h1>Corkboard</h1>
					<h5>Daily one post limit and reset.</h5>
					@isset($errorMessage)
					<?php echo('<p>' . $errorMessage . '</p>')?>
					@endisset
				</div>	
			</div>
		
			<div class="row">
				<div class="col">
					<form action="{{url('addToCorkboard')}}" method="post">
					@csrf
					<label for="name">Name:</label><br>
					<input type="text" id="name" name="name" placeholder="Display name for post" required><br>
					<label for="comment">Comment:</label><br>
					<input type="text" id="comment" name="comment" placeholder="Your comment" required><br>

					<input type="hidden" id="numberOne" name="numberOne" value={{$numberOne ?? ''}}>
					<input type="hidden" id="numberTwo" name="numberTwo" value={{$numberTwo ?? ''}}>
					<label for="sumChallenge">Security Question:</label><br>
					<input type="text" id="sumChallenge" name="sumChallenge" placeholder="{{$numberOne ?? ''}} + {{$numberTwo ?? ''}}?" required><br><br>
					
					<?php
						if(!isset($_COOKIE["postBlock"])){ 	
							echo('<input type="submit" value="Submit">');
						}
						echo('</form>');
					?>
				</div>	
			</div>
			
			<br>

			@isset($corkboardPosts)
				@foreach($corkboardPosts as $post)
					<div class="row">    
						<div class="corkboardPost" class="col">
							<div class="row">
								<p>Author: {{$post->author}}</p>
							</div>
							<div class="row">
								<p>Comment: {{$post->comment}}</p>  
							</div>								
						</div>
					</div>	
				@endforeach
			@endisset
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
    </body>
</html>
