import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import User from "@/models/userModel";

export async function sendMail(
  email: string,
  emailType: "VERIFY" | "FORGET",
  userId: number | string
) {
  try {
    const token = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      //update verify token
      await User.findByIdAndUpdate(userId, {
        verifyToken: token,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "FORGET") {
      //update forget token
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    console.log(typeof process.env.EMAIL_USER, process.env.EMAIL_PASSWORD);

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "751b1b32833d1a",
        pass: "5d747c2ae80b85",
      },
    });

    await transport.sendMail({
      from: "ananthuk.krish@gmail.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify Email" : "Forget Password",
      html: `<p>please click the link ${
        emailType === "VERIFY" ? "verify email" : "reset your password"
      }<a href="${
        process.env.DOMAIN
      }/verifyemail?token=${token}" target="_blank">Link</a></p>`,
    });
  } catch (error) {
    console.log(error);
  }
}
