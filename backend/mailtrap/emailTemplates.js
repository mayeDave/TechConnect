export const VERIFICATION_EMAIL_TEMPLATE = (username, verificationToken) => `
<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(to right, #1e3a8a, #2563eb); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
      <img src="https://yourtechconnectlogo.com/logo.png" alt="Tech Connect Logo" style="width: 150px; margin-bottom: 20px; border-radius: 10px;">
      <h1 style="color: white; margin: 0; font-size: 28px;">Verify Your Email</h1>
    </div>
    <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      <p style="font-size: 18px; color: #1e3a8a;"><strong>Hello ${username},</strong></p>
      <p>Thank you for signing up with Tech Connect! To complete your registration, please use the verification code below:</p>
      <div style="text-align: center; margin: 30px 0;">
        <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #1e3a8a;">${verificationToken}</span>
      </div>
      <p>Please enter this code on the verification page to activate your account.</p>
      <p><strong>Note:</strong> This code will expire in 15 minutes for security reasons.</p>
      <p>If you didn’t create an account with us, you can safely ignore this email.</p>
      <p>Best regards,<br>The Tech Connect Team</p>
    </div>
    <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
      <p>This is an automated message. Please do not reply to this email.</p>
    </div>
  </body>
  </html>
  `;

export const WELCOME_EMAIL_TEMPLATE = (username, profileUrl) => `
<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Tech Connect</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(to right, #1e3a8a, #2563eb); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
      <img src="https://yourtechconnectlogo.com/logo.png" alt="Tech Connect Logo" style="width: 150px; margin-bottom: 20px; border-radius: 10px;">
      <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Tech Connect!</h1>
    </div>
    <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      <p style="font-size: 18px; color: #1e3a8a;"><strong>Hello ${username},</strong></p>
      <p>We’re excited to welcome you to Tech Connect, the ultimate platform for tech enthusiasts to connect, collaborate, and grow!</p>
      <div style="background-color: #f3f6f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="font-size: 16px; margin: 0;"><strong>Here’s how to get started:</strong></p>
        <ul style="padding-left: 20px;">
          <li>Complete your profile to showcase your skills and interests.</li>
          <li>Connect with like-minded tech professionals.</li>
          <li>Join communities and participate in discussions.</li>
          <li>Stay updated with the latest tech news and resources.</li>
        </ul>
      </div>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${profileUrl}" style="background-color: #1e3a8a; color: white; padding: 14px 28px; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 16px; transition: background-color 0.3s;">Complete Your Profile</a>
      </div>
      <p>If you have any questions or need assistance, feel free to reach out to our support team at <a href="mailto:support@techconnect.com" style="color: #2563eb; text-decoration: none;">support@techconnect.com</a>.</p>
      <p>Best regards,<br>The Tech Connect Team</p>
    </div>
  </body>
  </html>
  `;

  export const PASSWORD_RESET_SUCCESS_TEMPLATE = ( username ) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Successful</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(to right, #1e3a8a, #2563eb); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
      <img src="https://yourtechconnectlogo.com/logo.png" alt="Tech Connect Logo" style="width: 150px; margin-bottom: 20px; border-radius: 10px;">
      <h1 style="color: white; margin: 0; font-size: 28px;">Password Reset Successful</h1>
    </div>
    <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      <p style="font-size: 18px; color: #1e3a8a;">Hello, ${username}</p>
      <p>We're writing to confirm that your password has been successfully reset for your Tech Connect account.</p>
      <div style="text-align: center; margin: 30px 0;">
        <div style="background-color: #22c55e; color: white; width: 60px; height: 60px; line-height: 60px; border-radius: 50%; display: inline-block; font-size: 30px;">
          ✓
        </div>
      </div>
      <p>If you did not initiate this password reset, please contact our support team immediately.</p>
      <p><strong>For security reasons, we recommend the following:</strong></p>
      <ul style="padding-left: 20px;">
        <li>Use a strong, unique password</li>
        <li>Enable two-factor authentication in your account settings</li>
        <li>Avoid using the same password across multiple platforms</li>
      </ul>
      <p>Thank you for helping us keep your account secure.</p>
      <p>Best regards,<br>The Tech Connect Team</p>
    </div>
    <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
      <p>This is an automated message. Please do not reply to this email.</p>
    </div>
  </body>
  </html>
  `;
  

  export const PASSWORD_RESET_REQUEST_TEMPLATE = ( username, resetURL ) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(to right, #1e3a8a, #2563eb); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
      <img src="https://yourtechconnectlogo.com/logo.png" alt="Tech Connect Logo" style="width: 150px; margin-bottom: 20px; border-radius: 10px;">
      <h1 style="color: white; margin: 0; font-size: 28px;">Password Reset</h1>
    </div>
    <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      <p style="font-size: 18px; color: #1e3a8a;">Hello, ${username}</p>
      <p>We received a request to reset your password for your Tech Connect account. If you didn't make this request, you can safely ignore this email.</p>
      <p>To reset your password, click the button below:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetURL}" style="background-color: #1e3a8a; color: white; padding: 14px 28px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">Reset Password</a>
      </div>
      <p>This link will expire in 1 hour for security reasons.</p>
      <p>Best regards,<br>The Tech Connect Team</p>
    </div>
    <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
      <p>This is an automated message. Please do not reply to this email.</p>
    </div>
  </body>
  </html>
  `;
  