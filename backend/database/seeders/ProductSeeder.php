<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         DB::table('products')->insert([
        [
            'name' => 'Jersey Manchester United Home',
            'slug' => Str::slug('Jersey Manchester United Home'),
            'description' => 'Jersey Manchester United untuk musim terbaru',
            'category_id' => 1,
            'price' => 350000,
            'img' => null,
            'stock' => 10,
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'name' => 'Jersey Manchester United Away',
            'slug' => Str::slug('Jersey Manchester United Away'),
            'description' => 'Jersey Manchester United untuk musim terbaru',
            'category_id' => 2,
            'price' => 350000,
            'img' => null,
            'stock' => 8,
            'created_at' => now(),
            'updated_at' => now(),
        ],
    ]);
    }
}
