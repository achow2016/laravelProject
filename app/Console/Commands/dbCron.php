<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class dbCron extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:cron';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Maintenance on rpggame databases';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
		//work start
        Log::info("DB maintenance cron is working.");
		
		//work content
		DB::statement('truncate table laravel.posts');
		
		//work end
		Log::info("DB maintenance cron is complete.");
		$this->info('db:Cron Command is complete.');
    }
}
