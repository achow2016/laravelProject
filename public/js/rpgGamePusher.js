//on visit page, if local storage set and correct url set notification button attrs
if(localStorage.hasOwnProperty('messagesPresent') && (window.location.href).slice(-7) === "rpgGame") {
	$("#openMessages").attr("class", "introButtons btn btn-warning active w-100");
}	

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher('403928fd9724d481a2eb', {
	cluster: 'us3'
});

//get login name from cookie	
var loginName;
var name = "login_name" + "=";
var decodedCookie = decodeURIComponent(document.cookie);
var ca = decodedCookie.split(';');
for(var i = 0; i <ca.length; i++) {
	var c = ca[i];
	while (c.charAt(0) == ' ') {
		c = c.substring(1);
	}
	if (c.indexOf(name) == 0) {
		loginName = c.substring(name.length, c.length);
	}
}

//opens own channel for pusher, on receive message store to db
var channel2 = pusher.subscribe(loginName);
channel2.bind('App\\Events\\PrivateMessage', function(data) {
	
	/*
	var noteData = data.message;
	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});
	
	$.ajax({
		type: "POST",
		url: 'http://localhost:8082/rpgGame/storeMessage',
		data: {
			loginName:loginName,
			noteData:noteData},
			
			error: function(data) {
				console.log(data);	
			},	
			
		}).done(function( msg ) {
			//console.log(msg);	
		}
	);	
	*/
	
	localStorage.setItem('messagesPresent', 'true');
	if(localStorage.hasOwnProperty('messagesPresent') && (window.location.href).slice(-7) === "rpgGame") {
		$("#openMessages").attr("class", "introButtons btn btn-warning active w-100");
	}	
});


//joins public admin channel for pusher, on receive message store to db
//receives messages send through debug console on pusher
var channel = pusher.subscribe('admin');
channel.bind('admin', function(data) {
	var noteData = data;
	
	/*
	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});
	
	$.ajax({
		type: "POST",
		url: 'http://localhost:8082/rpgGame/storeMessage',
		data: {
			loginName:loginName,
			noteData:noteData
		},
		error: function(data) {
			console.log(data);	
		},	
		}).done(function( msg ) {
			//console.log( msg );
		}
	);	
	*/
	
	//set local storage item and attempt to change notification button if it is present (correct url)
	localStorage.setItem('messagesPresent', 'true');
	if(localStorage.hasOwnProperty('messagesPresent') && (window.location.href).slice(-7) === "rpgGame") {
		$("#openMessages").attr("class", "introButtons btn btn-warning active w-100");
	}	
});
