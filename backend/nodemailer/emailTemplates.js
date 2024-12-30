export const VERIFICATION_EMAIL_TEMPLATE = (username, verificationToken) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
  <div style="background: linear-gradient(to right, #1e3a8a, #120934); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
    <img src="https://i.imgur.com/QCNEFSm.jpeg" alt="Tech Connect Logo" style="width: 120px; margin-bottom: 20px; border-radius: 10px;">
    <h1 style="color: white; margin: 0; font-size: 26px; font-weight: bold;">Welcome to Tech Connect</h1>
    <p style="color: #d1d5db; margin-top: 10px; font-size: 16px;">Let’s get you started by verifying your email address.</p>
  </div>
  <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);">
    <p style="font-size: 18px; color: #1e3a8a;"><strong>Hello ${username},</strong></p>
    <p>Thank you for signing up with Tech Connect! To complete your registration, please use the verification code below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="display: inline-block; background-color: #1e3a8a; color: white; padding: 15px 25px; font-size: 28px; font-weight: bold; border-radius: 8px; letter-spacing: 5px;">${verificationToken}</div>
    </div>
    <p style="font-size: 16px;">Enter this code on the verification page to activate your account.</p>
    <p style="font-size: 14px; color: #6b7280;"><strong>Note:</strong> This code will expire in 15 minutes for security reasons.</p>
    <p style="font-size: 16px;">If you didn’t create an account with us, you can safely ignore this email.</p>
    <p style="font-size: 16px; color: #120934; font-weight: bold;">Best regards,<br>The Tech Connect Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 0.85em;">
    <p>This is an automated message. Please do not reply to this email.</p>
    <p>© 2024 Tech Connect. All rights reserved.</p>
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
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
  <div style="background: linear-gradient(to right, #1e3a8a, #120934); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
    <img src="https://i.imgur.com/QCNEFSm.jpeg" alt="Tech Connect Logo" style="width: 120px; margin-bottom: 20px; border-radius: 10px;">
    <h1 style="color: white; margin: 0; font-size: 26px; font-weight: bold;">Welcome to Tech Connect!</h1>
    <p style="color: #d1d5db; margin-top: 10px; font-size: 16px;">Where tech minds meet and grow together.</p>
  </div>
  <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);">
    <p style="font-size: 18px; color: #1e3a8a;"><strong>Hello ${username},</strong></p>
    <p>We’re thrilled to welcome you to <strong>Tech Connect</strong>, the premier platform for tech enthusiasts to connect, collaborate, and grow!</p>
    <div style="background-color: #f3f6f8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 5px solid #1e3a8a;">
      <p style="font-size: 16px; margin: 0;"><strong>Here’s how to get started:</strong></p>
      <ul style="padding-left: 20px; margin: 10px 0; color: #333;">
        <li>Complete your profile to showcase your skills and interests.</li>
        <li>Connect with like-minded tech professionals.</li>
        <li>Join communities and participate in discussions.</li>
        <li>Stay updated with the latest tech news and resources.</li>
      </ul>
    </div>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${profileUrl}" style="background-color: #1e3a8a; color: white; padding: 14px 28px; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 16px; transition: background-color 0.3s; display: inline-block;">Complete Your Profile</a>
    </div>
    <p style="font-size: 16px;">If you have any questions or need assistance, feel free to reach out to our support team at <a href="mailto:support@techconnect.com" style="color: #2563eb; text-decoration: none;">support@techconnect.com</a>.</p>
    <p style="font-size: 16px; color: #120934; font-weight: bold;">Best regards,<br>The Tech Connect Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 0.85em;">
    <p>© 2024 Tech Connect. All rights reserved.</p>
    <p><a href="#" style="color: #1e3a8a; text-decoration: none;">Privacy Policy</a> | <a href="#" style="color: #1e3a8a; text-decoration: none;">Terms of Service</a></p>
  </div>
</body>
</html>
`;


export const PASSWORD_RESET_SUCCESS_TEMPLATE = (username) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
  <div style="background: linear-gradient(to right, #1e3a8a, #120934); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
    <img src="https://i.imgur.com/QCNEFSm.jpeg" alt="Tech Connect Logo" style="width: 120px; margin-bottom: 20px; border-radius: 10px;">
    <h1 style="color: white; margin: 0; font-size: 26px; font-weight: bold;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);">
    <p style="font-size: 18px; color: #1e3a8a;">Hello, ${username},</p>
    <p>Your password has been successfully reset for your <strong>Tech Connect</strong> account. If you did not request this change, please contact our support team immediately.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #22c55e; color: white; width: 60px; height: 60px; line-height: 60px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p style="font-size: 16px; margin: 20px 0;"><strong>For your security, we recommend the following:</strong></p>
    <ul style="padding-left: 20px; color: #333;">
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication in your account settings</li>
      <li>Avoid using the same password across multiple platforms</li>
    </ul>
    <p>Thank you for taking steps to secure your account.</p>
    <p style="font-size: 16px; color: #120934; font-weight: bold;">Best regards,<br>The Tech Connect Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 0.85em;">
    <p>This is an automated message. Please do not reply to this email.</p>
    <p>© 2024 Tech Connect. All rights reserved.</p>
  </div>
</body>
</html>
`;

  

export const PASSWORD_RESET_REQUEST_TEMPLATE = (username, resetURL) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Request</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
  <div style="background: linear-gradient(to right, #1e3a8a, #120934); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
    <img src="https://i.imgur.com/QCNEFSm.jpeg" alt="Tech Connect Logo" style="width: 120px; margin-bottom: 20px; border-radius: 10px;">
    <h1 style="color: white; margin: 0; font-size: 26px; font-weight: bold;">Password Reset Request</h1>
  </div>
  <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);">
    <p style="font-size: 18px; color: #1e3a8a;">Hello, ${username},</p>
    <p>We received a request to reset the password for your <strong>Tech Connect</strong> account. If you didn’t make this request, you can safely ignore this email.</p>
    <p>To reset your password, please click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${resetURL}" style="background-color: #1e3a8a; color: white; padding: 14px 28px; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 16px; transition: background-color 0.3s;">Reset Password</a>
    </div>
    <p>This link will expire in <strong>1 hour</strong> for security purposes.</p>
    <p>Best regards,<br>The Tech Connect Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 0.85em;">
    <p>This is an automated message. Please do not reply to this email.</p>
    <p>© 2024 Tech Connect. All rights reserved.</p>
  </div>
</body>
</html>
`;

export const COMMENT_NOTIFICATION_TEMPLATE = (recipientName, commenterName, postUrl, commentContent) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Comment on Your Post</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
  <div style="background: linear-gradient(to right, #1e3a8a, #120934); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
    <img src="https://i.imgur.com/QCNEFSm.jpeg" alt="UnLinked Logo" style="width: 120px; margin-bottom: 20px; border-radius: 10px;">
    <h1 style="color: white; margin: 0; font-size: 26px; font-weight: bold;">New Comment on Your Post</h1>
  </div>
  <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);">
    <p style="font-size: 18px; color: #1e3a8a;"><strong>Hello ${recipientName},</strong></p>
    <p>${commenterName} has commented on your post:</p>
    <div style="background-color: #f3f6f8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #1e3a8a;">
      <p style="font-style: italic; margin: 0; color: #120934;">"${commentContent}"</p>
    </div>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${postUrl}" style="background-color: #1e3a8a; color: white; padding: 14px 28px; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 16px; transition: background-color 0.3s;">View Comment</a>
    </div>
    <p style="color: #333;">Stay engaged with your network by responding to comments and fostering discussions.</p>
    <p>Best regards,<br>The UnLinked Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 0.85em;">
    <p>This is an automated message. Please do not reply to this email.</p>
    <p>© 2024 UnLinked. All rights reserved.</p>
  </div>
</body>
</html>
`;



  