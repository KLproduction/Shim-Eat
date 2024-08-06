import { Resend } from "resend";
import { db } from "./db";

const resend = new Resend(process.env.RESEND_API_KEY);

const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_PRODUCTION_URL
    : process.env.NEXT_PUBLIC_SERVER_URL;

export const sendVerificationEmail = async (
  email: string,
  token: string,
  userId?: string,
) => {
  const confirmLink = `${baseURL}/auth/new-verification?token=${token}&id=${userId}`;

  await resend.emails.send({
    from: "mail@shimgsolution.com",
    to: email,
    subject: "Confirm your email",
    html: `<head>
        <style>
            body {
                background-color: #f4f4f4;
                font-family: Arial, sans-serif;
                line-height: 1.6;
                padding: 20px;
            }
            .container {
                background-color: #ffffff;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .button {
                display: block;
                width: 200px;
                margin: 20px auto;
                padding: 10px;
                text-align: center;
                color: #333;
                text-decoration: none;
                border-radius: 5px;
            }
            .footer {
                text-align: center;
                font-size: 12px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Confirm Your Email</h2>
            <p>Please click the button below to verify your email address and activate your account:</p>
            <a href="${confirmLink}" class="button">Confirm Email</a>
            <p>If you did not request this, please ignore this email.</p>
            <p class="footer">Thank you!<br>Shimg Solutions Team</p>
        </div>
    </body>`,
  });
};
export const sendPasswordResentEmail = async (email: string, token: string) => {
  const resetLink = `${baseURL}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "mail@shimgsolution.com",
    to: email,
    subject: "Reset your password",
    html: `<head>
        <style>
            body {
                background-color: #f4f4f4;
                font-family: Arial, sans-serif;
                line-height: 1.6;
                padding: 20px;
            }
            .container {
                background-color: #ffffff;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .button {
                display: block;
                width: 200px;
                margin: 20px auto;
                padding: 10px;
                text-align: center;
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
            }
            .footer {
                text-align: center;
                font-size: 12px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Reset Your Password</h2>
            <p>To reset your password, please click the button below. This link will expire in 10 mins.</p>
            <a href="${resetLink}" class="button">Reset Password</a>
            <p>If you did not request a password reset, please ignore this email or contact support.</p>
            <p class="footer">Thank you!<br>Shimg Solutions Team</p>
        </div>
    </body>`,
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "mail@shimgsolution.com",
    to: email,
    subject: "2FA Code",
    html: `<head>
        <style>
            body {
                background-color: #f4f4f4;
                font-family: 'Arial', sans-serif;
                line-height: 1.6;
                padding: 20px;
            }
            .container {
                background-color: #ffffff;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .code {
                display: block;
                width: fit-content;
                margin: 20px auto;
                padding: 20px;
                font-size: 24px;
                font-weight: bold;
                color: #333;
                background-color: #eef;
                border-radius: 5px;
                border: 1px solid #ddd;
                text-align: center;
            }
            .footer {
                text-align: center;
                font-size: 12px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Your Two-Factor Authentication (2FA) Code</h2>
            <p>Please use the following code to complete your sign-in process. This code is valid for only 5 minutes:</p>
            <div class="code">${token}</div>
            <p>If you did not initiate this request, please secure your account immediately.</p>
            <p class="footer">Shimg Solutions Team</p>
        </div>
    </body>`,
  });
};
