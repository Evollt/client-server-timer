<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class UserResource extends JsonResource
{

    protected $token;

    public function token($value)
    {
        $this->token = $value;
        return $this;
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request)
    {
        $array = [
            'status' => 'success',
            'user' => [
                'id' => $this->id,
                'name' => $this->name,
                'email' => $this->email,
                'created_at' => $this->created_at
            ],
        ];

        if ($this->token) {
            $array['authorisation'] = [
                'token' => $this->token,
                'type' => 'bearer',
            ];
        }

        return $array;
    }
}
