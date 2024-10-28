<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Books extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'content', 'category','price'];

    // ミューテーターを追加
    // public function setPriceAttribute($value)
    // {
    //     $this->attributes['price'] = (int) $value;
    // }
    protected $casts = [
        'price' => 'integer',
    ];

    // アクセサを追加
    public function getFormattedPriceAttribute()
    {
        return number_format($this->price);
    }
}
