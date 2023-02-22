import path from "path";
import ejs from "ejs";
import nodemailer from "nodemailer";
import { config } from "config";

type Template = "reset-password-link" | "verification-email";

export interface EmailConfig {
  subject: string;
  to: string;
  template: Template;
  context: { [key: string]: string };
}

const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  auth: {
    user: config.SMTP_USERNAME,
    pass: config.SMTP_PASSWORD,
  },
});

export const sendEmail = async ({
  subject,
  to,
  template,
  context,
}: EmailConfig) => {
  const data = await ejs.renderFile(
    path.join(process.cwd(), "src", "views", `${template}.view.ejs`),
    context
  );

  const mainOptions = {
    subject,
    from: "<noreply@shop.com>",
    to,
    html: data,
  };

  transporter.sendMail(mainOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Message sent: " + info.response);
    }
  });
};
