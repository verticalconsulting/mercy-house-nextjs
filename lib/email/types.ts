export interface EmailParams {
  to: string | string[]
  subject: string
  html: string
  text?: string
  attachments?: EmailAttachment[]
}

export interface EmailAttachment {
  filename: string
  content?: string | Buffer
  path?: string
  contentType?: string
}

export interface EmailResult {
  success: boolean
  messageId?: string
  error?: string
}

export interface EmailProvider {
  send(params: EmailParams): Promise<EmailResult>
}