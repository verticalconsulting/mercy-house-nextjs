import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

// This config is now for the separate Sanity Studio only
// Access your Studio at: https://mercyhouseatc.sanity.studio
// Or run locally with: npx sanity dev

export default defineConfig({
  name: 'default',
  title: 'Mercy House CMS',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ti9mmvlr',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Pages')
              .child(S.documentTypeList('page').title('Pages')),
            S.listItem()
              .title('Programs')
              .child(S.documentTypeList('program').title('Programs')),
            S.listItem()
              .title('Posts')
              .child(S.documentTypeList('post').title('Blog Posts')),
            S.listItem()
              .title('Forms')
              .child(S.documentTypeList('formConfig').title('Form Configurations')),
            S.divider(),
            S.listItem()
              .title('Settings')
              .child(
                S.list()
                  .title('Settings')
                  .items([
                    S.listItem()
                      .title('Site Settings')
                      .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
                    S.listItem()
                      .title('Navigation')
                      .child(S.document().schemaType('navigation').documentId('navigation')),
                    S.listItem()
                      .title('Donation Settings')
                      .child(S.document().schemaType('donationSettings').documentId('donationSettings')),
                  ])
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
