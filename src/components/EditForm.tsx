"use client";

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface Todo {
    _id: string;
    title: string;
    description: string;
}

const EditForm = ({ id }: { id: string }) => {
    const [todo, setTodo] = useState<Todo>({
        _id: '',
        title: '',
        description: ''
    });
    const router = useRouter();

    useEffect(() => {
        const fetchTodo = async () => {
            const baseUrl = window.location.origin;
            const response = await axios.get(`${baseUrl}/api/todos/${id}`, {
                headers: {
                    'Cache-Control': 'no-store'
                }
            });

            if (!response.status.toString().startsWith("2")) {
                throw new Error("Error : Something went wrong")
            }
            setTodo(response.data.todo);
        }
        fetchTodo();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        setTodo({
            ...todo,
            [name]: value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const baseUrl = window.location.origin;
        const response = await axios.put(`${baseUrl}/api/todos/${id}`, {
            title: todo.title,
            description: todo.description
        });

        if (!response.status.toString().startsWith("2")) {
            throw new Error("Error : Something went wrong")
        }

        router.push("/");
    }

    return (
        <form className='flex flex-col gap-3 mt-2' onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Todo Title"
                required
                name='title'
                value={todo.title}
                onChange={handleChange}
                className="border border-slate-500 py-3 px-8"
            />
            <input
                type="text"
                placeholder="Todo Description"
                required
                name='description'
                value={todo.description}
                onChange={handleChange}
                className="border border-slate-500 py-3 px-8"
            />
            <button
                type='submit'
                className="bg-green-600 font-bold text-white py-3 hover:brightness-125"
            >Update Todo</button>
        </form>
    )
}

export default EditForm
