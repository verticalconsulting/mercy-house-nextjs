import { z } from 'zod'

// Contact Form Schema
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// Get Help Form Schema
export const getHelpFormSchema = z.object({
  // Personal Information
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Please enter a valid date'),
  gender: z.enum(['male', 'female', 'other']),

  // Contact Information
  phone: z.string().min(10, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address'),
  address: z.string().min(5, 'Please enter your address'),
  city: z.string().min(2, 'Please enter your city'),
  state: z.string().length(2, 'Please enter a 2-letter state code'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code'),

  // Program Interest
  programType: z.enum(['mens', 'womens', 'teen', 'family']),
  admissionDate: z.string().optional(),

  // Substance Use History
  substancesUsed: z.array(z.string()).min(1, 'Please select at least one substance'),
  yearsOfUse: z.string(),
  previousTreatment: z.boolean(),
  previousTreatmentDetails: z.string().optional(),

  // Emergency Contact
  emergencyName: z.string().min(2, 'Emergency contact name is required'),
  emergencyPhone: z.string().min(10, 'Emergency contact phone is required'),
  emergencyRelationship: z.string().min(2, 'Relationship is required'),

  // Additional Information
  referralSource: z.string().optional(),
  additionalInfo: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: 'You must consent to treatment to submit this form',
  }),
})

export type GetHelpFormData = z.infer<typeof getHelpFormSchema>

// Vehicle Donation Form Schema
export const vehicleDonationFormSchema = z.object({
  // Donor Information
  name: z.string().min(2, 'Name is required').max(100),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  address: z.string().min(5, 'Please enter your address'),
  city: z.string().min(2, 'Please enter your city'),
  state: z.string().length(2, 'Please enter a 2-letter state code'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code'),

  // Vehicle Information
  vehicleYear: z.string().regex(/^\d{4}$/, 'Please enter a valid 4-digit year'),
  vehicleMake: z.string().min(2, 'Vehicle make is required'),
  vehicleModel: z.string().min(1, 'Vehicle model is required'),
  vehicleMileage: z.string().regex(/^\d+$/, 'Please enter mileage as a number'),
  vehicleCondition: z.enum(['excellent', 'good', 'fair', 'poor', 'not-running']),

  // Title Information
  hasTitle: z.boolean(),
  titleLocation: z.string().optional(),
  lienholder: z.string().optional(),

  // Additional Details
  vehicleLocation: z.string().min(5, 'Vehicle location is required'),
  pickupAvailability: z.string().min(10, 'Please describe when the vehicle can be picked up'),
  additionalInfo: z.string().optional(),

  // Tax Receipt
  taxReceipt: z.boolean(),
  acknowledgment: z.boolean().refine((val) => val === true, {
    message: 'You must acknowledge the donation terms',
  }),
})

export type VehicleDonationFormData = z.infer<typeof vehicleDonationFormSchema>

// Volunteer Form Schema
export const volunteerFormSchema = z.object({
  name: z.string().min(2, 'Name is required').max(100),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  availability: z.array(z.string()).min(1, 'Please select at least one day'),
  interests: z.array(z.string()).min(1, 'Please select at least one area of interest'),
  experience: z.string().optional(),
  backgroundCheck: z.boolean().refine((val) => val === true, {
    message: 'Background check consent is required for volunteers',
  }),
  additionalInfo: z.string().optional(),
})

export type VolunteerFormData = z.infer<typeof volunteerFormSchema>

// Generic form submission type
export interface FormSubmission {
  formName: string
  data: Record<string, unknown>
  timestamp: Date
  ip?: string
  userAgent?: string
}

// Form configuration type
export interface FormConfig {
  name: string
  displayName: string
  recipients: string[]
  successMessage: string
  emailSubject?: string
  enableGoogleSheets?: boolean
  googleSheetId?: string
  googleSheetTab?: string
  active: boolean
}