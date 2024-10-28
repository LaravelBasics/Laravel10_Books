<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Books>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // $categorys = ['React','Vue','Laravel'];
        $categorys = ['文芸書','実用書','ビジネス書','児童書','専門書'];
        return [
            'title' => $this->faker->lastName,   // タイトルをランダムな文で生成
            'content' => $this->faker->city,      // コンテンツをランダムなテキストで生成
            'category' => $this->faker->randomElement($categorys),     // カテゴリーをランダムな単語で生成
            'price' => $this->faker->numberBetween(100, 7000000), // 価格を1000〜5000の間で生成
        ];
    }
}

