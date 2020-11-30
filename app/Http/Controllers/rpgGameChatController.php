<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

//models
use App\Models\rpgGameTextboardPost;

use DateTime;

class RpgGameChatController extends Controller {

	public function getPosts() 
	{
		$posts = RpgGameTextboardPost::all();
		return view('rpgGameTextboard', ['posts' => $posts, 'message' => 'Posts retrieved.']);
	}
	
	public function confirmPost() 
	{
		$posts = RpgGameTextboardPost::all();
		return view('rpgGameTextboard', ['posts' => $posts, 'message' => 'Post made.']);
	}

	public function add(Request $request)
	{
		$handle = $request->input('handle');
		$postText = $request->input('post');
		$date = new DateTime("now");

		$rpgGameTextboardPost = new RpgGameTextboardPost();
		$rpgGameTextboardPost->setAttribute('name', $handle);
		$rpgGameTextboardPost->setAttribute('postText', $postText);
		$rpgGameTextboardPost->setAttribute('date', $date);

		$rpgGameTextboardPost->save();	
		return redirect('/rpgGame/textBoard/confirmPost'); 
	}
}
?>