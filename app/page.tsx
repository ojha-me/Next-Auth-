import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<main className="h-full flex flex-col justify-center items-center bg-gradient-to-r from-[#020024] via-[#cc422e] to-[#00d4ff]">
			<div className="space-y-6">
				<div className="text-6xl font-bold text-white"> Auth</div>
				<div className="text-xl text-white">Simple Auth</div>
			</div>
			<div>
				<LoginButton>
					<Button variant="secondary" size="lg">
						Sign Up
					</Button>
				</LoginButton>
			</div>
		</main>
	);
}
