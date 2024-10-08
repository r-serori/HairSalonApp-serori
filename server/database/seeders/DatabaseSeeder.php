<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.a
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            UserSeeder::class,
            OwnerSeeder::class,
            StaffSeeder::class,
        ]);

        $this->call([
            CourseSeeder::class,
            MerchandiseSeeder::class,
            OptionSeeder::class,
            HairstyleSeeder::class,
            CustomerSeeder::class,
            StockCategorySeeder::class,
            StockSeeder::class,
            ScheduleSeeder::class,
            AttendanceTimeSeeder::class,
            // CourseCustomerSeeder::class,
            // OptionCustomerSeeder::class,
            // MerchandiseCustomerSeeder::class,
            // HairstyleCustomerSeeder::class,
            // CustomerUserSeeder::class,
            // DailySaleSeeder::class,
            // MonthlySaleSeeder::class,
            // YearlySaleSeeder::class,
        ]);
    }
}
