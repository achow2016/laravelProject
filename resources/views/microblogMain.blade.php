<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

    <head>
		<title>Microblog</title>
        
		<meta charset="utf-8">
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1">

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
		
		<!--styles-->
		
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" 
		integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

		<link href="{{ asset('css/all.css') }}" rel="stylesheet">
		
		<!--javascript at bottom-->
		
    </head>
    <body>	
		<div class="content container">
		
			<!--same error message spot and back link as corkboard-->
			<div class="col" style="position:relative">
				<a style="float:left" href="/work"><-</a>
				@isset($errorMessage)
				<div class="row">
					<div class="col">
						<?php echo('<p>' . $errorMessage . '</p>')?>
					</div>	
				</div>
				@endisset
				
				<!--
				make add post link only available if session logged in
				make login or logout visible depending if logged in
					use isset to decide
					
						<div class="col">
							@if(Auth::guard('admin'))
								<a href="/microblogMakePost">New Post</a>
							@else
								<p>Login to post.</p>
							@endif
						</div>	
				-->
				<div class="row">
						<div class="col">
							<a href="/microblogMakePost">New Post</a>
							<p>Login to post.</p>
						</div>	
					
						<div class="col">
							<a href="{{ route('microblogLogout') }}">Logout</a>
							<a href="{{ route('microblogLogin') }}">Login</a>	
						</div>	
			
				</div>
				
				@isset($microblogPosts)
					@foreach($microblogPosts as $post)
						<div class="container"> 
							<div class="row" style="border:1px solid black">
								<img class="col" src="{{ $post->postImage }}" alt="{{$post->title}}" >
							</div>
							<div class="row" style="border:1px solid black">
								<div class="col">
									<div class="row">
										<p>Title: {{$post->title}}</p>
									</div>
									<div class="row">
										<p>Author: {{$post->author}}</p>
									</div>
									<div class="row">
										<p>Preview: {{$post->contentPreview}}</p>  
									</div>								
								</div>
							</div>
						</div>	
					@endforeach
				@endisset
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
    </body>
</html>
