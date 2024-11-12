<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Department;
use Illuminate\Validation\Rule;

class DepartmentController extends Controller
{
    public function list() { 
        return Inertia::render(
            'Department/List'
        );
    }

    public function datatable() {
        $data = Department::all();
        return response()->json($data);
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|regex:/^[A-Za-z\s]+$/|unique:departments,name', // Allow only letters and spaces
            'full_name' => 'required|string|max:255|regex:/^[A-Za-z\s]+$/|unique:departments,full_name', // Allow only letters and spaces
        ]);
        
        $data = $request->all();
        $data['status'] = 1; // Set default status
        
        // Create the department record
        $insert = Department::create($data);
        
        if ($insert) {
            return response()->json(['status' => 'success', 'message' => 'Successfully Added Department!'], 200);
        } else {
            return response()->json(['status' => 'error', 'message' => 'Failed to Add Department!'], 422);
        }
    }
    public function update(Request $request){
        $department = Department::find($request->input('id'));
        $validate = $request->validate([
            'name' => ['required','string','max:255','regex:/^[A-Za-z\s]+$/',Rule::unique('departments', 'name')->ignore($department->id)], // Allow only letters and spaces
            'full_name' => ['required','string','max:255','regex:/^[A-Za-z\s]+$/',Rule::unique('departments', 'full_name')->ignore($department->id)], // Allow only letters and spaces  
        ]);

        $update = $department->update($validate);

         if($update) {
             return response()->json(['status'=> 'success', 'message' => 'Department Successfully updated'], 200);
         }else {
            return response()->json(['status'=> 'error', 'message' => 'Error when adding data'], 500);
         }
    }

    public function update_status($id){
        $student = Department::find($id);
        $student->status = ($student->status == 1)?  0: 1;
        $student->save();
    }
}
