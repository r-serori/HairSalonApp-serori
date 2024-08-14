<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50)->nullable(false);
            $table->string('email', 200)->unique()->index()->nullable(false);
            $table->string('password', 100)->nullable(false);
            $table->string('role', 50)->nullable(false);
            $table->boolean('isAttendance')->default(0)->nullable(false);
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->string('google_id')->nullable();
            // $table->foreignId('current_team_id')->nullable();
            // $table->string('profile_photo_path', 2048)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
