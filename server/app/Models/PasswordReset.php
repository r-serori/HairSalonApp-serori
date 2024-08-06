<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class PasswordReset extends Model
{
  use HasFactory;

  protected $table = 'password_reset_tokens';
  protected $primaryKey = 'email'; // プライマリキーを email に設定
  public $incrementing = false; // プライマリキーはインクリメントしない
  protected $keyType = 'string';

  protected $fillable = [
    'email',
    'token'
  ];

  public function user()
  {
    return $this->belongsTo(User::class, 'email', 'email');
  }
}
