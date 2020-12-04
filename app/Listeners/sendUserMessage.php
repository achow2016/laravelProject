<?php

namespace App\Listeners;

use App\Events\messageUser;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class sendUserMessage
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  messageUser  $event
     * @return void
     */
    public function handle(messageUser $event)
    {
        //
    }
}
