<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Log;
//use Illuminate\Support\Facades\DB;

use App\Jobs\ClearTextboard;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // $schedule->command('inspire')
        //          ->hourly();
		
		/*
		$schedule->command('db:cron')
                ->everyMinute()
				->onSuccess(function () {
					Log::info("Scheduled db:cron successfully run.");
				})
				->onFailure(function () {
					Log::info("Scheduled db:cron failed to run.");
				});
		*/
		
		$schedule->job(new ClearTextboard)->everyMinute();
		
		/*		
		$schedule->call(function () {
			DB::statement('truncate table laravel.posts');
		})->everyMinute();
		*/
	}

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
