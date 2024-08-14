<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Enums\Roles;

class UserSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    DB::table('users')->insert([
      'name' => 'owner123',
      'email' => 'owner@hairmail.com',
      'password' => Hash::make('Password_123'),
      'role' => Roles::$OWNER,
      'isAttendance' => 0,
      'created_at' => now(),
      'updated_at' => now(),
      'email_verified_at' => now(), // Optional: if you want to mark the user as verified
    ]);
    DB::table('users')->insert([
      'name' => 'manager123',
      'email' => 'manager@hairmail.com',
      'password' => Hash::make('Password_123'),
      'role' => Roles::$MANAGER,
      'isAttendance' => 0,
      'created_at' => now(),
      'updated_at' => now(),
      'email_verified_at' => now(), // Optional: if you want to mark the user as verified
    ]);
    DB::table('users')->insert([
      'name' => 'staff123',
      'email' => 'staff@hairmail.com',
      'password' => Hash::make('Password_123'),
      'role' => Roles::$STAFF,
      'isAttendance' => 0,
      'created_at' => now(),
      'updated_at' => now(),
      'email_verified_at' => now(), // Optional: if you want to mark the user as verified
    ]);

    // User::factory()
    //     ->count(37)
    //     ->create();
  }
}
