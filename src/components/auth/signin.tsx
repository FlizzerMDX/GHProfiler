"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { Github } from "lucide-react";
import { cn } from "@/lib/utils";

export const SignIn = ({className}: {className: string}) => {
	return (
		<div className={cn("flex items-center gap-1.5", className)}>
			<Button onClick={() => signIn("github", { redirectTo: "/edit" })}>
				<Github/>
				<span>
					Sign in with GitHub
				</span>
			</Button>
		</div>
	);
};