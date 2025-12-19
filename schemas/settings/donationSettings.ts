import { Rule } from 'sanity';

const donationSettings = {
  name: 'donationSettings',
  title: 'Donation Settings',
  type: 'document',
  fields: [
    {
      name: 'primaryDonationUrl',
      title: 'Primary Donation URL',
      type: 'url',
      description: 'Main donation link (e.g., givevirtuous.org)',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'donationButtons',
      title: 'Donation Button Options',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Button Label', type: 'string', validation: (Rule: Rule) => Rule.required() },
            { name: 'url', title: 'Donation URL', type: 'url', validation: (Rule: Rule) => Rule.required() },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
            {
              name: 'donationType',
              title: 'Donation Type',
              type: 'string',
              options: {
                list: [
                  { title: 'One-time', value: 'one-time' },
                  { title: 'Monthly', value: 'monthly' },
                  { title: 'Chapel Bricks', value: 'chapel-bricks' },
                  { title: 'Vehicle Donation', value: 'vehicle' },
                  { title: 'Other', value: 'other' },
                ],
              },
            },
          ],
        },
      ],
    },
    {
      name: 'chapelBricks',
      title: 'Chapel Bricks Settings',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Chapel Bricks',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'productIds',
          title: 'Chapel Brick Product IDs',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Product IDs that trigger PDF attachment',
        },
        {
          name: 'pdfUrl',
          title: 'Thank You PDF URL',
          type: 'url',
          description: 'URL to the thank you PDF file',
        },
      ],
    },
    {
      name: 'recurringProgram',
      title: 'Recurring Donation Program',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Recurring Donations',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'defaultAmounts',
          title: 'Default Amount Options',
          type: 'array',
          of: [{ type: 'number' }],
          description: 'Suggested donation amounts',
        },
        {
          name: 'impactStatements',
          title: 'Impact Statements',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'amount', title: 'Amount', type: 'number' },
                { name: 'impact', title: 'Impact Statement', type: 'string' },
              ],
            },
          ],
          description: 'What each donation amount can accomplish',
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Donation Settings',
      }
    },
  },
}

export default donationSettings;