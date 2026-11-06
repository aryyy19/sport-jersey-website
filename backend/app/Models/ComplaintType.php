<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ComplaintType extends Model
{
    protected $primaryKey = 'complaint_type_id';

    protected $fillable = [
        'name',
    ];

    public function complaints()
    {
        return $this->hasMany(Complaint::class, 'complaint_type_id', 'complaint_type_id');
    }
}
