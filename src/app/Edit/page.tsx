"use client";
import type { NextPage } from 'next'
import { useSession } from "next-auth/react"
import { Editor } from '@/components/editor/editor';
import { useEffect, useRef, useState } from 'react';
import { getReadmeContent, getReadmeRepo } from '@/services/github';

import { User, Session } from '@/types/index';
import { ShadcnTemplateRef } from '@/components/editor';

const Edit: NextPage = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<User>(session?.user as User);
  const [username, setUsername] = useState<string>(user?.username);

  const editorRef = useRef<ShadcnTemplateRef>(null);

  useEffect(() =>{
    const call = async() =>{
      const userSession = session as Session;
      const repo = await getReadmeRepo(username, userSession?.accessToken);
      if (repo?.data){
        const data = await getReadmeContent(username, userSession?.accessToken);
        const markdown = data?.success ? data?.content : "";
        editorRef?.current?.injectMarkdown(markdown);
      }
    };
    call();
  }, [])

  return (
    <div>
        {
            session && session.user ?
                <Editor ref={editorRef}/>
                :
                <span>You need to be authenticated to watch this page</span>
        }
    </div>
  )
}

export default Edit;