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

//rpg game routes

Route::get('rpgGame', function () {
    return view('rpgGame');
})->name('rpgGame');

Route::get('rpgGame/scores', 'scoreViewController@scores);
Route::post('rpgGame/saveScore', 'scoreViewController@add');


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
Route::get('login', function () {
    return view('microblogLogin');
})->name('login');

//process login

Route::post('microblogAuth', 'microblogController@login')->name('microblogAuth');

//logout

Route::get('microblogLogout', 'microblogController@logout')->name('microblogLogout');
