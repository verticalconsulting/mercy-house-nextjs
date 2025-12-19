import { Rule } from 'sanity'

const formConfig = {
  name: 'formConfig',
  title: 'Form Configuration',
  type: 'document',
  fields: [
    {
      name: 'formName',
      title: 'Form Name',
      type: 'string',
      description: 'Unique identifier for this form (e.g., "contact", "get-help", "donate-car")',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'displayName',
      title: 'Display Name',
      type: 'string',
      description: 'Human-readable name for this form',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'recipients',
      title: 'Email Recipients',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Email addresses that will receive form submissions',
      validation: (Rule: Rule) => Rule.required().min(1),
    },
    {
      name: 'successMessage',
      title: 'Success Message',
      type: 'text',
      rows: 3,
      description: 'Message shown to users after successful submission',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'emailSubject',
      title: 'Email Subject Template',
      type: 'string',
      description: 'Subject line for notification emails (can include {formName} placeholder)',
      initialValue: 'New {formName} Form Submission',
    },
    {
      name: 'enableGoogleSheets',
      title: 'Enable Google Sheets',
      type: 'boolean',
      description: 'Send form submissions to Google Sheets (in addition to email)',
      initialValue: false,
    },
    {
      name: 'googleSheetId',
      title: 'Google Sheet ID',
      type: 'string',
      description: 'The ID of the Google Sheet to send data to',
      hidden: ({ parent }: { parent: { enableGoogleSheets?: boolean } }) => !parent?.enableGoogleSheets,
    },
    {
      name: 'googleSheetTab',
      title: 'Google Sheet Tab Name',
      type: 'string',
      description: 'The name of the tab/sheet within the Google Sheet',
      hidden: ({ parent }: { parent: { enableGoogleSheets?: boolean } }) => !parent?.enableGoogleSheets,
    },
    {
      name: 'fields',
      title: 'Form Fields',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Field Name',
              type: 'string',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'label',
              title: 'Field Label',
              type: 'string',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'type',
              title: 'Field Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Text', value: 'text' },
                  { title: 'Email', value: 'email' },
                  { title: 'Phone', value: 'tel' },
                  { title: 'Textarea', value: 'textarea' },
                  { title: 'Select', value: 'select' },
                  { title: 'Checkbox', value: 'checkbox' },
                  { title: 'Radio', value: 'radio' },
                ],
              },
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'required',
              title: 'Required',
              type: 'boolean',
              initialValue: false,
            },
            {
              name: 'placeholder',
              title: 'Placeholder',
              type: 'string',
            },
            {
              name: 'options',
              title: 'Options (for select/radio)',
              type: 'array',
              of: [{ type: 'string' }],
              hidden: ({ parent }: { parent: { type?: string } }) => !['select', 'radio'].includes(parent?.type ?? ''),
            },
          ],
        },
      ],
    },
    {
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Whether this form is currently active and accepting submissions',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'displayName',
      formName: 'formName',
      active: 'active',
      recipientCount: 'recipients.length',
    },
    prepare({ title, formName, active, recipientCount }: any) {
      return {
        title,
        subtitle: `${formName} | ${recipientCount} recipient${recipientCount !== 1 ? 's' : ''} | ${active ? 'Active' : 'Inactive'}`,
      }
    },
  },
}

export default formConfig
