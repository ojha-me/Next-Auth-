export default function AuthLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<div className="h-full flex items-center justify-center bg-gradient-to-r from-[#020024] via-[#cc422e] to-[#00d4ff] ">
			{children}
		</div>
	);
}
