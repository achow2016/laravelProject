<?php

namespace App\Http\Middleware;
use Illuminate\Support\Facades\Route;

use Closure;

//used to prevent direct access of URL used for ajax in the app
class AjaxWare
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
		if($request->ajax()){
            return $next($request);
        }
		else {
			return redirect('rpgGame')->with(['message' => 'Invalid request.']);
		}
		/*
		if($request->ajax()){
            return $next($request);
        }
			
        //return $next($request);
		else if ($request->expectsJson()) {
			return $next($request);
        }
		else if ($request->isMethod('post')) {
			return $next($request);
        }
		//redirects to home page if not an ajax request (direct url access)
		//if (!$request->expectsJson()) {
		else {
            return redirect('rpgGame')->with(['message' => 'Invalid request.']);
        }
		*/
    }
}
