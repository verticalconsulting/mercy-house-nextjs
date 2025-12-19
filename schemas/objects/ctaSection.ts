const ctaSection = {
  name: 'ctaSection',
  title: 'CTA Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'backgroundColor',
      title: 'Background Style',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Gray', value: 'gray' },
          { title: 'Primary', value: 'primary' },
          { title: 'Dark', value: 'dark' },
        ],
      },
      initialValue: 'gray',
    },
    {
      name: 'alignment',
      title: 'Text Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
      },
      initialValue: 'center',
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
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'description',
    },
  },
}

export default ctaSection