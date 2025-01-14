
# Third Party Imports
from dotenv import load_dotenv
from pydantic import EmailStr
from pydantic_settings import BaseSettings
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig

# Load in all env variables
load_dotenv()

# Configuration settings
class EmailConfig(BaseSettings):
    MAIL_USERNAME: str
    MAIL_PASSWORD: str
    MAIL_FROM: EmailStr
    MAIL_PORT: int
    MAIL_SERVER: str
    MAIL_STARTTLS: bool = True
    MAIL_SSL_TLS: bool = False
    MAIL_FROM_NAME: str = "SweetAura"

    class Config:
        env_file = ".env"  # Use a .env file for sensitive information
        env_file_encoding = "utf-8"
        extra = "ignore"  # Ignore extra keys in the .env file


# Load configuration
email_config = EmailConfig()

conf = ConnectionConfig(
    MAIL_USERNAME=email_config.MAIL_USERNAME,
    MAIL_PASSWORD=email_config.MAIL_PASSWORD,
    MAIL_FROM=email_config.MAIL_FROM,
    MAIL_PORT=email_config.MAIL_PORT,
    MAIL_SERVER=email_config.MAIL_SERVER,
    MAIL_STARTTLS=email_config.MAIL_STARTTLS,
    MAIL_SSL_TLS=email_config.MAIL_SSL_TLS,
    MAIL_FROM_NAME=email_config.MAIL_FROM_NAME,
)

async def send_reset_email(username: str, email: EmailStr, token: str):
    """
    Sends a password reset email with a reset link to the user.

    Args:
        email (str): The recipient's email address.
        token (str): The unique password reset token.

    Returns:
        None
    """
    reset_link = f"http://localhost:3000/reset-password?token={token}"

    subject = "Password Reset Request"

    html_body = f"""
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Choose a new password for your SweetAura Account</title>
    <style type="text/css" rel="stylesheet" media="all">
        /* Base ------------------------------ */
        *:not(br):not(tr):not(html) {{
        font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        }}
        body {{
        width: 100% !important;
        height: 100%;
        margin: 0;
        line-height: 1.4;
        background-color: #F5F7F9;
        color: #839197;
        -webkit-text-size-adjust: none;
        }}
        a {{
        color: #414EF9;
        }}

        /* Layout ------------------------------ */
        .email-wrapper {{
        width: 100%;
        margin: 0;
        padding: 0;
        background-color: #F5F7F9;
        }}
        .email-content {{
        width: 100%;
        margin: 0;
        padding: 0;
        }}

        /* Masthead ----------------------- */
        .email-masthead {{
        padding: 25px 0;
        text-align: center;
        }}
        .email-masthead_logo {{
        max-width: 400px;
        border: 0;
        }}
        .email-masthead_name {{
        font-size: 16px;
        font-weight: bold;
        color: #839197;
        text-decoration: none;
        text-shadow: 0 1px 0 white;
        }}

        /* Body ------------------------------ */
        .email-body {{
        width: 100%;
        margin: 0;
        padding: 0;
        border-top: 1px solid #E7EAEC;
        border-bottom: 1px solid #E7EAEC;
        background-color: #FFFFFF;
        }}
        .email-body_inner {{
        width: 570px;
        margin: 0 auto;
        padding: 0;
        }}
        .email-footer {{
        width: 570px;
        margin: 0 auto;
        padding: 0;
        text-align: center;
        }}
        .email-footer p {{
        color: #839197;
        }}
        .body-action {{
        width: 100%;
        margin: 30px auto;
        padding: 0;
        text-align: center;
        }}
        .body-sub {{
        margin-top: 25px;
        padding-top: 25px;
        border-top: 1px solid #E7EAEC;
        }}
        .content-cell {{
        padding: 35px;
        }}
        .align-right {{
        text-align: right;
        }}

        /* Type ------------------------------ */
        h1 {{
        margin-top: 0;
        color: #292E31;
        font-size: 19px;
        font-weight: bold;
        text-align: left;
        }}
        h2 {{
        margin-top: 0;
        color: #292E31;
        font-size: 16px;
        font-weight: bold;
        text-align: left;
        }}
        h3 {{
        margin-top: 0;
        color: #292E31;
        font-size: 14px;
        font-weight: bold;
        text-align: left;
        }}
        p {{
        margin-top: 0;
        color: #839197;
        font-size: 16px;
        line-height: 1.5em;
        text-align: left;
        }}
        p.sub {{
        font-size: 12px;
        }}
        p.center {{
        text-align: center;
        }}

        /* Buttons ------------------------------ */
        .button {{
        display: inline-block;
        width: 200px;
        background-color: #414EF9;
        border-radius: 3px;
        color: #ffffff;
        font-size: 15px;
        line-height: 45px;
        text-align: center;
        text-decoration: none;
        -webkit-text-size-adjust: none;
        mso-hide: all;
        }}
        .button--green {{
        background-color: #28DB67;
        }}
        .button--red {{
        background-color: #FF3665;
        }}
        .button--blue {{
        background-color: #414EF9;
        }}
        .button--aura {{
        background-color: #FF6FCF;
        }}

        /*Media Queries ------------------------------ */
        @media only screen and (max-width: 600px) {{
        .email-body_inner,
        .email-footer {{
            width: 100% !important;
        }}
        }}
        @media only screen and (max-width: 500px) {{
        .button {{
            width: 100% !important;
        }}
        }}
    </style>
    </head>
    <body>
    <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0">
        <tr>
        <td align="center">
            <table class="email-content" width="100%" cellpadding="0" cellspacing="0">
            <!-- Logo -->
            <tr>
                <td class="email-masthead">
                <a class="email-masthead_name">SweetAura</a>
                </td>
            </tr>
            <!-- Email Body -->
            <tr>
                <td class="email-body" width="100%">
                <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0">
                    <!-- Body content -->
                    <tr>
                    <td class="content-cell">
                        <h1>Hi {username},</h1>
                        <p>You recently requested to reset your password for your SweetAura account. Click the button below to reset it.</p>
                        <!-- Action -->
                        <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                            <td align="center">
                            <div>
                                <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="{reset_link}" style="height:45px;v-text-anchor:middle;width:200px;" arcsize="7%" stroke="f" fill="t">
                                <v:fill type="tile" color="#FF3665" />
                                <w:anchorlock/>
                                <center style="color:#ffffff;font-family:sans-serif;font-size:15px;">Reset your password</center>
                                </v:roundrect><![endif]-->
                                <a href="{reset_link}" class="button button--aura">Reset your password</a>
                            </div>
                            </td>
                        </tr>
                        </table>
                        <p>If you did not request a password reset, please ignore this email or reply to let us know. This password reset is only valid for the next 30 minutes.</p>
                        <p>Thanks,<br>The SweetAura Team</p>
                        <p><strong>P.S.</strong> We also love hearing from you and helping you with any issues you have. Please reply to this email if you want to ask a question or just say hi.</p>
                        <!-- Sub copy -->
                        <table class="body-sub">
                        <tr>
                            <td>
                            <p class="sub">If you’re having trouble clicking the password reset button, copy and paste the URL below into your web browser.</p>
                            <p class="sub"><a href="{reset_link}">{reset_link}</a></p>
                            </td>
                        </tr>
                        </table>
                    </td>
                    </tr>
                </table>
                </td>
            </tr>
            <tr>
                <td>
                <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0">
                    <tr>
                    <td class="content-cell">
                        <p class="sub center">&copy; 2025 SweetAura. All rights reserved.</p>
                        <p class="sub center">Philadelphia, PA</p>
                    </td>
                    </tr>
                </table>
                </td>
            </tr>
            </table>
        </td>
        </tr>
    </table>
    </body>
    </html>
    """

    message = MessageSchema(
        subject=subject,
        recipients=[email],  # List of recipients
        body=html_body,
        subtype="html",  # Send HTML content
    )

    fastmail = FastMail(conf)

    try:
        await fastmail.send_message(message)
        print(f"Password reset email sent to {email}")
    except Exception as e:
        print(f"Error sending email: {e}")


async def send_verify_email(email: EmailStr, token: str):
    """
    Sends a verification email with a link to the user.

    Args:
        email (str): The recipient's email address.
        token (str): The unique password reset token.

    Returns:
        None
    """
    reset_link = f"http://localhost:3000/verify-email?token={token}"

    subject = "Email Verification"

    html_body = f"""
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Verify your email address</title>
    <style type="text/css" rel="stylesheet" media="all">
        /* Base ------------------------------ */
        *:not(br):not(tr):not(html) {{
        font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        }}
        body {{
        width: 100% !important;
        height: 100%;
        margin: 0;
        line-height: 1.4;
        background-color: #F5F7F9;
        color: #839197;
        -webkit-text-size-adjust: none;
        }}
        a {{
        color: #414EF9;
        }}

        /* Layout ------------------------------ */
        .email-wrapper {{
        width: 100%;
        margin: 0;
        padding: 0;
        background-color: #F5F7F9;
        }}
        .email-content {{
        width: 100%;
        margin: 0;
        padding: 0;
        }}

        /* Masthead ----------------------- */
        .email-masthead {{
        padding: 25px 0;
        text-align: center;
        }}
        .email-masthead_logo {{
        max-width: 400px;
        border: 0;
        }}
        .email-masthead_name {{
        font-size: 16px;
        font-weight: bold;
        color: #839197;
        text-decoration: none;
        text-shadow: 0 1px 0 white;
        }}

        /* Body ------------------------------ */
        .email-body {{
        width: 100%;
        margin: 0;
        padding: 0;
        border-top: 1px solid #E7EAEC;
        border-bottom: 1px solid #E7EAEC;
        background-color: #FFFFFF;
        }}
        .email-body_inner {{
        width: 570px;
        margin: 0 auto;
        padding: 0;
        }}
        .email-footer {{
        width: 570px;
        margin: 0 auto;
        padding: 0;
        text-align: center;
        }}
        .email-footer p {{
        color: #839197;
        }}
        .body-action {{
        width: 100%;
        margin: 30px auto;
        padding: 0;
        text-align: center;
        }}
        .body-sub {{
        margin-top: 25px;
        padding-top: 25px;
        border-top: 1px solid #E7EAEC;
        }}
        .content-cell {{
        padding: 35px;
        }}
        .align-right {{
        text-align: right;
        }}

        /* Type ------------------------------ */
        h1 {{
        margin-top: 0;
        color: #292E31;
        font-size: 19px;
        font-weight: bold;
        text-align: left;
        }}
        h2 {{
        margin-top: 0;
        color: #292E31;
        font-size: 16px;
        font-weight: bold;
        text-align: left;
        }}
        h3 {{
        margin-top: 0;
        color: #292E31;
        font-size: 14px;
        font-weight: bold;
        text-align: left;
        }}
        p {{
        margin-top: 0;
        color: #839197;
        font-size: 16px;
        line-height: 1.5em;
        text-align: left;
        }}
        p.sub {{
        font-size: 12px;
        }}
        p.center {{
        text-align: center;
        }}

        /* Buttons ------------------------------ */
        .button {{
        display: inline-block;
        width: 200px;
        background-color: #FF6FCF;
        border-radius: 3px;
        color: #ffffff;
        font-size: 15px;
        line-height: 45px;
        text-align: center;
        text-decoration: none;
        -webkit-text-size-adjust: none;
        mso-hide: all;
        }}
        .button--green {{
        background-color: #28DB67;
        }}
        .button--red {{
        background-color: #FF3665;
        }}
        .button--blue {{
        background-color: #414EF9;
        }}
        .button--aura {{
        background-color: #FF6FCF;
        }}

        /*Media Queries ------------------------------ */
        @media only screen and (max-width: 600px) {{
        .email-body_inner,
        .email-footer {{
            width: 100% !important;
        }}
        }}
        @media only screen and (max-width: 500px) {{
        .button {{
            width: 100% !important;
        }}
        }}
    </style>
    </head>
    <body>
    <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0">
        <tr>
        <td align="center">
            <table class="email-content" width="100%" cellpadding="0" cellspacing="0">
            <!-- Logo -->
            <tr>
                <td class="email-masthead">
                <a class="email-masthead_name">SweetAura</a>
                </td>
            </tr>
            <!-- Email Body -->
            <tr>
                <td class="email-body" width="100%">
                <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0">
                    <!-- Body content -->
                    <tr>
                    <td class="content-cell">
                        <h1>Verify your email address</h1>
                        <p>Thanks for joining SweetAura! We're excited to have you as an early user.</p>
                        <!-- Action -->
                        <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                            <td align="center">
                            <div>
                                <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="{reset_link}" style="height:45px;v-text-anchor:middle;width:200px;" arcsize="7%" stroke="f" fill="t">
                                <v:fill type="tile" color="#414EF9" />
                                <w:anchorlock/>
                                <center style="color:#ffffff;font-family:sans-serif;font-size:15px;">Verify Email</center>
                            </v:roundrect><![endif]-->
                                <a href="{reset_link}" class="button button--aura">Verify Email</a>
                            </div>
                            </td>
                        </tr>
                        </table>
                        <p>Thanks,<br>The SweetAura Team</p>
                        <!-- Sub copy -->
                        <table class="body-sub">
                        <tr>
                            <td>
                            <p class="sub">If you’re having trouble clicking the button, copy and paste the URL below into your web browser.
                            </p>
                            <p class="sub"><a href="{reset_link}">{reset_link}</a></p>
                            </td>
                        </tr>
                        </table>
                    </td>
                    </tr>
                </table>
                </td>
            </tr>
            <tr>
                <td>
                <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0">
                    <tr>
                    <td class="content-cell">
                         <p class="sub center">&copy; 2025 SweetAura. All rights reserved.</p>
                        <p class="sub center">Philadelphia, PA</p>
                    </td>
                    </tr>
                </table>
                </td>
            </tr>
            </table>
        </td>
        </tr>
    </table>
    </body>
    </html>
    """

    message = MessageSchema(
        subject=subject,
        recipients=[email],  # List of recipients
        body=html_body,
        subtype="html",  # Send HTML content
    )

    fastmail = FastMail(conf)

    try:
        await fastmail.send_message(message)
        print(f"Email Verification sent to {email}")
    except Exception as e:
        print(f"Error sending email: {e}")


async def send_feedback_confirmation(email: EmailStr):
    """
    Sends a password reset email with a reset link to the user.

    Args:
        email (str): The recipient's email address.
        token (str): The unique password reset token.

    Returns:
        None
    """

    message = MessageSchema(
        subject="Feedback Received",
        recipients=[email],
        body="Thank you for reaching out to us! We've received your feedback and will respond shortly.",
        subtype="plain",
    )

    fastmail = FastMail(conf)

    try:
        await fastmail.send_message(message)
        print(f"Confirmation Email sent to: {email}")
    except Exception as e:
        print(f"Error sending confirmation email: {e}")
