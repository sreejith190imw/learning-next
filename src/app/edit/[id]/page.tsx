import EditForm from '@/components/EditForm'
import React from 'react'

const EditPage = ({ params }: { params: { id: string } }) => {
  return <EditForm id={ params.id} />
}

export default EditPage
