<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPriceToBooksTable extends Migration
{
    /**
     * Run the migrations.
     * 
     * @return void
     */
    public function up(): void
    {
        Schema::table('books', function (Blueprint $table) {
            // `category`カラムの後に`price`カラムを追加
            $table->integer('price')->nullable()->after('category');
            
        });
    }

    /**
     * Reverse the migrations.
     * 
     * @return void
     */
    public function down(): void
    {
        Schema::table('books', function (Blueprint $table) {
            // `price`カラムを削除
            $table->dropColumn('price');
        });
    }
};
