"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  useEffect(() => setMounted(true), [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!title || !description) {
        throw new Error("Please fill the title and description")
      }
      const baseUrl = window.location.origin;
      const response = await axios.post(`${baseUrl}/api/todos`, {
        title,
        description
      })
      if (!response.status.toString().startsWith("2")) {
        throw new Error("Error : Something went wrong")
      }
      if (mounted) {
        router.push("/");
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form className='flex flex-col gap-3 mt-2' onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Todo Title"
        required
        className="border border-slate-500 py-3 px-8"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <input
        type="text"
        placeholder="Todo Description"
        required
        className="border border-slate-500 py-3 px-8"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <button
        type="submit"
        className="bg-blue-600 font-bold text-white py-3 hover:brightness-125"
      >Add Todo</button>
    </form>
  )
}

export default AddTodo
