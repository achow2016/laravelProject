<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\rpgGameUser;
use App\Models\rpgGameMessage;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Response;

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
		return Response::json(['message' => 'Message stored'],200);
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
			return Response::json(['error' => 'User does not exist'],400);
		}
		if($check) 
			$messages = $user->messages;
		else {
			return Response::json(['error' => 'Wrong password!'],400);
		}
		echo json_encode($messages);
		exit;
	}	
	
	//send a message to user of choice
	public function send(Request $request)
	{
		//header("Access-Control-Allow-Origin: *");
		$user = RpgGameUser::where('name', $request->loginName)->first();	
		if($user)
			$check = Hash::check($request->password, $user->password);
		else {
			return Response::json(['error' => 'User does not exist'],400);
		}
		if($check) {
			$user = RpgGameUser::where('name', $request->userMessageTarget)->first();	
			if($user) {
				$userName = $request->input('userMessageTarget');
				$userMessage = $request->input('userMessage');
				Event::dispatch(new PrivateMessage($userName, $userMessage, $userName));
				return Response::json(['message' => 'Message sent'],200);
			}
			else {
				//echo 'User does not exist! (Retry)';
				return Response::json(['error' => 'User does not exist'],400);
			}	
		}
		else {
			return Response::json(['error' => 'Wrong password!'],400);
		}
	}	
}
?>