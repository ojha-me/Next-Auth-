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
