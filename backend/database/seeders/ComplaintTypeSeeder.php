<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ComplaintType;

class ComplaintTypeSeeder extends Seeder
{
    public function run(): void
    {
        ComplaintType::insert([
            ['name' => 'Pengaduan Produk'],
            ['name' => 'Pengaduan Pengiriman'],
            ['name' => 'Pengaduan Pembayaran'],
            ['name' => 'Pengaduan Lainnya'],
        ]);
    }
}
