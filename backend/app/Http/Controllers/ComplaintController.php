<?php

namespace App\Http\Controllers;

use App\Models\Complaint;
use Illuminate\Http\Request;

class ComplaintController extends Controller
{
    // Menampilkan semua pengaduan milik user yang login
    public function index(Request $request)
    {
        $complaints = Complaint::with('complaintType')
            ->where('user_id', $request->user()->id)
            ->get();

        return response()->json([
            'message' => 'Data pengaduan berhasil ditampilkan.',
            'data' => $complaints,
        ], 200);
    }

    // Menambahkan pengaduan baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'complaint_type_id' => 'required|exists:complaint_types,complaint_type_id',
            'complaint' => 'required|string',
            'priority' => 'required|in:high,medium,low',
        ]);

        $validated['user_id'] = $request->user()->id;

        $complaint = Complaint::create($validated);

        return response()->json([
            'message' => 'Pengaduan berhasil ditambahkan.',
            'data' => $complaint->load('complaintType'),
        ], 201);
    }

    // Menampilkan satu pengaduan
    public function show(Request $request, string $id)
    {
        $complaint = Complaint::with('complaintType')
            ->where('user_id', $request->user()->id)
            ->findOrFail($id);

        return response()->json([
            'message' => 'Detail pengaduan berhasil ditampilkan.',
            'data' => $complaint,
        ], 200);
    }

    // Memperbarui pengaduan
    public function update(Request $request, string $id)
    {
        $complaint = Complaint::where('user_id', $request->user()->id)
            ->findOrFail($id);

        $validated = $request->validate([
            'complaint_type_id' => 'sometimes|required|exists:complaint_types,complaint_type_id',
            'complaint' => 'sometimes|required|string',
            'priority' => 'sometimes|required|in:high,medium,low',
        ]);

        $complaint->update($validated);

        return response()->json([
            'message' => 'Pengaduan berhasil diperbarui.',
            'data' => $complaint->load('complaintType'),
        ], 200);
    }

    // Menghapus pengaduan
    public function destroy(Request $request, string $id)
    {
        $complaint = Complaint::where('user_id', $request->user()->id)
            ->findOrFail($id);

        $complaint->delete();

        return response()->json([
            'message' => 'Pengaduan berhasil dihapus.',
        ], 200);
    }
}
