const { getOtpChunk } = require("../helpers/generalHelper");

module.exports = (otp, userName = "User") => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email template</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style type="text/css">
        *{ box-sizing: border-box; margin: 0; }
        body{ background-color: #FFF; font-family: "Arial"; }
        .container{ max-width: 615px; width: 100%; margin: 0 auto; padding: 32px; background-color: #FFF; }
        .text-center{ text-align: center; }
        .email-wraper{ padding: 28px; border-radius: 12px; border: 0.66px solid #D9DADF; background: #FFF; }
        .p-tag{ color: #484A54; font-size: 14px; font-weight: 400; line-height: 20px; }
        .heading-tag{ color: #030303; font-size: 22px; font-weight: 600; padding-top: 12px; }
        .otp-number{ color: #000; font-size: 18px; font-weight: bold; padding: 10px 15px; border: 1px solid #4CAF50; border-radius: 8px; display: inline-block; }
        .green-text{ color: #564ae0; }
        .pt-24{ padding-top: 24px; }
        .pt-32{ padding-top: 32px; }
        .pt-8{ padding-top: 8px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="email-wraper">
            <div>
                <img width="48" height="36" src="https://zaptatech.com/frontend-assets/images/icons/new-logo-blue.svg">
            </div>

            <h2 class="heading-tag pt-24">OTP Verification</h2>
            <p class="p-tag pt-24">Dear <span class="green-text">${userName}</span>,</p>
            <p class="p-tag pt-8">We noticed a sign-in attempt to your account. To complete this process, please enter the following 4-digit One-Time Password (OTP):</p>

            <div class="text-center pt-24">
                <span class="otp-number">${getOtpChunk(otp, 1)}</span>
                <span class="otp-number">${getOtpChunk(otp, 2)}</span>
                <span class="otp-number">${getOtpChunk(otp, 3)}</span>
                <span class="otp-number">${getOtpChunk(otp, 4)}</span>
            </div>

            <p class="p-tag pt-32">This OTP is valid for 5 minutes. Please do not share this code with anyone for security reasons.</p>
        </div>
    </div>
</body>
</html>
`;
