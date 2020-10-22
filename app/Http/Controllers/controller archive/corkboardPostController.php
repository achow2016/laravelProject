<?php

namespace App\Http\Controllers;

//use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\CorkboardPost;

class CorkboardPostController extends Controller
{	
	/*
	public function __construct()
	{
		$this->middleware('auth:dashboard');
	}
	*/
	
	public function posts() 
	{
		$numberOne = rand(1,10);
		$numberTwo = rand(1,10);
		
		if(isset($_COOKIE["postBlock"])){
			$errorMessage = "One post limit per day.";
			$corkboardPosts = CorkboardPost::all();	
			return view('corkboard', ['corkboardPosts' => $corkboardPosts,'errorMessage' => $errorMessage,'numberOne' => $numberOne, 'numberTwo' => $numberTwo]);
		}

		$corkboardPosts = CorkboardPost::all();
		return view('corkboard', ['corkboardPosts' => $corkboardPosts, 'numberOne' => $numberOne, 'numberTwo' => $numberTwo]);
	}	
	
	public function add(Request $request)
	{
		$numberOne = $request->input('numberOne');
		$numberTwo = $request->input('numberTwo');
		$sumChallenge = $request->input('sumChallenge');
		
		if($sumChallenge != ($numberOne + $numberOne)) {
			$errorMessage = "Wrong sum!";
			$corkboardPosts = CorkboardPost::all();
			$numberOne = rand(1,10);
			$numberTwo = rand(1,10);
			return view('corkboard', ['corkboardPosts' => $corkboardPosts,'errorMessage' => $errorMessage,'numberOne' => $numberOne, 'numberTwo' => $numberTwo]);
 		}
		
		if(isset($_COOKIE["postBlock"])){
			$errorMessage = "One post limit per day.";
			$corkboardPosts = CorkboardPost::all();
			$numberOne = rand(1,10);
			$numberTwo = rand(1,10);			
			return view('corkboard', ['corkboardPosts' => $corkboardPosts,'errorMessage' => $errorMessage,'numberOne' => $numberOne, 'numberTwo' => $numberTwo]);
		}
		
		$author = $request->input('name');
		$comment = $request->input('comment');
		
		$CorkboardPost = new CorkboardPost();
		$CorkboardPost->setAttribute('author', $author);
		$CorkboardPost->setAttribute('comment', $comment);
		$CorkboardPost->save();	
		$corkboardPosts = CorkboardPost::all();
		
		//one day limit
		setcookie("postBlock", "true", time()+ 1 * 24 * 60 * 60); 
		
		return view('corkboard', ['corkboardPosts' => $corkboardPosts]);
		//return response()->json();
	}
	
	
	public function corkboard()
	{
		return $this->posts();
	}
	
}

