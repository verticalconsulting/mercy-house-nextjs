import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

// Create a client with write token
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ti9mmvlr',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-12-19',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function seedHomePage() {
  console.log('🌱 Seeding homepage...')

  const homePageDoc = {
    _type: 'page',
    _id: 'page-home',
    title: 'Home',
    slug: {
      _type: 'slug',
      current: 'home',
    },
    pageBuilder: [
      {
        _type: 'videoHero',
        _key: 'hero-1',
        heading: 'Freedom from Addiction Through Faith',
        subheading: 'Christ-centered recovery programs for men, women, and teens in Mississippi',
        videoUrl: '/videos/hero-background.mp4',
        overlayOpacity: 50,
        buttons: [
          {
            _key: 'btn-1',
            text: 'Get Help Now',
            link: '/get-help',
            style: 'primary',
            scrollToForm: false,
          },
          {
            _key: 'btn-2',
            text: 'Donate',
            link: 'https://givevirtuous.org/mercyhouse',
            style: 'outline-white',
            scrollToForm: false,
          },
        ],
      },
      {
        _type: 'contentBlock',
        _key: 'stats-1',
        heading: 'Our Impact',
        content: [
          {
            _type: 'block',
            _key: 'block-1',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'span-1',
                text: '40+ Years of Service | 500+ Lives Transformed | 85% Success Rate | 24/7 Support Available',
                marks: [],
              },
            ],
          },
        ],
        layout: 'container',
      },
      {
        _type: 'contentBlock',
        _key: 'programs-1',
        heading: 'Our Recovery Programs',
        content: [
          {
            _type: 'block',
            _key: 'block-2',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'span-2',
                text: 'Faith-based residential treatment programs designed to address the root causes of addiction and provide lasting transformation.',
                marks: [],
              },
            ],
          },
        ],
        layout: 'container',
      },
      {
        _type: 'contentBlock',
        _key: 'mission-1',
        heading: 'Our Mission',
        content: [
          {
            _type: 'block',
            _key: 'block-3',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'span-3',
                text: 'Mercy House Adult & Teen Challenge exists to provide faith-based recovery and rehabilitation services to individuals and families affected by addiction. Through the transforming power of Jesus Christ, we help people break free from addiction, restore relationships, and rebuild their lives with purpose and dignity.',
                marks: [],
              },
            ],
          },
        ],
        layout: 'container',
      },
    ],
    seo: {
      _type: 'seo',
      metaTitle: 'Mercy House Adult & Teen Challenge - Faith-Based Recovery in Mississippi',
      metaDescription: 'Transforming lives through Christ-centered addiction recovery programs. Residential treatment for men, women, and teens in Mississippi.',
    },
  }

  try {
    const result = await client.createOrReplace(homePageDoc)
    console.log('✅ Homepage created:', result._id)
  } catch (error) {
    console.error('❌ Error creating homepage:', error)
    throw error
  }
}

async function seedDonateCarPage() {
  console.log('🌱 Seeding donate-a-car page...')

  const donateCarPageDoc = {
    _type: 'page',
    _id: 'page-donate-a-car',
    title: 'Donate Your Car',
    slug: {
      _type: 'slug',
      current: 'donate-a-car',
    },
    pageBuilder: [
      {
        _type: 'videoHero',
        _key: 'hero-donate-1',
        heading: 'Donate Your Car. Change a Life in Mississippi.',
        subheading: 'Free pickup. Fast tax receipt. Your donation funds recovery.',
        videoUrl: '/videos/hero-background.mp4',
        overlayOpacity: 50,
        buttons: [
          {
            _key: 'btn-donate-1',
            text: 'Start Your Donation',
            link: '#donation-form',
            style: 'primary',
            scrollToForm: true,
          },
        ],
        trustRow: ['Tax-deductible', 'Free towing', 'Quick turnaround'],
      },
      {
        _type: 'contentBlock',
        _key: 'process-1',
        heading: 'How It Works',
        content: [
          {
            _type: 'block',
            _key: 'block-process-1',
            style: 'h3',
            children: [
              {
                _type: 'span',
                _key: 'span-process-1',
                text: '1. Tell us about your vehicle',
                marks: ['strong'],
              },
            ],
          },
          {
            _type: 'block',
            _key: 'block-process-2',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'span-process-2',
                text: 'Fill out our simple form with basic information about your car, truck, or other vehicle.',
                marks: [],
              },
            ],
          },
          {
            _type: 'block',
            _key: 'block-process-3',
            style: 'h3',
            children: [
              {
                _type: 'span',
                _key: 'span-process-3',
                text: '2. Schedule free pickup',
                marks: ['strong'],
              },
            ],
          },
          {
            _type: 'block',
            _key: 'block-process-4',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'span-process-4',
                text: "We'll arrange free towing at a time that works for you, anywhere in Mississippi.",
                marks: [],
              },
            ],
          },
          {
            _type: 'block',
            _key: 'block-process-5',
            style: 'h3',
            children: [
              {
                _type: 'span',
                _key: 'span-process-5',
                text: '3. Get your tax receipt',
                marks: ['strong'],
              },
            ],
          },
          {
            _type: 'block',
            _key: 'block-process-6',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'span-process-6',
                text: "Receive your tax-deductible receipt and know you're changing lives through recovery.",
                marks: [],
              },
            ],
          },
        ],
        layout: 'container',
      },
      {
        _type: 'faq',
        _key: 'faq-1',
        heading: 'Frequently Asked Questions',
        description: 'Everything you need to know about donating your vehicle',
        faqs: [
          {
            _key: 'faq-item-1',
            question: 'Do you provide free towing?',
            answer:
              "Yes! We provide free towing throughout Mississippi. Once you submit your donation form, we'll contact you to schedule a pickup time that works for your schedule.",
          },
          {
            _key: 'faq-item-2',
            question: 'What vehicles do you accept?',
            answer:
              "We accept cars, trucks, SUVs, motorcycles, boats, and RVs. The vehicle doesn't need to be running - we'll take it in any condition.",
          },
          {
            _key: 'faq-item-3',
            question: 'Do I need the title?',
            answer:
              "In most cases, yes, you'll need the title to donate your vehicle. If you've lost your title, we can help guide you through the process of obtaining a duplicate from the DMV.",
          },
          {
            _key: 'faq-item-4',
            question: 'How quickly will you pick up my vehicle?',
            answer:
              'We typically schedule pickups within 2-3 business days of receiving your donation form. In some cases, we can arrange same-day or next-day pickup.',
          },
          {
            _key: 'faq-item-5',
            question: 'Is my donation tax-deductible?',
            answer:
              "Yes! Mercy House Adult & Teen Challenge is a 501(c)(3) nonprofit organization. You'll receive a tax receipt for your donation that you can use when filing your taxes.",
          },
          {
            _key: 'faq-item-6',
            question: 'What happens to my donated vehicle?',
            answer:
              'Donated vehicles are either sold at auction or recycled, with 100% of the proceeds going directly to support our recovery and rehabilitation programs in Mississippi.',
          },
        ],
      },
      {
        _type: 'ctaSection',
        _key: 'cta-final',
        heading: 'Your Vehicle Can Change Lives',
        description:
          'Every vehicle donated helps provide faith-based recovery services to men, women, and teens struggling with addiction in Mississippi.',
        backgroundColor: 'primary',
        alignment: 'center',
        buttons: [
          {
            _key: 'cta-btn-1',
            text: 'Donate Your Vehicle',
            link: '#donation-form',
            style: 'primary',
            trackDonation: false,
          },
          {
            _key: 'cta-btn-2',
            text: 'Call (601) 858-2256',
            link: 'tel:6018582256',
            style: 'outline',
            trackDonation: false,
          },
        ],
      },
    ],
    seo: {
      _type: 'seo',
      metaTitle: 'Donate Your Car - Mercy House Adult & Teen Challenge',
      metaDescription:
        'Donate your car to support recovery programs in Mississippi. Free pickup, fast tax receipt, and your donation directly funds life transformation.',
      metaKeywords: 'car donation, vehicle donation, Mississippi charity, tax deductible donation, free towing',
    },
  }

  try {
    const result = await client.createOrReplace(donateCarPageDoc)
    console.log('✅ Donate-a-car page created:', result._id)
  } catch (error) {
    console.error('❌ Error creating donate-a-car page:', error)
    throw error
  }
}

async function seedSiteSettings() {
  console.log('🌱 Seeding site settings...')

  const siteSettingsDoc = {
    _type: 'siteSettings',
    _id: 'siteSettings',
    siteName: 'Mercy House Adult & Teen Challenge',
    siteDescription: 'Faith-based recovery programs for men, women, and teens in Mississippi',
    contactInfo: {
      phone: '(601) 858-2256',
      email: 'info@mercyhouseatc.com',
      address: '123 Recovery Road\nJackson, MS 39201',
    },
    socialMedia: {
      facebook: 'https://facebook.com/mercyhouse',
      instagram: 'https://instagram.com/mercyhouse',
    },
  }

  try {
    const result = await client.createOrReplace(siteSettingsDoc)
    console.log('✅ Site settings created:', result._id)
  } catch (error) {
    console.error('❌ Error creating site settings:', error)
    throw error
  }
}

async function main() {
  console.log('🚀 Starting Sanity data seeding...')
  console.log(`📦 Project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)
  console.log(`📊 Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET}`)

  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ Error: SANITY_API_TOKEN environment variable is required')
    console.log('\nTo fix this:')
    console.log('1. Go to https://www.sanity.io/manage')
    console.log('2. Select your project')
    console.log('3. Go to API > Tokens')
    console.log('4. Create a token with "Editor" permissions')
    console.log('5. Add it to your .env.local file as SANITY_API_TOKEN=your-token')
    process.exit(1)
  }

  try {
    await seedHomePage()
    await seedDonateCarPage()
    await seedSiteSettings()

    console.log('\n✨ Seeding completed successfully!')
    console.log('🎉 Visit https://mercy-house.sanity.studio to see your content')
  } catch (error) {
    console.error('\n❌ Seeding failed:', error)
    process.exit(1)
  }
}

main()
