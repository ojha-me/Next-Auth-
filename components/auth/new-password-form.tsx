"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { newPasswordSchema } from "@/schemas";
import { z } from "zod";
import { useState, useTransition } from "react";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { newPassword } from "@/actions/reset-password";
import { useRouter, useSearchParams } from "next/navigation";

export const NewPasswordForm = () => {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const searchParams = useSearchParams();
	const token = searchParams.get("token");
	const router = useRouter();

	const form = useForm<z.infer<typeof newPasswordSchema>>({
		resolver: zodResolver(newPasswordSchema),
		defaultValues: {
			newPassword: "",
			confirmNewPassword: "",
		},
	});

	const onSubmit = (values: z.infer<typeof newPasswordSchema>) => {
		// setError("");
		setSuccess("");

		startTransition(async () => {
			await newPassword(token as string, values).then((data) => {
				setError(data?.error);
				setSuccess(data?.success);
				if (data?.success) {
					router.push("/settings");
				}
			});
		});
	};
	return (
		<CardWrapper
			headerLabel="Enter your new password"
			backButtonLabel="Back to sign in"
			backButtonHref="/sign-in"
			showSocial={false}
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<FormField
						control={form.control}
						name="newPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>New Password</FormLabel>
								<FormControl>
									<Input {...field} type="password" disabled={isPending} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="confirmNewPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm New Password</FormLabel>
								<FormControl>
									<Input {...field} type="password" disabled={isPending} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormError error={error} />
					<FormSuccess success={success} />
					<Button type="submit" className="w-full" disabled={isPending}>
						Reset Password
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};
