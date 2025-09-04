import CreateWorkspaceForm from '@/components/workspace/create-workspace-form'
import React from 'react'
import { getUserWorkspace } from '../workspace/get-user-workspace'
import { redirect } from 'next/navigation';

const page = async() => {
  const { data } = await getUserWorkspace();
  console.log("Workspace data:", data);
  
  if(!data?.onboardingCompleted) redirect('/onboarding')
  return (
    <div>
      <CreateWorkspaceForm/>
    </div>
  )
}
export default page  