import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().email({
		message: "Please enter a valid email address",
	}),
	password: z.string(),
});

export const signInSchema = z
	.object({
		fullName: z.string().min(1, {
			message: "Full name is required",
		}),
		email: z.string().email({
			message: "Please enter a valid email address",
		}),
		password: z.string().min(8, {
			message: "Password must be at least 8 characters",
		}),
		confirmPassword: z.string().min(8, {
			message: "Password must be at least 8 characters",
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export const resetPasswordSchema = z.object({
	email: z.string().email({
		message: "Please enter a valid email address",
	}),
});

export const newPasswordSchema = z.object({
	newPassword: z.string().min(8, {
		message: "Password must be at least 8 characters",
	}),
	confirmNewPassword: z.string().min(8, {
		message: "Password must be at least 8 characters",
	}),
});
