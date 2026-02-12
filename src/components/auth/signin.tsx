"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { Github } from "lucide-react";

export const SignIn: React.FC = () => {
	return (
		<div className="flex items-center gap-1.5">
			{/* <span onClick={() => signIn("github", { redirectTo: "/Edit" })} className="text-muted-foreground hover:text-foreground hover:cursor-pointer font-medium">
                Sign In
            </span> */}
			<Button onClick={() => signIn("github", { redirectTo: "/Edit" })}>
				<Github/>
				<span>
					Sign in with GitHub
				</span>
			</Button>
		</div>
	);
};