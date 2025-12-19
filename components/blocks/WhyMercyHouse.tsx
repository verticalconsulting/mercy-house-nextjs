import { Heart, Users, Home, BookOpen, CheckCircle } from 'lucide-react'

export function WhyMercyHouse() {
  const impactPoints = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Faith-Based Recovery",
      description: "Your donation supports Christ-centered rehabilitation programs that transform lives."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Comprehensive Care",
      description: "Programs for men, women, teens, and families affected by addiction."
    },
    {
      icon: <Home className="w-6 h-6" />,
      title: "Residential Treatment",
      description: "Safe housing, meals, and 24/7 support for those in recovery."
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Life Skills Training",
      description: "Education, job training, and counseling to build sustainable futures."
    }
  ]

  const missionHighlights = [
    "Over 40 years of service in Mississippi",
    "Hundreds of lives transformed",
    "No one turned away for inability to pay",
    "Licensed and accredited programs",
    "Professional counseling and support"
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Donate to Mercy House?
          </h2>
          <p className="text-lg text-gray-600">
            Your vehicle donation directly funds life-changing recovery programs.
            Every car, truck, or vehicle you donate helps someone break free from addiction.
          </p>
        </div>

        {/* Impact Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {impactPoints.map((point, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 text-primary bg-primary/10 rounded-full">
                {point.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{point.title}</h3>
              <p className="text-sm text-gray-600">{point.description}</p>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                Mercy House Adult & Teen Challenge provides faith-based recovery and rehabilitation
                services to individuals and families affected by addiction. Through the power of
                Christ and comprehensive treatment, we help people rebuild their lives and restore
                their families.
              </p>
              <a
                href="/about"
                className="inline-flex items-center text-primary font-semibold hover:underline"
              >
                Learn more about our mission
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-primary">What Your Donation Provides:</h4>
              <ul className="space-y-3">
                {missionHighlights.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}