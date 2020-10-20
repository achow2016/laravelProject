<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//rpg game / project routes

	//all but login and register requires logged in user
	//add to score db uses ajax incompat with middleware as-is
	Route::get('rpgGame', function () {
		return view('rpgGame');
	})->name('rpgGame')->middleware('auth:rpgUser');
	
	//scores
	Route::get('rpgGame/scores', 'scoreViewController@scores')->middleware('auth:rpgUser');
	Route::get('rpgGame/scores/detail', 'scoreViewController@detail')->name('detail')->middleware('auth:rpgUser');
	Route::post('rpgGame/add', 'scoreViewController@add');//)->middleware('auth:rpgUser');
	
	//user account auth
	Route::get('register', function () {
		return view('rpgGameRegistration');
	})->name('register');

	Route::get('rpgGame/register', 'rpggameRegistrationController@create');
	Route::post('rpgGame/register', 'rpggameRegistrationController@store');
	 
	Route::get('rpgGame/login', 'rpggameSessionController@create');
	Route::post('rpgGame/login', 'rpggameSessionController@store');
	Route::get('rpgGame/logout', 'rpggameSessionController@destroy')->middleware('auth:rpgUser');

	Route::get('rpgGame/loginReset', 'rpggameRegistrationController@loginReset')->name('loginReset');

	Route::get('login', function () {
		return view('rpgGameLogin');
	})->name('login');

	Route::post('resetPassword', 'rpggameRegistrationController@validatePassReset');
	Route::post('resetPasswordToken', 'rpggameRegistrationController@resetPass');
	


//main site routes

	Route::get('/', function () {
		return view('home');
	})->name('home');

	Route::get('about', function () {
		return view('about');
	})->name('about');

	Route::get('work', function () {
		return view('work');
	})->name('work');


//corkboard routes
	Route::get('corkboard', 'corkboardPostController@corkboard')->name('corkboard');

	Route::post('addToCorkboard', 'corkboardPostController@add');

//microblog routes

	//new post form, redir to login on no auth
	Route::get('microblogMakePost', function () {
		return view('microblogMakePost');
	})->name('microblogMakePost')->middleware('auth:admin');

	//route to add to db, redir to login on no auth
	Route::post('addToMicroblog', 'microblogController@add')->name('addToMicroblog')->middleware('auth:admin');

	//load main
	Route::get('microblogMain', 'microblogController@posts')->name('microblogMain');

	//post detail
	Route::get('microblogPostDetail', function () {
		return view('microblogPostDetail');
	})->name('microblogPostDetail');

	//login screen
	Route::get('microblogLogin', function () {
		return view('microblogLogin');
	})->name('microblogLogin');

	//login screen alt
	//Route::get('login', function () {
	//    return view('microblogLogin');
	//})->name('login');

	//process login

	Route::post('microblogAuth', 'microblogController@login')->name('microblogAuth');

	//logout

	Route::get('microblogLogout', 'microblogController@logout')->name('microblogLogout');
