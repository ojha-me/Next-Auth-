import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
	const confirmationUrl = `http://localhost:3000/new-verification?token=${token}`;

	resend.emails.send({
		from: "onboarding@resend.dev",
		to: email,
		subject: "Verify your email",
		html: `<p>Click <a href="${confirmationUrl}">here</a> to verify your email`,
	});
}

export async function sendPasswordResetEmail(email: string, token: string) {
	const resetUrl = `http://localhost:3000/new-password?token=${token}`;

	resend.emails.send({
		from: "onboarding@resend.dev",
		to: email,
		subject: "Reset your password",
		html: `<p>Click <a href="${resetUrl}">here</a> to reset your password`,
	});
}
