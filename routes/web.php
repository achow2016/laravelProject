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

	Route::get('/', function () {
		return view('rpgGame');
	})->name('home');
	
	//all but login and register requires logged in user
	//add to score db uses ajax incompat with middleware as-is
	//Route::get('rpgGame', function () {
	//	return view('rpgGame');
	//})->name('rpgGame')->middleware('auth:rpgUser');
	
	Route::get('rpgGame', 'rpggameRegistrationController@home')->middleware('auth:rpgUser');
	
	//payments
	Route::post('/rpgGame/pay', 'RpgGamePaymentController@createPayment')->name('create-payment')->middleware('auth:rpgUser');;
	Route::get('/rpgGame/confirm', 'RpgGamePaymentController@confirmPayment')->name('confirm-payment')->middleware('auth:rpgUser');;
	
	//scores
	Route::get('rpgGame/scores', 'ScoreViewController@scores')->middleware('auth:rpgUser');
	Route::get('rpgGame/friends', 'ScoreViewController@friends')->middleware('auth:rpgUser');
	Route::get('rpgGame/scores/detail', 'ScoreViewController@detail')->name('detail')->middleware('auth:rpgUser');
	Route::get('rpgGame/scores/addFriend', 'ScoreViewController@addFriend')->name('friend')->middleware('auth:rpgUser');
	Route::post('rpgGame/add', 'ScoreViewController@add')->middleware('ajax');
	//Route::post('rpgGame/add', 'ScoreViewController@add');
	//Route::post('rpgGame/add', 'ScoreViewController@add')->middleware('auth:rpgUser');
	Route::post('rpgGame/addAvatar', 'rpggameRegistrationController@addAvatar')->middleware('auth:rpgUser');//)->middleware('auth:rpgUser');
	
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
	Route::post('rpgGame/newPassword', 'rpggameRegistrationController@newPass')->name('newPassword');

	Route::get('login', function () {
		return view('rpgGameLogin');
	})->name('login');

	//password reset routes
	Route::get('rpgGameResetMail', function () {
		return view('rpgGameResetMail');
	})->name('rpgGameResetMail');

	Route::get('rpgGameResetMailConf', function () {
		return view('rpgGameResetMailConf');
	})->name('rpgGameResetMailConf');

	Route::get('/rpgGame/passwordReset', function () {
		return view('rpgGamePasswordReset');
	})->name('rpgGamePasswordReset');

	Route::post('resetPassword', 'rpggameRegistrationController@validatePassReset');
	Route::post('resetPasswordToken', 'rpggameRegistrationController@resetPass');
	Route::post('newPass', 'rpggameRegistrationController@newPass');
	
	//user account management
	
	//Route::get('/rpgGame/userManagement', function () {
	//	return view('rpgGameUserPanel');
	//})->name('rpgGameUserPanel')->middleware('auth:rpgUser');
	
	Route::get('rpgGame/userManagement', 'rpggameRegistrationController@userManagement')->middleware('auth:rpgUser');
	Route::post('rpgGame/addAvatar', 'rpggameRegistrationController@addAvatar')->middleware('auth:rpgUser');
	Route::post('rpgGame/updateName', 'rpggameRegistrationController@updateName')->middleware('auth:rpgUser');
	Route::post('rpgGame/updateEmail', 'rpggameRegistrationController@updateEmail')->middleware('auth:rpgUser');
	Route::post('rpgGame/updatePassword', 'rpggameRegistrationController@updatePassword')->middleware('auth:rpgUser');

	//game backup
	Route::post('rpgGame/backup', 'rpggameSessionController@backup')->middleware('ajax');
	//Route::post('rpgGame/backup', 'rpggameSessionController@backup');
	Route::get('rpgGame/getBackup', 'rpggameSessionController@getBackup')->middleware('ajax');
	//Route::get('rpgGame/getBackup', 'rpggameSessionController@getBackup');

	//user cash shop
	Route::get('/rpgGame/userCashStore', 'RpgGamePaymentController@getStorePage')->middleware('auth:rpgUser');
	Route::get('/rpgGame/buyMembership', 'rpggameRegistrationController@addMembership')->middleware('auth:rpgUser');

	//social textboard
	Route::get('/rpgGame/textBoard', 'RpgGameChatController@getPosts')->middleware('auth:rpgUser');
	Route::get('/rpgGame/textBoard/confirmPost', 'RpgGameChatController@confirmPost')->middleware('auth:rpgUser');
	Route::get('/rpgGame/textBoard/add', 'RpgGameChatController@add')->middleware('auth:rpgUser');
	
	//pusher notifications
	//Route::post('rpgGame/storeNotification', 'RpgGameNotificationController@store')->middleware('ajax');
	Route::post('rpgGame/storeNotification', 'RpgGameNotificationController@store');
	Route::get('rpgGame/getNotifications', 'RpgGameNotificationController@get');
/*
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
*/