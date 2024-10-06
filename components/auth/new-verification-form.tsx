"use client";

import { useEffect, useState, useCallback } from "react";
import { CardWrapper } from "./card-wrapper";
import { newVerification } from "@/actions/new-verification";
import { useSearchParams } from "next/navigation";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";

export const NewVerificationForm = () => {
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const onSubmit = useCallback(async () => {
		if (token) {
			await newVerification(token).then((data) => {
				setError(data.error);
				setSuccess(data.success);
			});
		}
	}, [token]);

	useEffect(() => {
		onSubmit();
	}, [onSubmit]);

	return (
		<CardWrapper
			headerLabel="Confirming your verification"
			backButtonLabel="Back to login"
			backButtonHref="/login"
		>
			<FormSuccess success={success} />
			<FormError error={error} />
		</CardWrapper>
	);
};
