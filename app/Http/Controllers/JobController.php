<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Jobs\ClearTextboard;

class JobController extends Controller
{
    /**
     * Dispatches job to queue
     */
    public function dispatch()
    {
		//dispatch(new ClearTextboard());
		$textboardWeeklyClean = (new ClearTextboard())
									->delay(Carbon::now()->addDays(7));
		dispatch($textboardWeeklyClean);
		echo 'Textboard cleared.';
    }
}
