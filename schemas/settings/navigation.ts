export default {
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    {
      name: 'mainNav',
      title: 'Main Navigation',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string', validation: (Rule: any) => Rule.required() },
            { name: 'link', title: 'Link', type: 'string', validation: (Rule: any) => Rule.required() },
            {
              name: 'highlight',
              title: 'Highlight',
              type: 'boolean',
              description: 'Make this item stand out (e.g., Donate button)',
              initialValue: false,
            },
            {
              name: 'submenu',
              title: 'Submenu Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'label', title: 'Label', type: 'string', validation: (Rule: any) => Rule.required() },
                    { name: 'link', title: 'Link', type: 'string', validation: (Rule: any) => Rule.required() },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'footerNav',
      title: 'Footer Navigation',
      type: 'object',
      fields: [
        {
          name: 'programs',
          title: 'Programs Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', title: 'Label', type: 'string' },
                { name: 'link', title: 'Link', type: 'string' },
              ],
            },
          ],
        },
        {
          name: 'getInvolved',
          title: 'Get Involved Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', title: 'Label', type: 'string' },
                { name: 'link', title: 'Link', type: 'string' },
              ],
            },
          ],
        },
        {
          name: 'resources',
          title: 'Resources Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', title: 'Label', type: 'string' },
                { name: 'link', title: 'Link', type: 'string' },
              ],
            },
          ],
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Navigation Settings',
      }
    },
  },
}