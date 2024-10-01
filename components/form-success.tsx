import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FormSuccessProps {
	success?: string;
}

export function FormSuccess({ success }: FormSuccessProps) {
	if (!success) return null;
	return (
		<div className=" w-full flex items-center content-around gap-2 text-black ml-[25%]">
			<CheckCircledIcon className="w-4 h-4 text-green-500" />
			<span className="text-sm text-green-500">{success}</span>
		</div>
	);
}
