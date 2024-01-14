<?php

namespace App\Http\Controllers;

use App\Http\Resources\TimerResource;
use App\Jobs\TimerJob;
use App\Models\Timer;
use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;

class TimerController extends Controller
{
    public function create(Request $request)
    {
        $clientTime = $request->input('time');
        $modifiedServerTime = $this->modifyServerTime($clientTime);

        // date_default_timezone_set('Europe/Moscow');


        $timer = Timer::create([
            'title' => $request->title,
            'time' => $request->time,
            'stoptime' => $modifiedServerTime,
            'user_id' => Auth::user()->id
        ]);

        return response()->json((new TimerResource($timer))->currentTime());
    }

    public function delete($id)
    {
        $timer = Timer::find($id);

        $timer->delete();

        return 'successfull deleted';
    }

    public function getAll()
    {
        $timers = [];

        foreach (Auth::user()->timers as $timer) {
            array_push($timers, (new TimerResource($timer))->currentTime());
        }
        return response()->json($timers);
    }

    private function modifyServerTime($clientTime)
    {
        $serverTime = Carbon::now();
        $clientTimeArray = explode(':', $clientTime);

        $hour = (int) $clientTimeArray[0] * 3600;
        $minute = (int) $clientTimeArray[1] * 60;
        $second = (int) $clientTimeArray[2];
        $clientTime = $hour + $minute + $second;

        // Вычитаем 10 секунд из времени на сервере
        $serverTime->addSeconds($clientTime);

        return $serverTime->toTimeString();
    }
}
