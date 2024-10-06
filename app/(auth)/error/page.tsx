import { CardWrapper } from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export default function ErrorPage() {
	return (
		<div>
			<CardWrapper
				headerLabel=""
				backButtonHref="/sign-in"
				backButtonLabel="Something went wrong!! Go back to sign in"
			>
				<ExclamationTriangleIcon className="w-full h-10 text-red-500 flex justify-center items-center" />
			</CardWrapper>
		</div>
	);
}
