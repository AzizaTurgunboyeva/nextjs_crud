import React from 'react'
import TeachersTable from './components/TeachersTable'
import { Button } from '@/components'
import { useRouter } from 'next/router'
import { TeacherPageWrapper } from './Teachers.styles'

const Teachers = () => {
  const router = useRouter();

  const navigateToCreate = () => router.push('/teachers/create')

  return (
    <TeacherPageWrapper>
      <div className="title-side">
        <h1>Teachers</h1>
        <Button onClick={navigateToCreate}>Add Teacher</Button>
      </div>
      <TeachersTable />
    </TeacherPageWrapper>
  )
}

export default Teachers