import connectMongo from "@/libs/mongoose";
import Todo from "@/models/todo";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        await connectMongo();
        const todo = await Todo.findById(id);
        if (!todo) {
            throw new Error("Todo Not Found")
        }

        const { title, description }: {
            title: string;
            description: string
        } = await request.json();

        const updatedTodo = await Todo.findByIdAndUpdate(id, { title, description });

        return NextResponse.json({
            message: "Todos Updated Successfully",
            todo: updatedTodo
        })
    } catch (error) {
        return NextResponse.json({
            message: "Something went wrong",
            error
        }, { status: 400 })
    }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        await connectMongo();
        const todo = await Todo.findById(id);
        if (!todo) {
            throw new Error("Todo Not Found")
        }

        return NextResponse.json({
            message: "Todos Fetched Successfully",
            todo
        })
    } catch (error) {
        return NextResponse.json({
            message: "Something went wrong",
            error
        }, { status: 400 })
    }
}