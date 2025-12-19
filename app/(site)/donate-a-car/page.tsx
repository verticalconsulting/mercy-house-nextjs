import type { Metadata } from 'next'
import { VideoHero } from '@/components/blocks/VideoHero'
import { ThreeStepProcess } from '@/components/blocks/ThreeStepProcess'
import { WhyMercyHouse } from '@/components/blocks/WhyMercyHouse'
import { VehicleDonationForm } from '@/components/forms/VehicleDonationForm'
import { FAQ } from '@/components/blocks/FAQ'
import { StickyMobileCTA } from '@/components/blocks/StickyMobileCTA'

export const metadata: Metadata = {
  title: 'Donate Your Car - Mercy House Adult & Teen Challenge',
  description: 'Donate your car to support recovery programs in Mississippi. Free pickup, fast tax receipt, and your donation directly funds life transformation.',
  keywords: 'car donation, vehicle donation, Mississippi charity, tax deductible donation, free towing',
  openGraph: {
    title: 'Donate Your Car. Change a Life in Mississippi.',
    description: 'Free pickup. Fast tax receipt. Your vehicle donation funds recovery and rehabilitation programs.',
    url: 'https://mercyhouseatc.com/donate-a-car',
    type: 'website',
  },
}

// Mock data - in production, this would come from Sanity
const heroData = {
  heading: "Donate Your Car. Change a Life in Mississippi.",
  subheading: "Free pickup. Fast tax receipt. Your donation funds recovery.",
  videoUrl: "/videos/hero-background.mp4", // Placeholder
  buttons: [
    { text: "Start Your Donation", link: "#donation-form", scrollToForm: true },
  ],
  trustRow: [
    "Tax-deductible",
    "Free towing",
    "Quick turnaround"
  ]
}

const processSteps = [
  {
    number: "1",
    title: "Tell us about your vehicle",
    description: "Fill out our simple form with basic information about your car, truck, or other vehicle."
  },
  {
    number: "2",
    title: "Schedule free pickup",
    description: "We'll arrange free towing at a time that works for you, anywhere in Mississippi."
  },
  {
    number: "3",
    title: "Get your tax receipt",
    description: "Receive your tax-deductible receipt and know you're changing lives through recovery."
  }
]

const faqItems = [
  {
    question: "Do you provide free towing?",
    answer: "Yes! We provide free towing throughout Mississippi. Once you submit your donation form, we'll contact you to schedule a pickup time that works for your schedule."
  },
  {
    question: "What vehicles do you accept?",
    answer: "We accept cars, trucks, SUVs, motorcycles, boats, and RVs. The vehicle doesn't need to be running - we'll take it in any condition."
  },
  {
    question: "Do I need the title?",
    answer: "In most cases, yes, you'll need the title to donate your vehicle. If you've lost your title, we can help guide you through the process of obtaining a duplicate from the DMV."
  },
  {
    question: "How quickly will you pick up my vehicle?",
    answer: "We typically schedule pickups within 2-3 business days of receiving your donation form. In some cases, we can arrange same-day or next-day pickup."
  },
  {
    question: "Is my donation tax-deductible?",
    answer: "Yes! Mercy House Adult & Teen Challenge is a 501(c)(3) nonprofit organization. You'll receive a tax receipt for your donation that you can use when filing your taxes."
  },
  {
    question: "What happens to my donated vehicle?",
    answer: "Donated vehicles are either sold at auction or recycled, with 100% of the proceeds going directly to support our recovery and rehabilitation programs in Mississippi."
  }
]

export default function DonateCarPage() {
  return (
    <>
      {/* Video Hero Section */}
      <VideoHero {...heroData} />

      {/* 3-Step Process */}
      <ThreeStepProcess steps={processSteps} />

      {/* Why Donate to Mercy House */}
      <WhyMercyHouse />

      {/* Donation Form */}
      <section id="donation-form" className="py-16 bg-gray-50">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Donate Your Vehicle?</h2>
            <p className="text-lg text-gray-600">
              Fill out this form and we&apos;ll contact you within 24 hours to arrange free pickup.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <VehicleDonationForm />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about donating your vehicle
            </p>
          </div>
          <FAQ items={faqItems} />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            Your Vehicle Can Change Lives
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Every vehicle donated helps provide faith-based recovery services to men, women,
            and teens struggling with addiction in Mississippi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#donation-form"
              className="inline-block px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition"
            >
              Donate Your Vehicle
            </a>
            <a
              href="tel:6018582256"
              className="inline-block px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition"
            >
              Call (601) 858-2256
            </a>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA
        text="Donate a Car"
        link="#donation-form"
      />
    </>
  )
}