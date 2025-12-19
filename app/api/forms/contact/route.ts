import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validation/forms'
import { GmailProvider } from '@/lib/email/providers/gmail'
import { generateFormSubmissionEmail, generateWelcomeEmail } from '@/lib/email/templates'
import type { FormSubmission } from '@/lib/validation/forms'
import { rateLimit, rateLimitConfigs } from '@/lib/rate-limit'

// Load recipients from environment variables
const getRecipients = (): string[] => {
  const recipients = process.env.FORM_RECIPIENTS?.split(',').map(email => email.trim()) || []

  if (recipients.length === 0) {
    console.error('CRITICAL: No form recipients configured in FORM_RECIPIENTS environment variable')
  }

  return recipients
}

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResult = await rateLimit(rateLimitConfigs.formSubmission)(request)
    if (rateLimitResult) {
      return rateLimitResult
    }

    // Validate recipients are configured
    const recipients = getRecipients()
    if (recipients.length === 0) {
      return NextResponse.json(
        { success: false, error: 'System configuration error. Please contact support.' },
        { status: 500 }
      )
    }

    // Check request body size
    const contentLength = request.headers.get('content-length')
    if (contentLength && parseInt(contentLength) > 50000) {
      return NextResponse.json(
        { success: false, error: 'Request too large' },
        { status: 413 }
      )
    }

    // Parse request body
    const body = await request.json()

    // Validate form data
    const validatedData = contactFormSchema.parse(body)

    // Create form submission object
    const submission: FormSubmission = {
      formName: 'Contact',
      data: validatedData,
      timestamp: new Date(),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
      userAgent: request.headers.get('user-agent') || undefined,
    }

    // Generate email content
    const { html, text } = generateFormSubmissionEmail(submission)

    // Initialize email provider
    const emailProvider = new GmailProvider()

    // Send notification email to administrators
    const adminEmailResult = await emailProvider.send({
      to: recipients,
      subject: `New Contact Form Submission from ${validatedData.name}`,
      html,
      text,
    })

    if (!adminEmailResult.success) {
      console.error('Failed to send admin notification:', adminEmailResult.error)
      // Continue anyway - we don't want to fail the user's submission
    }

    // Send welcome email to the user (optional)
    if (validatedData.email) {
      const { html: welcomeHtml, text: welcomeText } = generateWelcomeEmail(validatedData.name)

      const userEmailResult = await emailProvider.send({
        to: validatedData.email,
        subject: 'Thank you for contacting Mercy House',
        html: welcomeHtml,
        text: welcomeText,
      })

      if (!userEmailResult.success) {
        console.error('Failed to send welcome email:', userEmailResult.error)
        // Non-critical, continue
      }
    }

    // TODO: Future enhancement - send to Google Sheets if enabled
    // if (formConfig.enableGoogleSheets) {
    //   await sendToGoogleSheets(submission)
    // }

    // Log submission for debugging (development only)
    if (process.env.NODE_ENV === 'development') {
      console.log('Form submission received:', {
        formName: submission.formName,
        timestamp: submission.timestamp,
        name: validatedData.name,
      })
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Form submitted successfully',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Form submission error:', error)

    // Handle validation errors
    if (error && typeof error === 'object' && 'issues' in error) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          issues: (error as { issues: unknown[] }).issues,
        },
        { status: 400 }
      )
    }

    // Generic error response
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process form submission',
      },
      { status: 500 }
    )
  }
}

// OPTIONS handler for CORS
export async function OPTIONS() {
  const allowedOrigin = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  })
}