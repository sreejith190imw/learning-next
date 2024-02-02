import connectMongo from "@/libs/mongoose";
import Todo from "@/models/todo";
import { NextRequest, NextResponse } from "next/server";

interface Todo {
    title: string;
    description: string
}

export async function POST(request: NextRequest) {
    try {
        const { title, description }: Todo = await request.json();
        await connectMongo();
        const newTodo = await Todo.create({ title, description });
        return NextResponse.json({
            message: "New todo created successfully",
            todo: newTodo
        }, { status: 201 })
    } catch (error) {
        return NextResponse.json({
            message: "Something went wrong",
            error
        }, { status: 400 })
    }
}

export async function GET() {
    try {
        await connectMongo();
        const todos = await Todo.find();
        return NextResponse.json({
            message: "Todos Fetched Successfully",
            todos
        })
    } catch (error) {
        return NextResponse.json({
            message: "Something went wrong",
            error
        }, { status: 400 })
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const id = request.nextUrl.searchParams.get('id');
        await connectMongo();
        const todo = await Todo.findById(id);
        if (!todo) {
            throw new Error("Todo Not Found")
        }

        await Todo.findByIdAndDelete(id);

        return NextResponse.json({
            message: "Todo Deleted Successfully",
        })
    } catch (error) {
        return NextResponse.json({
            message: "Something went wrong",
            error
        }, { status: 400 })
    }
}