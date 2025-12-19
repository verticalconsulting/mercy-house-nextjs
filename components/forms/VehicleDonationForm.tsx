'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { vehicleDonationFormSchema, type VehicleDonationFormData } from '@/lib/validation/forms'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react'

export function VehicleDonationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<VehicleDonationFormData>({
    resolver: zodResolver(vehicleDonationFormSchema),
    defaultValues: {
      hasTitle: true,
      taxReceipt: true,
    }
  })

  const hasTitle = watch('hasTitle')

  const onSubmit = async (data: VehicleDonationFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/forms/donate-car', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        reset()
        // Track successful donation form submission
        import('@/lib/gtag').then(({ trackEvent }) => {
          trackEvent('form_submit', {
            form_type: 'vehicle_donation',
            event_category: 'donations',
          })
        })
      } else {
        throw new Error(result.error || 'Failed to submit form')
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Success Message */}
      {submitStatus === 'success' && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Thank you for your vehicle donation! We&apos;ll contact you within 24 hours to arrange pickup.
          </AlertDescription>
        </Alert>
      )}

      {/* Error Message */}
      {submitStatus === 'error' && (
        <Alert className="bg-red-50 border-red-200">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            {errorMessage || 'There was an error submitting the form. Please try again.'}
          </AlertDescription>
        </Alert>
      )}

      {/* Donor Information */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Your Information</h3>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              {...register('name')}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              type="tel"
              {...register('phone')}
              placeholder="(601) 555-0000"
              className={errors.phone ? 'border-red-500' : ''}
            />
            {errors.phone && (
              <p className="text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Street Address *</Label>
            <Input
              id="address"
              {...register('address')}
              className={errors.address ? 'border-red-500' : ''}
            />
            {errors.address && (
              <p className="text-sm text-red-600">{errors.address.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              {...register('city')}
              className={errors.city ? 'border-red-500' : ''}
            />
            {errors.city && (
              <p className="text-sm text-red-600">{errors.city.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                {...register('state')}
                placeholder="MS"
                maxLength={2}
                className={errors.state ? 'border-red-500' : ''}
              />
              {errors.state && (
                <p className="text-sm text-red-600">{errors.state.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="zipCode">ZIP Code *</Label>
              <Input
                id="zipCode"
                {...register('zipCode')}
                placeholder="12345"
                className={errors.zipCode ? 'border-red-500' : ''}
              />
              {errors.zipCode && (
                <p className="text-sm text-red-600">{errors.zipCode.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Information */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Vehicle Information</h3>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="vehicleYear">Year *</Label>
            <Input
              id="vehicleYear"
              {...register('vehicleYear')}
              placeholder="2010"
              maxLength={4}
              className={errors.vehicleYear ? 'border-red-500' : ''}
            />
            {errors.vehicleYear && (
              <p className="text-sm text-red-600">{errors.vehicleYear.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicleMake">Make *</Label>
            <Input
              id="vehicleMake"
              {...register('vehicleMake')}
              placeholder="Toyota"
              className={errors.vehicleMake ? 'border-red-500' : ''}
            />
            {errors.vehicleMake && (
              <p className="text-sm text-red-600">{errors.vehicleMake.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicleModel">Model *</Label>
            <Input
              id="vehicleModel"
              {...register('vehicleModel')}
              placeholder="Camry"
              className={errors.vehicleModel ? 'border-red-500' : ''}
            />
            {errors.vehicleModel && (
              <p className="text-sm text-red-600">{errors.vehicleModel.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicleMileage">Mileage *</Label>
            <Input
              id="vehicleMileage"
              {...register('vehicleMileage')}
              placeholder="85000"
              className={errors.vehicleMileage ? 'border-red-500' : ''}
            />
            {errors.vehicleMileage && (
              <p className="text-sm text-red-600">{errors.vehicleMileage.message}</p>
            )}
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="vehicleCondition">Condition *</Label>
            <select
              id="vehicleCondition"
              {...register('vehicleCondition')}
              className={`w-full px-3 py-2 border rounded-md ${errors.vehicleCondition ? 'border-red-500' : 'border-input'}`}
            >
              <option value="">Select condition</option>
              <option value="excellent">Excellent - Like new</option>
              <option value="good">Good - Minor wear</option>
              <option value="fair">Fair - Some repairs needed</option>
              <option value="poor">Poor - Major repairs needed</option>
              <option value="not-running">Not Running</option>
            </select>
            {errors.vehicleCondition && (
              <p className="text-sm text-red-600">{errors.vehicleCondition.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Title Information */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Title Information</h3>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="hasTitle"
              {...register('hasTitle')}
              className="rounded border-gray-300"
            />
            <Label htmlFor="hasTitle">I have the vehicle title</Label>
          </div>

          {!hasTitle && (
            <div className="space-y-2">
              <Label htmlFor="titleLocation">Where is the title? (if applicable)</Label>
              <Input
                id="titleLocation"
                {...register('titleLocation')}
                placeholder="Lost, at the bank, etc."
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="lienholder">Lienholder Information (if applicable)</Label>
            <Input
              id="lienholder"
              {...register('lienholder')}
              placeholder="Bank name if there's a loan"
            />
          </div>
        </div>
      </div>

      {/* Pickup Information */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Pickup Details</h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="vehicleLocation">Vehicle Location *</Label>
            <Input
              id="vehicleLocation"
              {...register('vehicleLocation')}
              placeholder="Address where vehicle can be picked up"
              className={errors.vehicleLocation ? 'border-red-500' : ''}
            />
            {errors.vehicleLocation && (
              <p className="text-sm text-red-600">{errors.vehicleLocation.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pickupAvailability">When is the vehicle available for pickup? *</Label>
            <Textarea
              id="pickupAvailability"
              {...register('pickupAvailability')}
              placeholder="e.g., Weekdays after 5pm, anytime with 24hr notice"
              rows={3}
              className={errors.pickupAvailability ? 'border-red-500' : ''}
            />
            {errors.pickupAvailability && (
              <p className="text-sm text-red-600">{errors.pickupAvailability.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalInfo">Additional Information (optional)</Label>
            <Textarea
              id="additionalInfo"
              {...register('additionalInfo')}
              placeholder="Any other details about the vehicle or special instructions"
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Acknowledgments */}
      <div className="space-y-4">
        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            id="acknowledgment"
            {...register('acknowledgment')}
            className="rounded border-gray-300 mt-1"
          />
          <Label htmlFor="acknowledgment" className="text-sm font-normal">
            I acknowledge that I am the legal owner of this vehicle and have the right to donate it.
            I understand that Mercy House ATC will provide a tax receipt after the vehicle is processed. *
          </Label>
        </div>
        {errors.acknowledgment && (
          <p className="text-sm text-red-600">{errors.acknowledgment.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto"
        size="lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Vehicle Donation'
        )}
      </Button>
    </form>
  )
}