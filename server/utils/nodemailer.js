import nodemailer from "nodemailer";
import dotenv from "dotenv";

export const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: 'tecpools@outlook.com',
        pass: 't3st1nG!',
    },
});

