<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\rpgGameUser;
use App\Models\rpgGameNotification;
use Illuminate\Support\Facades\Hash;

class RpgGameNotificationController extends Controller {

	public function store(Request $request)
	{
		//are fine
		$name = $request->input('loginName');
		$notificationText = $request->input('noteData');
		
		$profile = RpgGameUser::where('name', $name)->first();
		
		$notification = new RpgGameNotification();
		$notification->setAttribute('rpg_game_user_id', $profile->id);
		$notification->setAttribute('text', $notificationText);	
		$profile = $profile->notifications()->save($notification);
		
		//echo("<script>console.log('PHP: " . $notificationText . "');</script>");
	}
	
	public function get(Request $request)
	{
		header("Access-Control-Allow-Origin: *");
		$user = RpgGameUser::where('name', $request->loginName)->first();	
		if($user)
			$check = Hash::check($request->password, $user->password);
		else {
			echo 'User does not exist! (Retry)';
			exit;
		}
		if($check) 
			$notifications = $user->notifications;
		else {
			echo 'Wrong password! (Retry)';
			exit;
		}
		echo json_encode($notifications);
		//echo $notifications;
		exit;
	}	
}
?>