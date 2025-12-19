export default {
  name: 'testimonial',
  title: 'Testimonial Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'Success Stories',
    },
    {
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'quote',
              title: 'Quote',
              type: 'text',
              rows: 4,
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'author',
              title: 'Author Name',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'role',
              title: 'Role/Program',
              type: 'string',
              description: 'e.g., "Graduate, Men\'s Program"',
            },
            {
              name: 'image',
              title: 'Author Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Carousel', value: 'carousel' },
          { title: 'Grid', value: 'grid' },
          { title: 'Single Featured', value: 'featured' },
        ],
      },
      initialValue: 'carousel',
    },
  ],
  preview: {
    select: {
      title: 'heading',
      testimonialCount: 'testimonials.length',
    },
    prepare({ title, testimonialCount }: any) {
      return {
        title: title || 'Testimonials',
        subtitle: `${testimonialCount || 0} testimonial${testimonialCount !== 1 ? 's' : ''}`,
      }
    },
  },
}