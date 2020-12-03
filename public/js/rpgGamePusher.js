//on visit page, if local storage set and correct url set notification button attrs
if(localStorage.hasOwnProperty('notificationsPresent') && (window.location.href).slice(-7) === "rpgGame") {
	$("#openNotifications").attr("class", "introButtons btn btn-warning active w-100");
}	

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher('403928fd9724d481a2eb', {
	cluster: 'us3'
});

var channel = pusher.subscribe('my-channel');
channel.bind('my-event', function(data) {
		
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
	
	var noteData = data;
	
	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});
	
	$.ajax({
		type: "POST",
		url: 'http://localhost:8082/rpgGame/storeNotification',
		data: {
			loginName:loginName,
			noteData:noteData},
			
			error: function(data) {
				console.log(data);	
			},	
			
		}).done(function( msg ) {
			//alert( msg );
		}
	);	
	
	//set local storage item and attempt to change notification button if it is present (correct url)
	localStorage.setItem('notificationsPresent', 'true');
	if(localStorage.hasOwnProperty('notificationsPresent') && (window.location.href).slice(-7) === "rpgGame") {
		$("#openNotifications").attr("class", "introButtons btn btn-warning active w-100");
	}	

	//console.log(noteData + " " + loginName);
	//alert(JSON.stringify(data));
	//$("#notificationText").text(data);
	//$("#openNotifications").prop("disabled",false);
});