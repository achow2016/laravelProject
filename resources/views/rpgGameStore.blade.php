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
		<div class="row">
			<div class="col text-center">
				<h1>Store</h1>
				<p><?php echo $message; ?></p>
				<p>Credits: <?php echo $credits; ?></p>
				<form method="POST" id="payment-form" action="/rpgGame/pay">
					{{ csrf_field() }}
					<p>Fund With Paypal</p>
					@if (\Session::has('success'))
					<div class="alert alert-success">
						<ul>
							<li>{!! \Session::get('success') !!}</li>
						</ul>
					</div>
					@endif	
					@if (\Session::has('error'))
					<div class="alert alert-danger">
						<ul>
							<li>{!! \Session::get('error') !!}</li>
						</ul>
					</div>
					@endif	
					
					<label><b>Enter Amount</b></label>
					<br>
					<input name="amount" type="text">    
					<br>
					<br>
					<button class="btn btn-primary active">Pay with PayPal</button>
					<br>
					<br>
				</form>
			</div>
		</div>
		<div class="row">
			<p class="col">Membership</p>
			<p class="col">30 Days</p>
			<button id="buyMembership10" class="col btn btn-primary active">10 C</button>
		</div>
		<div class="btn-group d-flex w-100 fixed-bottom" role="group">
			<button id="returnFromStore" type="button" class="introButtons btn btn-primary active w-100">Home</button>
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