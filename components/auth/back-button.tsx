import Link from "next/link";
import { Button } from "../ui/button";

interface BackButtonProps {
	label: string;
	href: string;
}

export function BackButton({ label, href }: BackButtonProps) {
	return (
		<Button variant="link" size="sm" className="w-full" onClick={() => {}}>
			<Link href={href}>{label}</Link>
		</Button>
	);
}
