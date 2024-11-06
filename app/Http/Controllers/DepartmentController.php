<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    public function list() {
        return Inertia::render(
            'Department/List'
        );
    }
}
