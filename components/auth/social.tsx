"use client";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { defaultRedirect } from "@/routes";

// import { signIn } from "next-auth/react" if you want to use in purely client side
import { signIn } from "next-auth/react";

export function Social() {
	const handleSignIn = (provider: string) => {
		signIn(provider);
	};
	return (
		<div className="flex  items-center  space-x-4 w-full">
			<Button
				size="lg"
				variant="outline"
				className="w-full"
				onClick={() => handleSignIn("google")}
			>
				<FcGoogle />
			</Button>

			<Button
				size="lg"
				variant="outline"
				className="w-full"
				onClick={() => handleSignIn("github")}
			>
				<FaGithub />
			</Button>
		</div>
	);
}
