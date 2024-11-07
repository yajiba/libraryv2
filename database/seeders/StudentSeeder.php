<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Models\Student;
use App\Models\Department;

class StudentSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        // Assuming you have a Department model, so you can associate students with random departments
        $departments = Department::all();

        foreach (range(1, 5000) as $index) {
            $student = new Student();
            $student->first_name = $faker->firstName;
            $student->last_name = $faker->lastName;
            $student->middle_name = $faker->optional()->firstName;
            $student->department_id = $faker->randomElement($departments)->id;
            $student->email = $faker->unique()->safeEmail;
            $student->date_of_birth = $faker->date();
            $student->gender = $faker->randomElement(['Male', 'Female', 'Other']);
            $student->mobile_number = $faker->phoneNumber;
            $student->address = $faker->address;
            $student->status = $faker->randomElement([0, 1]); // 0 for inactive, 1 for active
            $student->save();
        }
    }
}
