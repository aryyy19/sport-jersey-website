<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    // Menampilkan seluruh kategori
    public function index()
    {
        $categories = Category::all();

        return response()->json([
            'message' => 'Data kategori berhasil diambil.',
            'data' => $categories
        ], 200);
    }

    // Menampilkan kategori berdasarkan ID
    public function show($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'message' => 'Kategori tidak ditemukan.'
            ], 404);
        }

        return response()->json([
            'message' => 'Data kategori berhasil diambil.',
            'data' => $category
        ], 200);
    }
}
