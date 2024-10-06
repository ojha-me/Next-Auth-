"use client";

import { useEffect, useState, useCallback } from "react";
import { CardWrapper } from "./card-wrapper";
import { Progress } from "@/components/ui/progress";
import { newVerification } from "@/actions/new-verification";
import { useSearchParams } from "next/navigation";

export const NewVerificationForm = () => {
	const [progress, setProgress] = useState(0);
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const onSubmit = useCallback(async () => {
		if (token) {
			await newVerification(token);
		}
	}, [token]);

	useEffect(() => {
		onSubmit();
		setProgress(100);
	}, [onSubmit]);

	return (
		<CardWrapper
			headerLabel="Confirming your verification"
			backButtonLabel="Back to login"
			backButtonHref="/login"
		>
			<Progress value={progress} className="w-full" />
			{progress === 100 && (
				<p className="text-center text-sm text-green-600 mt-2">
					Verification complete!
				</p>
			)}
		</CardWrapper>
	);
};
