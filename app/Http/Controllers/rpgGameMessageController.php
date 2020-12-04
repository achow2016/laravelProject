<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\rpgGameUser;
use App\Models\rpgGameMessage;
use Illuminate\Support\Facades\Hash;

use Event;
use App\Events\PrivateMessage;

class RpgGameMessageController extends Controller {
	//stores messages to hasMany db
	public function store(Request $request)
	{
		$name = $request->input('loginName');
		$messageText = $request->input('noteData');
		
		$profile = RpgGameUser::where('name', $name)->first();
		
		$message = new RpgGameMessage();
		$message->setAttribute('rpg_game_user_id', $profile->id);
		$message->setAttribute('text', $messageText);	
		$profile = $profile->messages()->save($message);
		
		//echo("<script>console.log('PHP: " . $notificationText . "');</script>");
	}
	
	//get all of users messages from the db
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
			$messages = $user->messages;
		else {
			echo 'Wrong password! (Retry)';
			exit;
		}
		echo json_encode($messages);
		//echo $notifications;
		exit;
	}	
	
	//send a message to user of choice
	public function send(Request $request)
	{
		header("Access-Control-Allow-Origin: *");
		$userName = $request->input('userName');
		$userMessage = $request->input('userMessage');
		Event::dispatch(new PrivateMessage($userName, $userMessage));
		exit;
	}	
}
?>