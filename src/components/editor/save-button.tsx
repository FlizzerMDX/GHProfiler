"use client"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { downloadEditingFile } from "@/services/download"
import { pushReadmeToGithub } from "@/services/github"
import { Session, User } from "@/types"
import {
  ChevronDownIcon,
  DownloadIcon,
  ShareIcon,
} from "lucide-react"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { OctokitResponse } from "@octokit/types";

export function SaveButton({editorRef}: {editorRef: any}) {

  const { data: session } = useSession();
  const [user, setUser] = useState<User>(session?.user as User);
  const [username, setUsername] = useState<string>(user.username);
  const [token, setToken] = useState<string>((session as Session)?.accessToken);
  const [isPushing, setIsPushing] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  return (
    <ButtonGroup>
      <Button variant="outline" disabled={isPushing} onClick={() => {
          setIsPushing(true);
          toast.promise<{ data: OctokitResponse<any, number> | undefined }>(
            () =>
              new Promise(async(resolve) =>{
                const data = await pushReadmeToGithub({markdown: editorRef.exportToMarkdown(), user, token});
                resolve(data?.data);
              }),
            {
              loading: "Loading...",
              success: (data) => {console.log(data); setIsPushing(false); return `Changes has been pushed`},
              error: "Error",
            }
          )
          // pushReadmeToGithub({markdown: editorRef.exportToMarkdown(), user, token})
        }}>
        <ShareIcon />
        Upload to GitHub
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="pl-2!" disabled={isPushing}>
            <ChevronDownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => {downloadEditingFile(editorRef, user)}}>
              <DownloadIcon />
              Download File
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}
