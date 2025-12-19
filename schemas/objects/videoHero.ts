export default {
  name: 'videoHero',
  title: 'Video Hero Section',
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
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'URL to the video file (MP4 preferred)',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'posterImage',
      title: 'Poster Image',
      type: 'image',
      description: 'Image shown while video is loading',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'overlayOpacity',
      title: 'Overlay Opacity',
      type: 'number',
      description: 'Darkness of overlay (0-100)',
      validation: (Rule: any) => Rule.min(0).max(100),
      initialValue: 50,
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
                  { title: 'Outline White', value: 'outline-white' },
                ],
              },
              initialValue: 'primary',
            },
            {
              name: 'scrollToForm',
              title: 'Scroll to Form',
              type: 'boolean',
              description: 'Scroll to form section instead of navigating',
              initialValue: false,
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.max(2),
    },
    {
      name: 'trustRow',
      title: 'Trust Row',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Trust indicators shown below buttons',
    },
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subheading',
      media: 'posterImage',
    },
    prepare({ title, subtitle }: any) {
      return {
        title,
        subtitle: subtitle || 'Video Hero Section',
      }
    },
  },
}