<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Post;
use App\User;

class DashController extends Controller
{
	public function __construct()
	{
		$this->middleware('auth:dashboard');
	}
	
	public function user() 
	{
		$user = Auth::user();
		$name = $user->getAttribute('name');
		$picture = $user->getAttribute('picture');	
		$id = $user->getAttribute('user_id');	
		return response()->json(['user' => ['id' => $id, 'name' => $name, 'picture' => $picture]]);
	}	
	/*
	public function relationship($post)
	{
		$user     = \App\Models\User::find(1);
		$posts    = $user->posts;$comments = [];
		foreach ($posts as $post)
		{
			$comments[] = $post->comment;
		}
		return response()->json(['comments' => $comments]);
	}
	*/
	public function posts() 
	{
		
		$currentUser = Auth::user();
		$currentId = $currentUser->getAttribute('user_id');
		$posts = Post::all()->where('user_id', $currentId)->sortBy('updated_at');	
		
		$users = User::all();
		foreach ($users as $user) {
			if($currentId == $users[0]->user_id) {
				$user = $users[0];
				break;	
			}
		}
			
		$comment = [];
		foreach($posts as $post)
		{		
			$comments[] = (['id' => $post->posts_id,  'user_id' => $post->user_id, 'title' => $post->title,
				'comment' => $post->comment, 'priority' => $post->priority, 'author' => $post->author, 
				'author_picture' => $post->author_picture, 'user' => $user]);
		}
		return response()->json(['posts' => $comments]);
	}	
	
	public function create(Request $request)
	{

		
		$user = Auth::user();
		$name = $user->getAttribute('name');
		$picture = $user->getAttribute('picture');
		$id = $user->getAttribute('user_id');
		
		$request->validate([
			'title' => 
				array(
					'required',	
					'regex:/(^[^_\W\d]|^[_\W\d][a-zA-Z]+|^[_][a-zA-Z])/',
				),
			'comment' =>
				array(
					'required', 				//must be populated
					'regex:/^[^_]+/',			//must not be underscore(s) only
				),
		]);
		
		$title = $request->input('title');
		$comment = $request->input('comment');
		$priority = $request->input('priority');
		
		$post = new Post();
		$post->setAttribute('user_id', $id);
		$post->setAttribute('title', $title);
		$post->setAttribute('comment', $comment);
		$post->setAttribute('priority', $priority);
		$post->setAttribute('author', $name);
		$post->setAttribute('author_picture', $picture);
		$post->save();
		
		return response()->json();
	}
	
	public function dashboard()
	{
		return view('dashboard');
	}
}

