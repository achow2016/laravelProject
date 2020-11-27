<?php

namespace App\Http\Middleware;
use Illuminate\Support\Facades\Route;

use Closure;

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
        //return $next($request);
		if ($request->expectsJson()) {
			return $next($request);
        }
		//redirects to home page if not an ajax request (direct url access)
		if (!$request->expectsJson()) {
            return redirect('rpgGame')->with(['message' => 'Invalid request.']);
        }
    }
}
