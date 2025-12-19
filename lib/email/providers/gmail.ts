import nodemailer from 'nodemailer'
import type { EmailParams, EmailResult, EmailProvider } from '../types'

export class GmailProvider implements EmailProvider {
  private transporter: nodemailer.Transporter

  constructor() {
    // Create reusable transporter using Gmail SMTP
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD, // App Password, not regular password
      },
    })
  }

  async send(params: EmailParams): Promise<EmailResult> {
    try {
      // Ensure recipients is an array
      const recipients = Array.isArray(params.to) ? params.to : [params.to]

      // Send email
      const info = await this.transporter.sendMail({
        from: `"Mercy House ATC" <${process.env.GMAIL_USER}>`,
        to: recipients.join(', '),
        subject: params.subject,
        text: params.text,
        html: params.html,
        attachments: params.attachments,
      })

      return {
        success: true,
        messageId: info.messageId,
      }
    } catch (error) {
      console.error('Gmail send error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send email',
      }
    }
  }

  async verify(): Promise<boolean> {
    try {
      await this.transporter.verify()
      return true
    } catch (error) {
      console.error('Gmail verification failed:', error)
      return false
    }
  }
}