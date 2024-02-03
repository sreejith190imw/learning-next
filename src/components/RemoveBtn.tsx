import { deleteTodo } from '@/redux/slices/todoSlice'
import axios from 'axios'
import React from 'react'
import { HiOutlineTrash } from 'react-icons/hi'
import { useDispatch } from 'react-redux'

const RemoveBtn = ({ id }: { id: string }) => {
  const dispatch = useDispatch();
  const handleClick = async () => {
    const confirmed = confirm("Are you sure you want to delete it?")
    if (!confirmed) {
      return;
    }
    try {
      const baseUrl = window.location.origin;
      const response = await axios.delete(`${baseUrl}/api/todos?id=${id}`);
      if (!response.status.toString().startsWith("2")) {
        throw new Error("Error : Something went wrong")
      }      
      dispatch(deleteTodo(id));
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <button className='text-red-600' onClick={handleClick}>
      <HiOutlineTrash size={24} />
    </button>
  )
}

export default RemoveBtn
