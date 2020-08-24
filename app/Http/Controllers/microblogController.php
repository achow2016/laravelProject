<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

//image file name processing
use Carbon\Carbon;

//use if processing images further
//use App\Images;
//use Image;
//use Illuminate\Support\Facades\Response;

//models
use App\Models\microblogPost;
use App\Models\microblogUser;

//auth
use Illuminate\Support\Facades\Auth;

class microblogController extends Controller
{	
	/*
	public function __construct()
	{
		$this->middleware('auth:dashboard');
	}
	*/
	
	public function posts() 
	{
		$microblogPosts = microblogPost::all();
		return view('microblogMain', ['microblogPosts' => $microblogPosts]);
	}	
	
	public function add(Request $request)
	{	
		/*
		$request->validate([
		'user_name'  => 'required',
		'user_image' => 'required|image|max:2048'
		]);
		*/
	
		$author = $request->input('author');
		$title = $request->input('title');
		$content = $request->input('textContent');
		
		//process post text preview
		$commentPreview = substr($content, 0, 50); 


		$microblogPost = new microblogPost();
		$microblogPost->setAttribute('author', $author);
		$microblogPost->setAttribute('title', $title);
		$microblogPost->setAttribute('content', $content);
		$microblogPost->setAttribute('contentPreview', $commentPreview);
		
		//if has image, processes and stores
		if($request->hasFile('postImage')) {
            $file = $request->file('postImage');
            //getting timestamp
            $timestamp = str_replace([' ', ':'], '-', Carbon::now()->toDateTimeString());
            $name = $timestamp. '-' .$file->getClientOriginalName();
            $file->move(public_path().'/img/microblog/', $name);
            $microblogPost->postImage = url('/img/microblog/' . $name);
        }
		
		$microblogPost->save();	
		$microblogPosts = microblogPost::all();
		return view('microblogMain', ['microblogPosts' => $microblogPosts]);
	}
	
	public function login(Request $request)
	{
		$microblogUser = microblogUser::find(1);
		$username = $request->input('user');
		$password = $request->input('password');

		if($microblogUser != null) {
			if($username == $microblogUser->user && $password == $microblogUser->password) {
				Auth::guard('admin')->login($microblogUser, true);
				return redirect('/microblogMain'); 
			}	
		}				
	}	
	
	public function logout()
    {
		Auth::guard('admin')->logout();
		return redirect('/microblogMain'); 	
    }
}