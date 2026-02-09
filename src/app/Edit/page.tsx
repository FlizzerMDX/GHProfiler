"use client";
import type { NextPage } from 'next'
import { useSession } from "next-auth/react"
import { Editor } from '@/components/editor/editor';

const Edit: NextPage = () => {
  const { data: session } = useSession()

  return (
    <div>
        {
            session && session.user ?
                <Editor/>
                :
                <span>You need to be authenticated to watch this page</span>
        }
    </div>
  )
}

export default Edit;