import type { Metadata } from 'next'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { VideoHero } from '@/components/blocks/VideoHero'
import { Button } from '@/components/ui/button'
import { Heart, Users, Home, BookOpen, Phone, ArrowRight } from 'lucide-react'

// Query to fetch homepage data from Sanity
const homePageQuery = `*[_type == "page" && slug.current == "home"][0] {
  title,
  pageBuilder[] {
    _type,
    _key,
    _type == "videoHero" => {
      heading,
      subheading,
      videoUrl,
      posterImage,
      overlayOpacity,
      buttons[] {
        _key,
        text,
        link,
        style,
        scrollToForm,
        trackDonation
      },
      trustRow
    },
    _type == "contentBlock" => {
      heading,
      content,
      layout
    },
    _type == "ctaSection" => {
      heading,
      description,
      backgroundColor,
      alignment,
      buttons[] {
        _key,
        text,
        link,
        style,
        trackDonation
      }
    },
    _type == "faq" => {
      heading,
      description,
      faqs[] {
        _key,
        question,
        answer
      }
    }
  },
  seo {
    metaTitle,
    metaDescription,
    metaKeywords
  }
}`

// Static programs data (not yet in Sanity)
const programs = [
  {
    title: "Men's Program",
    description: "12-month residential program providing comprehensive addiction recovery for adult men.",
    icon: <Users className="w-8 h-8" />,
    link: "/programs/mens"
  },
  {
    title: "Women's Program",
    description: "Safe, nurturing environment for women to heal and rebuild their lives through faith.",
    icon: <Heart className="w-8 h-8" />,
    link: "/programs/womens"
  },
  {
    title: "Teen Program",
    description: "Specialized treatment for adolescents struggling with substance abuse and life challenges.",
    icon: <BookOpen className="w-8 h-8" />,
    link: "/programs/teen"
  },
  {
    title: "Family Program",
    description: "Supporting families affected by addiction with counseling and restoration services.",
    icon: <Home className="w-8 h-8" />,
    link: "/programs/family"
  }
]

const stats = [
  { number: "40+", label: "Years of Service" },
  { number: "500+", label: "Lives Transformed" },
  { number: "85%", label: "Success Rate" },
  { number: "24/7", label: "Support Available" },
]

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch(homePageQuery)

  return {
    title: page?.seo?.metaTitle || 'Mercy House Adult & Teen Challenge - Faith-Based Recovery in Mississippi',
    description: page?.seo?.metaDescription || 'Transforming lives through Christ-centered addiction recovery programs. Residential treatment for men, women, and teens in Mississippi.',
  }
}

export default async function HomePage() {
  const page = await client.fetch(homePageQuery)

  // Find the video hero from pageBuilder
  type PageBlock = { _type: string; [key: string]: unknown }
  const videoHero = page?.pageBuilder?.find((block: PageBlock) => block._type === 'videoHero')

  // Fallback if no data from Sanity
  const heroData = videoHero || {
    heading: "Freedom from Addiction Through Faith",
    subheading: "Christ-centered recovery programs for men, women, and teens in Mississippi",
    videoUrl: "/videos/hero-background.mp4",
    buttons: [
      { text: "Get Help Now", link: "/get-help", style: "default" as const },
      { text: "Donate", link: "https://givevirtuous.org/mercyhouse", style: "outline-white" as const, trackDonation: true },
    ],
  }

  return (
    <>
      {/* Hero Section */}
      <VideoHero {...heroData} />

      {/* Quick Stats */}
      <section className="py-12 bg-primary text-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm md:text-base opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Recovery Programs</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Faith-based residential treatment programs designed to address the root causes
              of addiction and provide lasting transformation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programs.map((program, index) => (
              <Link
                key={index}
                href={program.link}
                className="group bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="text-primary mb-4 group-hover:scale-110 transition-transform">
                  {program.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {program.title}
                </h3>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <span className="inline-flex items-center text-primary font-semibold">
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-8">
              Mercy House Adult & Teen Challenge exists to provide faith-based recovery and
              rehabilitation services to individuals and families affected by addiction.
              Through the transforming power of Jesus Christ, we help people break free from
              addiction, restore relationships, and rebuild their lives with purpose and dignity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/about">Learn About Our Mission</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/success-stories">Read Success Stories</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Get Help CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-orange-600 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Help? We&apos;re Here 24/7
            </h2>
            <p className="text-xl mb-8 opacity-95">
              Don&apos;t wait another day. Take the first step toward freedom from addiction.
              Our caring staff is ready to help you or your loved one begin the journey to recovery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/get-help">Get Help Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-primary">
                <a href="tel:6018582256">
                  <Phone className="w-4 h-4 mr-2" />
                  Call (601) 858-2256
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Ways to Support */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ways to Support Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your support makes recovery possible for those who cannot afford treatment.
              Every donation changes lives.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Make a Donation</h3>
              <p className="text-gray-600 mb-4">
                Your financial support provides treatment for those in need.
              </p>
              <Button asChild>
                <a href="https://givevirtuous.org/mercyhouse" target="_blank" rel="noopener noreferrer">
                  Donate Now
                </a>
              </Button>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Donate a Vehicle</h3>
              <p className="text-gray-600 mb-4">
                Turn your car into life-changing support with free pickup.
              </p>
              <Button asChild variant="outline">
                <Link href="/donate-a-car">Learn More</Link>
              </Button>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Volunteer</h3>
              <p className="text-gray-600 mb-4">
                Share your time and talents to support recovery.
              </p>
              <Button asChild variant="outline">
                <Link href="/volunteer">Get Involved</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
