const registerEmail = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Registration Success</title>
</head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color: #f4f6f8;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <tr>
            <td style="background-color: #4f46e5; padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Registration Successful 🎉</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 40px;">
              <p style="font-size: 16px; color: #333;">Hi <strong>[User's Name]</strong>,</p>
              <p style="font-size: 16px; color: #333; line-height: 1.6;">
                Thank you for registering with <strong>[User's Name]</strong>! We're excited to have you with us.
              </p>
              <p style="font-size: 16px; color: #333; line-height: 1.6;">
                Your registration was successful, and your profile is currently under review by our team. We'll notify you once the verification process is complete.
              </p>
              <p style="font-size: 16px; color: #333; line-height: 1.6;">
                In the meantime, feel free to explore our platform and stay connected! Your password is <span style="font-weight:bold;">[password]<span/>
              </p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="[Your Website URL]" style="background-color: #4f46e5; color: #ffffff; padding: 12px 24px; border-radius: 5px; text-decoration: none; font-weight: bold;">Visit Platform</a>
              </div>
              <p style="font-size: 14px; color: #888;">If you have any questions, reach out to us at <a href="mailto:roshanjaiswal.bca@gmail.com" style="color: #4f46e5;">roshanjaiswal.bca@gmail.com</a>.</p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f0f0f0; padding: 20px; text-align: center; font-size: 13px; color: #888;">
              &copy; 2025 ByteUP. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>

`

export default registerEmail