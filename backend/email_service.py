import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Email, To, Content
from typing import Optional

SENDGRID_API_KEY = os.environ.get('SENDGRID_API_KEY', '')
FROM_EMAIL = os.environ.get('FROM_EMAIL', 'noreply@tranquilpeeplz.com')

def send_email(to_email: str, subject: str, html_content: str) -> bool:
    """Send email using SendGrid"""
    if not SENDGRID_API_KEY:
        print("WARNING: SENDGRID_API_KEY not configured. Email not sent.")
        return False
    
    try:
        message = Mail(
            from_email=FROM_EMAIL,
            to_emails=to_email,
            subject=subject,
            html_content=html_content
        )
        
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(message)
        
        print(f"Email sent to {to_email}. Status: {response.status_code}")
        return response.status_code == 202
    except Exception as e:
        print(f"Error sending email: {e}")
        return False

def send_verification_email(to_email: str, verification_link: str, user_name: str) -> bool:
    """Send email verification email"""
    subject = "Verify your Tranquil Peeplz account"
    html_content = f"""
    <html>
        <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
            <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px;">
                <h1 style="color: #FF6B35;">Welcome to Tranquil Peeplz!</h1>
                <p>Hi {user_name},</p>
                <p>Thank you for signing up! Please verify your email address by clicking the button below:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="{verification_link}" 
                       style="background-color: #FF6B35; color: white; padding: 15px 30px; 
                              text-decoration: none; border-radius: 5px; display: inline-block;">
                        Verify Email Address
                    </a>
                </div>
                <p>Or copy and paste this link into your browser:</p>
                <p style="color: #666; font-size: 14px;">{verification_link}</p>
                <p>If you didn't create an account, please ignore this email.</p>
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
                <p style="color: #999; font-size: 12px;">
                    Tranquil Peeplz - Your trusted recruitment partner<br>
                    © 2025 All rights reserved
                </p>
            </div>
        </body>
    </html>
    """
    return send_email(to_email, subject, html_content)

def send_password_reset_email(to_email: str, reset_link: str, user_name: str) -> bool:
    """Send password reset email"""
    subject = "Reset your Tranquil Peeplz password"
    html_content = f"""
    <html>
        <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
            <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px;">
                <h1 style="color: #FF6B35;">Password Reset Request</h1>
                <p>Hi {user_name},</p>
                <p>We received a request to reset your password. Click the button below to create a new password:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="{reset_link}" 
                       style="background-color: #FF6B35; color: white; padding: 15px 30px; 
                              text-decoration: none; border-radius: 5px; display: inline-block;">
                        Reset Password
                    </a>
                </div>
                <p>Or copy and paste this link into your browser:</p>
                <p style="color: #666; font-size: 14px;">{reset_link}</p>
                <p style="color: #d9534f; font-weight: bold;">This link will expire in 1 hour.</p>
                <p>If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
                <p style="color: #999; font-size: 12px;">
                    Tranquil Peeplz - Your trusted recruitment partner<br>
                    © 2025 All rights reserved
                </p>
            </div>
        </body>
    </html>
    """
    return send_email(to_email, subject, html_content)

def send_application_notification(to_email: str, job_title: str, applicant_name: str) -> bool:
    """Send notification to employer about new application"""
    subject = f"New application received for {job_title}"
    html_content = f"""
    <html>
        <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
            <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px;">
                <h1 style="color: #FF6B35;">New Job Application</h1>
                <p>You have received a new application for <strong>{job_title}</strong></p>
                <p>Applicant: <strong>{applicant_name}</strong></p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="https://tanquil-recruit.preview.emergentagent.com/employer-dashboard" 
                       style="background-color: #FF6B35; color: white; padding: 15px 30px; 
                              text-decoration: none; border-radius: 5px; display: inline-block;">
                        View Application
                    </a>
                </div>
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
                <p style="color: #999; font-size: 12px;">
                    Tranquil Peeplz - Your trusted recruitment partner<br>
                    © 2025 All rights reserved
                </p>
            </div>
        </body>
    </html>
    """
    return send_email(to_email, subject, html_content)
