interface Step {
  number: string
  title: string
  description: string
  icon?: React.ReactNode
}

interface ThreeStepProcessProps {
  steps: Step[]
  title?: string
}

export function ThreeStepProcess({ steps, title = "How It Works" }: ThreeStepProcessProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {title}
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              {/* Step Number */}
              <div className="inline-flex items-center justify-center w-20 h-20 mb-6 text-3xl font-bold text-white bg-primary rounded-full">
                {step.number}
              </div>

              {/* Connector Line (not on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-full h-0.5 bg-gray-300">
                  <div className="absolute right-0 -top-2 w-0 h-0 border-t-[6px] border-t-transparent border-l-[12px] border-l-gray-300 border-b-[6px] border-b-transparent" />
                </div>
              )}

              {/* Content */}
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}