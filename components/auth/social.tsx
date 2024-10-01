"use client";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";

export function Social() {
	return (
		<div className="flex  items-center  space-x-4 w-full">
			<Button size="lg" variant="outline" className="w-full" onClick={() => {}}>
				<FcGoogle />
			</Button>

			<Button size="lg" variant="outline" className="w-full" onClick={() => {}}>
				<FaGithub />
			</Button>
		</div>
	);
}
