<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Complaint extends Model
{
    protected $primaryKey = 'complaint_id';

    protected $fillable = [
        'user_id',
        'complaint_type_id',
        'complaint',
        'priority',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function complaintType()
    {
        return $this->belongsTo(ComplaintType::class, 'complaint_type_id', 'complaint_type_id');
    }
}
