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
		if (!$request->ajax())
            return response('Forbidden.', 403);

        return $next($request);
    }
}
