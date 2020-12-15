<?php

use App\Models\rpgGameMessage;
use App\Models\rpgGameUser;
namespace App;

trait SendUserReport {
	
	public function sendUserReport($text, $sender, $target) {
		//store to db on send
		$profile = Models\RpgGameUser::where('name', $target)->first();			
		$message = new Models\RpgGameMessage();
		$message->setAttribute('rpg_game_user_id', $profile->id);
		$message->setAttribute('author', $sender);	
		$message->setAttribute('text', $text);	
		$profile = $profile->messages()->save($message);
	}	
}	