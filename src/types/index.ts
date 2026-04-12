export interface Service {
  id: string
  title: string
  description: string
  benefits: string[]
  icon: string
  slug: string
}

export interface Vehicle {
  id: string
  name: string
  model: string
  capacity: number
  luggage: number
  amenities: string[]
  images: string[]
  category: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
}

export interface ContactFormData {
  fullName: string
  email: string
  phone: string
  serviceType: string
  vehicle: string
  date: string
  pickupLocation: string
  dropoffLocation: string
  time: string
  passengers: number
  luggage: number
  specialRequests: string
}

export interface NavLink {
  label: string
  href: string
}

export interface SocialLink {
  platform: string
  href: string
  icon: string
}
