<?php

namespace App\Http\Controllers;

use App\Models\Books;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class BooksController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $books = Books::all();
        $booksPaginator = Books::paginate(10);
        // dd($usersPaginator);
        return Inertia::render('Books/Index',['message' => session('message'), 'booksPaginator' => $booksPaginator]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request-> validate([
            'title' => 'required|max:20',
            'content' => 'required|max:100',
            'category' => 'required|max:10',
            'price' => 'required|numeric|min:0'
        ]);
        $book = new Books($request->input());
        Log::info($book);
        $book->save();
        return redirect('books')->with([
            'message' => '登録しました',
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            
        ]);

        $book = Books::find($id);
        Log::info($book);
        $book->fill($request->input())->saveOrFail();
        return redirect('books')->with([
            'message' => '更新しました',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $book = Books::find($id);
        $book->delete();
        return redirect('books')->with([
            'message' => '削除しました',
        ]);        
    }
}
