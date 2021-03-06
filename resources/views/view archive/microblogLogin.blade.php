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
		
			<!--error messages go here (authentication post content)-->
			<div class="col" style="position:relative">
				<a style="float:left" href="/microblogMain"><-</a>
				@isset($errorMessage)
				<div class="row">
					<div class="col">
						<?php echo('<p>' . $errorMessage . '</p>');?>
					</div>	
				</div>
				@endisset
				
				<!--
				make add post only available if session logged in
				-->
				<div class="row">
					<div class="col">
						<form action="{{url('microblogAuth')}}" method="post">
						@csrf
							<label for="user">User:</label><br>
							<input style="width:100%;" type="text" id="user" name="user" placeholder="username" required>
							<br><br>
							<label for="password">Password:</label><br>
							<input style="width:100%;" type="text" id="password" name="password" placeholder="password" required>
							<br><br>
							<input type="submit">
						</form>
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
    </body>
</html>
