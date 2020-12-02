<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\rpgGameUser;
use App\Models\rpgGameNotification;

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
}
?>