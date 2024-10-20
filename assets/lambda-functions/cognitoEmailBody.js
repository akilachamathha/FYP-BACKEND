exports.handler = async (event) => {
  const userAttributes = event.request.userAttributes;
  const tenantName = userAttributes['custom:tenantName'];
  const tenantCode = userAttributes['custom:tenantCode'];
  const creatorName = userAttributes['custom:creatorName'];

  let inviteUrl = `insights.re24.energy`;
  if (tenantCode == 'KEPPEL') {
    inviteUrl = `keppel.re24.energy`;
  } else if (tenantCode == 'GREENCOAT') {
    inviteUrl = `greencoat.re24.energy`;
  }

  const emailBody = `
    <body style="color: #333; padding: 0; margin: 0; font-family: Arial, sans-serif;">
        <div
            style=
            "
            max-width: 600px;
            margin: auto;
            padding: 12px;
            border: 1px solid #ddd;
            background-color: rgba(0, 0, 0, 0.05);
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            margin-top: 24px;
            "
        >
            <div style="text-align: center;">
                <picture>
                    <source srcset="https://re24-public-logos.s3.eu-west-2.amazonaws.com/logo_large_dark.png" media="(prefers-color-scheme:dark)">
                    <img src="https://re24-public-logos.s3.eu-west-2.amazonaws.com/logo_large_light.png" alt="RE24 Logo" style="width: 100px; height: auto;">
                </picture>
            </div>
            <div
                style="
                line-height: 1.6;
                margin-top: 10px;
                padding: 20px;
                border-radius: 5px;
                background-color: rgba(255, 255, 255, 1);"
            >
                <div style=" height:auto;">
                    <h1 style="text-align: center; color: #000000;">
                        Welcome to RE24 Insights!
                    </h1>
                    <p>Hello,</p>
                    <p>${creatorName} has invited you to join ${tenantName}'s RE24 Insights Account. Please use below credentials to complete your registration.</p>
                    <div style="margin-left: 40px;">
                        Username: {username}
                        <br/>
                        Password:  {####}
                    </div>
                    <div style="text-align: center; margin-top: 16px;">
                        <a href=${inviteUrl} style="background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; border-radius: 5px;">Complete your registration</a>
                    </div>
                    <p>This temporary password will expire in 7 days. If you have any questions, feel free to contact us at <a href="mailto:info@re24.energy">info@re24.energy</a></p>
                    <p>
                        Best regards,
                        <br>
                        RE24 Team
                    </p>
                </div>
            </div>
            <div style="font-size:x-small;">
                <p>This content of this message is confidential. It is forbhidden to copy, forward or any way revel the contents of this message to anyone.</p>
                <a href="https://re24.energy/">www.re24.energy</a>
                <br/>
                <p>RE24 Limited, 85 Great Portland Street,London, UK, W1W7LT</p>
                <picture>
                    <source srcset="https://re24-public-logos.s3.eu-west-2.amazonaws.com/logo_large_dark.png" media="(prefers-color-scheme: dark)">
                    <img src="https://re24-public-logos.s3.eu-west-2.amazonaws.com/logo_large_light.png" alt="RE24 Logo" style="width: 60px; height: auto;">
                </picture>
            </div>
        </div>
    </body>
  `;

  // Set the custom email content
  event.response.emailSubject = `${creatorName} has invited you to join ${tenantName}'s RE24 Insights Account`;
  event.response.emailMessage = emailBody;

  return event;
};
