import {
    PASSWORD_RESET_REQUEST_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE,
    VERIFICATION_EMAIL_TEMPLATE,
    WELCOME_EMAIL_TEMPLATE,
    COMMENT_NOTIFICATION_TEMPLATE,
    CONNECTION_ACCEPTED_TEMPLATE
} from "./emailTemplates.js";
import transporter from "./nodemailer.config.js";
export const sendVerificationEmail = async (email, username, verificationToken) => {
    
    try {
        const response = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE(username, verificationToken),
           
        });

        console.log("Email sent successfully", response);
    } catch (error) {
        console.error(`Error sending verification`, error);

        throw new Error(`Error sending verification email: ${error}`);
    }
};

export const sendWelcomeEmail = async (email, username, profileUrl) => {
    

    try {
        const response = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Welcome to Tech Connect",
            html: WELCOME_EMAIL_TEMPLATE(username, profileUrl),
            
        });

        console.log("Welcome email sent successfully", response);
    } catch (error) {
        console.error(`Error sending welcome email`, error);

        throw new Error(`Error sending welcome email: ${error}`);
    }
};

export const sendPasswordResetEmail = async (email, username, resetURL) => {
   

    try {
        const response = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE(username, resetURL),
            
        });
    } catch (error) {
        console.error(`Error sending password reset email`, error);

        throw new Error(`Error sending password reset email: ${error}`);
    }
};

export const sendResetSuccessEmail = async (email, username) => {

    try {
        const response = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE(username),
            
        });

        console.log("Password reset email sent successfully", response);
    } catch (error) {
        console.error(`Error sending password reset success email`, error);

        throw new Error(`Error sending password reset success email: ${error}`);
    }
};

export const sendCommentNotificationEmail = async (recipientEmail, recipientName, commenterName, postUrl, commentContent) => {
    try {
        const response = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: recipientEmail,
            subject: "Password Reset Successful",
            html: COMMENT_NOTIFICATION_TEMPLATE(recipientName, commenterName, postUrl, commentContent),
            
        });

        console.log("Password reset email sent successfully", response);
    } catch (error) {
        console.error(`Error sending password reset success email`, error);

        throw new Error(`Error sending password reset success email: ${error}`);
    }
};

export const sendConnectionAcceptedEmail = async (senderEmail, senderName, recipientName, profileUrl) => {
	

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: senderEmail,
			subject: `${recipientName} accepted your connection request`,
			html: CONNECTION_ACCEPTED_TEMPLATE(senderName, recipientName, profileUrl),
			category: "connection_accepted",
		});
	} catch (error) {}
};