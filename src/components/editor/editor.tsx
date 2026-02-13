"use client";

import { Ref, useEffect, useState } from 'react';
import { ShadcnTemplate, ShadcnTemplateRef } from './index'
import { getReadmeContent } from '@/services/github';

export function Editor({markdown, ref, session }: {markdown?: string, ref?: Ref<ShadcnTemplateRef>, session?: any}) {
  useEffect(()=>{
    const call = async() =>{
      const data = await getReadmeContent(session?.user?.username, session?.accessToken);
      const md = data?.success ? data?.content : "";
      ref?.current?.injectMarkdown(md);
    }
    call();
  }, [])

  return (
    <ShadcnTemplate
      onReady={(editor) => {
        if (markdown){
          editor.injectMarkdown(markdown);
        }
      }}
      ref={ref}
      className='bg-[#0d1117]'
    />
  )
}