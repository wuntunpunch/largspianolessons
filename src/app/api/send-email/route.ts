import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, query } = await request.json();

  try {
    console.log("API Key exists:", !!process.env.RESEND_API_KEY);
    const data = await resend.emails.send({
      from: "Largs Piano Lessons <contact@colinyoung.scot>",
      to: "colin@colinyoung.scot",
      subject: "New Contact Form Submission",
      text: `
        Name: ${name}
        Email: ${email}
        Query: ${query}
      `,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Query:</strong> ${query}</p>
      `,
    });

    return NextResponse.json(
      { message: "Email sent successfully", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Error sending email" },
      { status: 500 }
    );
  }
}
