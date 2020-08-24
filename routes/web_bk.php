<?php

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

Route::get('/', 'IndexController@index');
Route::get('/dashboard', 'DashController@dashboard')->middleware('auth:dashboard');

Route::get('/login', 'LoginController@login');


Route::get('/home', 'IndexController@index')->name('login');


Route::get('/logout', 'LoginController@logout')->middleware('auth:dashboard');

Route::get('/authorize', 'LoginController@callback');


Route::get('/posts', 'DashController@posts')->middleware('auth:dashboard');
Route::get('/user', 'DashController@user')->middleware('auth:dashboard');
Route::post('/posts/create', 'DashController@create')->middleware('auth:dashboard');
Route::get('/posts/read', 'DashController@read')->middleware('auth:dashboard');