import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { HiOutlineTrash } from 'react-icons/hi'

const RemoveBtn = ({ id }: { id: string }) => {
  const router = useRouter();

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
      router.refresh();   
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
