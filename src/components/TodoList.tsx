"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { HiPencilAlt } from 'react-icons/hi';
import RemoveBtn from './RemoveBtn';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addTodos } from '@/redux/slices/todoSlice';
import Paginate from './Paginate';
import { useSearchParams } from 'next/navigation';

interface Todo {
    _id: string;
    title: string;
    description: string;
}

const TodoList = () => {
    const searchParams = useSearchParams();
    const dispatch = useDispatch();
    const todos = useSelector((state: any) => state.todos);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(2);

    const handleClick = () => {        
        searchParams.get('page') && setPage(Number(searchParams.get('page')));
        searchParams.get('limit') && setLimit(Number(searchParams.get('limit')));
    }

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const baseUrl = window.location.origin;
                console.log(`${baseUrl}/api/todos?page=${page}&limit=${limit}`);
                
                const response = await axios.get(`${baseUrl}/api/todos?page=${page}&limit=${limit}`, {
                    headers: {
                        'Cache-Control': 'no-store'
                    }
                });
                if (!response.data) {
                    throw new Error("Failed to fetch data");
                }
                setTotal(Number(response.data.total));
                dispatch(addTodos(response.data.todos));
            } catch (error) {
                console.log(error)
            }
        }
        fetchTodos();
    }, [dispatch, page, limit]);

    return (
        <>
            {
                todos.length > 0 && todos.map((todo: any) => <Todo key={todo._id} todo={todo} />)
            }
            {
                total > 0 && (
                    <Paginate limit={2} total={total} clickHandler={handleClick} />
                )
            }
        </>

    )
}


const Todo = ({ todo }: { todo: Todo }) => {
    return (
        <div className='p-4 border border-slate-300 flex justify-between gap-5 items-start'>
            <div>
                <h2 className='font-bold text-2xl'>{todo.title}</h2>
                <div>{todo.description}</div>
            </div>
            <div className='flex gap-2'>
                <RemoveBtn id={todo._id} />
                <Link href={`edit/${todo._id}`}><HiPencilAlt size={24} /></Link>
            </div>
        </div>
    )
}

export default TodoList;
