<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Student;
use App\Models\Department;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function list()
    {
        $data = Department::all();
        return Inertia::render(
            'Student/List',
            ['departments' => $data]
        );
    }
    public function student_datatable()
    {
        $data = Student::with('department')->get();

        return response()->json($data);
    }
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255|regex:/^[A-Za-z\s]+$/', // Allow only letters and spaces
            'last_name' => 'required|string|max:255|regex:/^[A-Za-z\s]+$/', // Allow only letters and spaces
            'middle_name' => 'nullable|string|regex:/^[A-Za-z\s]*$/|max:255', // Allow multiple letters/spaces, not required
            'date_of_birth' => 'required|date|before:today', // Ensure date is before today
            'department_id' => 'required|exists:departments,id|numeric', // Check if department exists
            'mobile_number' => 'required|numeric|digits_between:10,15', // Mobile number length validation
            'address' => 'required|string|max:500', // Limit address length
            'email' => 'required|email|unique:students,email|max:255', // Ensure email is unique and length is limited
            'gender' => 'required|string|in:Male,Female,Other', // Restrict gender to specific options
        ]);
        $data = $request->all();
        $data['status'] = 1; // Set default status

        // Create the student record
        $insert = Student::create($data);
        if($insert) {
            return response()->json(['status'=> 'success', 'message' => 'Successfully Added Student!'], 200);
        }else {
            return response()->json(['status'=> 'eroor', 'message' => 'Successfully Added Student!'], 422);

        }


    }

}
