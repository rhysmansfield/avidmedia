import { NextResponse } from "next/server";
import { sendEmail } from "@app/utils/send-email";

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  if (!name) {
    return NextResponse.json(
      { message: "Ensure you have entered your name" },
      { status: 400 }
    );
  }

  if (!email || !email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
    return NextResponse.json(
      { message: "Ensure you have entered a valid email address" },
      { status: 400 }
    );
  }

  if (!message) {
    return NextResponse.json(
      { message: "Ensure you have entered a message" },
      { status: 400 }
    );
  }

  const internalBody = `
    <p>There has been a new contact form enquiry on the website</p>
    <ul>
      <li>
        <p>Name</p> 
        <p>${name}</p>
      </li>
      <li>
        <p>Email</p> 
        <p>${email}</p>
      </li>
      <li>
      <p>Message</p> 
      <p>${message}</p>
    </li>
    </ul>
  `;

  const externalBody = `
    <h1>We have received your message!</h1>
    <p>We're just letting you know that we've received your enquiry and we will be in touch shortly.</p>
    <h3>Your enquiry:</h3>
    <p>Some test enquiry goes here</p>
    <p>Thanks,<br/>Avid Media Team</p>
  `;

  try {
    // Customer email
    await sendEmail({
      to: email,
      subject: "We have received your message!",
      html: externalBody,
    });

    // Internal email
    await sendEmail({
      to: "info@avidmedia.io",
      subject: "avidmedia.io: New contact form enquiry",
      html: internalBody,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "There was an issue sending your message, please try again!" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Your message has been sent!" },
    { status: 200 }
  );
}