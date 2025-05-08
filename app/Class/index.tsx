import React from 'react'
import TeachersTable from './components/ClassesTable'
import { Button } from '@/components'
import { useRouter } from 'next/router'
import { ClassPageWrapper } from './Classes.styles'
import ClassesTable from './components/ClassesTable'

const Classes = () => {
  const router = useRouter();

  const navigateToCreate = () => router.push('/classes/create')

  return (
    <ClassPageWrapper>
      <div className="title-side">
        <h1>Classes</h1>
        <Button onClick={navigateToCreate}>Add Class</Button>
      </div>
      <ClassesTable/>
    </ClassPageWrapper>
  );
}

export default Classes