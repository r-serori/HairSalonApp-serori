<?php

namespace App\Models;


use Illuminate\Contracts\Auth\MustVerifyEmail as MustVerifyEmailContract;
use Illuminate\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmailContract
{
    use HasApiTokens;
    use HasFactory;
    use Notifiable;
    use TwoFactorAuthenticatable;
    use MustVerifyEmail;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        "name",
        "email",
        'phone_number',
        "password",
        "role",
        "isAttendance"
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'isAttendance' => 'boolean',
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }


    public function attendance_times()
    {
        return $this->hasMany(AttendanceTime::class);
    }


    public function customers()
    {
        return $this->belongsToMany(Customer::class, 'customer_users', 'user_id', 'customer_id');
    }

    public function getKey()
    {
        return $this->id;
    }

    public function getEmailForVerification()
    {
        return $this->email;
    }

    /**
     * Check if the user has the specified role.
     *
     * @param string $role
     * @return bool
     */
    public function hasRole(string $role): bool
    {
        return $this->role === $role;
    }
}
