import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
	error?: string;
}

export function FormError({ error }: FormErrorProps) {
	if (!error) return null;
	return (
		<div className=" w-full flex items-center content-around gap-2 text-black ml-[25%]">
			<ExclamationTriangleIcon className="w-4 h-4 text-red-500" />
			<span className="text-sm text-red-500">{error}</span>
		</div>
	);
}
