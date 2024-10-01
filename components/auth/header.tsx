import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
	subsets: ["latin"],
	weight: ["600"],
});

interface HeaderProps {
	label: string;
}

export function Header({ label }: HeaderProps) {
	return (
		<div className="w-full flex flex-col space-x-4  items-center">
			<h1 className={cn("text-3xl font-semibold", font.className)}>Auth</h1>
			<p className="text-sm text-muted-foreground">{label}</p>
		</div>
	);
}
