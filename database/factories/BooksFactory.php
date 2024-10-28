<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Books>
 */
class BooksFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categorys = ['文芸書','実用書','ビジネス書','児童書','専門書'];
        return [
            //
            'title' => $this -> faker->lastName,
            'content' => $this -> faker-> city,
            'category' => $this -> faker -> randomElement($categorys)
        ];
    }
}
