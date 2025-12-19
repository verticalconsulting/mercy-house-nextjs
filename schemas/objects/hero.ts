export default {
  name: 'hero',
  title: 'Hero Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'buttons',
      title: 'Call to Action Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'text', title: 'Button Text', type: 'string', validation: (Rule: any) => Rule.required() },
            { name: 'link', title: 'Button Link', type: 'string', validation: (Rule: any) => Rule.required() },
            {
              name: 'style',
              title: 'Button Style',
              type: 'string',
              options: {
                list: [
                  { title: 'Primary', value: 'primary' },
                  { title: 'Secondary', value: 'secondary' },
                  { title: 'Outline', value: 'outline' },
                ],
              },
              initialValue: 'primary',
            },
            {
              name: 'trackDonation',
              title: 'Track as Donation',
              type: 'boolean',
              description: 'Track clicks on this button as donation events',
              initialValue: false,
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.max(2),
    },
    {
      name: 'trustIndicators',
      title: 'Trust Indicators',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Short trust-building statements (e.g., "Tax-deductible", "Free pickup")',
    },
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subheading',
      media: 'backgroundImage',
    },
  },
}