import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  phone: z.string().min(10, "Phone number must be at least 10 digits."),
  email: z.string().email("Please enter a valid email address."),
  query: z.string().min(10, "Query must be at least 10 characters."),
  honeypot: z.string().max(0, "This field should remain empty."),
  timestamp: z.number(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = formSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid form data", errors: result.error.errors },

        { status: 400 }
      );
    }

    const { name, phone, email, query, honeypot, timestamp } = result.data;

    if (honeypot !== "") {
      return NextResponse.json(
        { message: "Bot submission detected" },

        { status: 400 }
      );
    }

    const submissionTime = Date.now() - timestamp;

    if (submissionTime < 5000) {
      return NextResponse.json(
        { message: "Submission too quick, possible bot detected" },

        { status: 400 }
      );
    }
    const data = await resend.emails.send({
      from: "Largs Piano Lessons <contact@colinyoung.scot>",
      to: "colin@colinyoung.scot",
      subject: "New Contact Form Submission",
      text: `
        Name: ${name}
        Phone: ${phone}
        Email: ${email}
        Query: ${query}
      `,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Query:</strong> ${query}</p>
      `,
    });

    return NextResponse.json(
      { message: "Email sent successfully", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing form submission:", error);
    return NextResponse.json(
      { message: "Error processing form submission" },
      { status: 500 }
    );
  }
}
