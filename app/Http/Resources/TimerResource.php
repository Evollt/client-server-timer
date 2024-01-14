<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Carbon\Carbon;
use DateTime;
use Illuminate\Http\Resources\Json\JsonResource;

class TimerResource extends JsonResource
{
    protected $realTime;
    public function currentTime()
    {
        $currentTime = new DateTime();
        $this->realTime = $currentTime->format('H:i:s');

        return $this;
    }
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request)
    {
        return [
            "id" => $this->id,
            "title" => $this->title,
            "time" => $this->time,
            'current_time' => $this->realTime,
            "stoptime" => $this->stoptime,
            "user_id" => $this->user_id,
        ];
    }
}
