import { FormSubmission } from '@/lib/validation/forms'
import DOMPurify from 'isomorphic-dompurify'

export function generateFormSubmissionEmail(submission: FormSubmission): {
  html: string
  text: string
} {
  const { formName, data, timestamp } = submission

  // Generate HTML email
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #e09900; color: white; padding: 20px; text-align: center; }
          .content { background: #f4f4f4; padding: 20px; margin-top: 20px; }
          .field { margin-bottom: 15px; }
          .field-label { font-weight: bold; color: #555; }
          .field-value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #888; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New ${formName} Form Submission</h2>
            <p>Received: ${new Date(timestamp).toLocaleString()}</p>
          </div>
          <div class="content">
            ${Object.entries(data)
              .map(([key, value]) => {
                // Format field name (convert camelCase to Title Case)
                const label = key
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, (str) => str.toUpperCase())
                  .trim()

                // Format value (handle arrays and objects)
                let displayValue = value
                if (Array.isArray(value)) {
                  displayValue = value.join(', ')
                } else if (typeof value === 'object' && value !== null) {
                  displayValue = JSON.stringify(value, null, 2)
                } else if (typeof value === 'boolean') {
                  displayValue = value ? 'Yes' : 'No'
                }

                return `
                  <div class="field">
                    <div class="field-label">${DOMPurify.sanitize(label)}:</div>
                    <div class="field-value">${DOMPurify.sanitize(String(displayValue || 'N/A'))}</div>
                  </div>
                `
              })
              .join('')}
          </div>
          <div class="footer">
            <p>This email was sent from the Mercy House ATC website form system.</p>
            <p>© ${new Date().getFullYear()} Mercy House Adult & Teen Challenge</p>
          </div>
        </div>
      </body>
    </html>
  `

  // Generate plain text email
  const text = `
New ${formName} Form Submission
========================================
Received: ${new Date(timestamp).toLocaleString()}

${Object.entries(data)
  .map(([key, value]) => {
    const label = key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim()

    let displayValue = value
    if (Array.isArray(value)) {
      displayValue = value.join(', ')
    } else if (typeof value === 'object' && value !== null) {
      displayValue = JSON.stringify(value, null, 2)
    } else if (typeof value === 'boolean') {
      displayValue = value ? 'Yes' : 'No'
    }

    return `${label}: ${displayValue || 'N/A'}`
  })
  .join('\n')}

----------------------------------------
This email was sent from the Mercy House ATC website form system.
© ${new Date().getFullYear()} Mercy House Adult & Teen Challenge
  `.trim()

  return { html, text }
}

export function generateWelcomeEmail(name: string): {
  html: string
  text: string
} {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #e09900; color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; }
          .button { display: inline-block; padding: 12px 30px; background: #e09900; color: white; text-decoration: none; border-radius: 4px; margin-top: 20px; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #888; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Mercy House</h1>
          </div>
          <div class="content">
            <h2>Thank you for reaching out, ${DOMPurify.sanitize(name)}!</h2>
            <p>We've received your submission and someone from our team will be in touch with you soon.</p>
            <p>At Mercy House Adult & Teen Challenge, we're committed to providing faith-based recovery and rehabilitation services to those in need. Your inquiry is important to us, and we'll respond as quickly as possible.</p>
            <p>If you need immediate assistance, please don't hesitate to call us at <strong>(601) 858-2256</strong>.</p>
            <a href="https://mercyhouseatc.com" class="button">Visit Our Website</a>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Mercy House Adult & Teen Challenge</p>
            <p>Faith-based recovery and rehabilitation in Mississippi</p>
          </div>
        </div>
      </body>
    </html>
  `

  const text = `
Welcome to Mercy House

Thank you for reaching out, ${DOMPurify.sanitize(name)}!

We've received your submission and someone from our team will be in touch with you soon.

At Mercy House Adult & Teen Challenge, we're committed to providing faith-based recovery and rehabilitation services to those in need. Your inquiry is important to us, and we'll respond as quickly as possible.

If you need immediate assistance, please don't hesitate to call us at (601) 858-2256.

Visit our website: https://mercyhouseatc.com

© ${new Date().getFullYear()} Mercy House Adult & Teen Challenge
Faith-based recovery and rehabilitation in Mississippi
  `.trim()

  return { html, text }
}