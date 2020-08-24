<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
		<title>Work</title>
        
		<meta charset="utf-8">
		<!--mobile-->
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
		
		<!--style-->
		<link href="{{ asset('css/all.css') }}" rel="stylesheet">
		
		<link rel="stylesheet" 
		href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" 
		integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" 
		crossorigin="anonymous">
		
    </head>
    <body>
		<div class="content">
			
			<!--
				spaced word for adding headerBox class
				added headerbox class for styling top box
				add any styles to all.scss 
				.headerBox
			-->
			
			<div class="jumbotron text-center headerBox">
				<h1>Work</h1>
				
				<!--Not compat with .list-line bootstrap-->
				<div class="links">
					<a href="{{ route('home') }}">Home</a>
					<a href="{{ route('about') }}">About</a>
				</div>	
			</div>
			
			<div id="longText">
				<h3>
					Welcome to my works page!
				</h3>
				<p>
					Here are links to my work!
					
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Curabitur vehicula elementum nisl, sit amet porttitor 
					nulla malesuada sit amet. Integer porta felis non lectus 
					lobortis vulputate. Curabitur ac mi ante. Ut at mauris in 
					metus gravida vestibulum venenatis sed libero. Aliquam 
					sit amet nisi vel nunc efficitur rutrum. Praesent blandit 
					tellus nulla, at semper ligula tincidunt non. Nulla quis 
					sapien nec libero interdum aliquam. Nullam dapibus, urna 
					non efficitur egestas, lorem urna venenatis orci, a 
					ultricies augue mauris vitae libero. Nullam id massa in 
					nisl sodales mollis quis et ante. Proin quis eros 
					fringilla, ornare nisi id, commodo justo.
				</p>
			</div>
			
			
			
			<div class="links container">
				<div class="row">
					<div class="col-sm-12">
						<div class="row">
							<div class="col-sm-6 links">
								<a href="{{ route('rpgGame') }}">Rpg Game</a>
							</div>
							<div class="col-sm-6">
								<p>A RPG game.</p>
							</div>
							
							<div class="col-sm-6 links">
								<a href="{{ route('corkboard') }}">Corkboard</a>
							</div>
							<div class="col-sm-6">
								<p>A 24 Hour Corkboard.</p>
							</div>

							<div class="col-sm-6 links">
								<a href="{{ route('microblogMain') }}">Microblog</a>
							</div>
							<div class="col-sm-6">
								<p>A simple blog.</p>
							</div>		
						</div>
					</div>	
				</div>	
			</div>
			

				
			
			
		</div>
    </body>
</html>
