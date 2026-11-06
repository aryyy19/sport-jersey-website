<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Menampilkan semua produk.
     */

    /**
     * Menampilkan produk dengan Pagination dan Filter.
     */
    public function index(Request $request)
    {
        // Validasi parameter
        $request->validate([
            'limit' => 'nullable|integer|min:1|max:100',
            'category_id' => 'nullable|exists:categories,category_id',
            'keyword' => 'nullable|string',
        ]);

        // Mengambil jumlah produk per halaman
        $limit = $request->query('limit', 10);

        // Query produk
        $query = Product::with('category');

        // Filter berdasarkan kategori
        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Pencarian berdasarkan nama produk
        if ($request->filled('keyword')) {
            $query->where('name', 'like', '%' . $request->keyword . '%');
        }

        // Pagination
        $products = $query->paginate($limit)->appends($request->query());

        return ProductResource::collection($products);
    }

    /**
     * Menampilkan statistik keseluruhan produk dan kategori.
     */
    public function stats()
    {
        // Menghitung jumlah seluruh produk di database
        $totalProducts = Product::count();

        // Menjumlahkan seluruh stok dari semua produk
        $totalStock = Product::sum('stock');

        // Menghitung jumlah seluruh kategori di database
        $totalCategories = Category::count();

        // Mengembalikan hasil statistik dalam format JSON
        return response()->json([
            'total_products' => $totalProducts,
            'total_stock' => $totalStock,
            'total_categories' => $totalCategories,
        ]);
    }

    /**
     * Menambahkan produk baru.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:150',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,category_id',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'img' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Initialize image path
        $path = "";

        // Mengambil file image dari request img
        if ($request->hasFile('img')) {
            // Menyimpan gambar ke folder products di disk public
            $path = $request->file('img')->store('products', 'public');
        }

        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'price' => $request->price,
            'stock' => $request->stock,
            'img' => $path,
            'slug' => Str::slug($request->name),
        ]);

        return new ProductResource($product);
    }

    /**
     * Menampilkan detail produk.
     */
    public function show(string $id)
    {
        $product = Product::with('category')->findOrFail($id);

        return new ProductResource($product);
    }

    /**
     * Mengubah data produk.
     */

    public function update(Request $request, string $id)
    {
        $product = Product::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:150',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,category_id',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'img' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Gunakan gambar lama jika tidak ada gambar baru
        $path = $product->img;

        // Simpan gambar baru jika diunggah
        if ($request->hasFile('img')) {
            $path = $request->file('img')->store('products', 'public');
        }

        $product->update([
            'name' => $request->name,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'price' => $request->price,
            'stock' => $request->stock,
            'img' => $path,
            'slug' => Str::slug($request->name),
        ]);

        return new ProductResource($product);
    }

    /**
     * Menghapus produk.
     */
    public function destroy(string $id)
    {
        $product = Product::find($id);

        if ($product == null) {
            return response()->json([
                'message' => 'Product not found'
            ], 404);
        }

        // Menghapus file gambar dari penyimpanan
        if ($product->img) {
            Storage::disk('public')->delete($product->img);
        }

        // Menghapus data produk dari database
        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully'
        ]);
    }
}