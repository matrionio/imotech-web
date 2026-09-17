'use client'

import { Suspense, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useForm as useFormspree } from '@formspree/react'
import { useSearchParams } from 'next/navigation'
import { Send, CheckCircle, AlertCircle, Car, Info } from 'lucide-react'
import { ContactFormData } from '@/types'
import { VEHICLES } from '@/utils/constants'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { useLanguage } from '@/context/LanguageContext'

const SERVICE_OPTIONS_EN = ['Airport Transfer', 'Corporate Transportation', 'Special Events', 'City Tours & Sightseeing', 'Hourly Service', 'Point-to-Point Transfer', 'Other']
const SERVICE_OPTIONS_FR = ['Transfert aéroport', 'Transport corporatif', 'Événements spéciaux', 'Visites de la ville', 'Service à l\'heure', 'Transfert direct', 'Autre']
const SERVICE_ID_TO_OPTION = {
  'airport-transfers': {
    en: 'Airport Transfer',
    fr: 'Transfert aéroport',
  },
  'corporate-transportation': {
    en: 'Corporate Transportation',
    fr: 'Transport corporatif',
  },
  'special-events': {
    en: 'Special Events',
    fr: 'Événements spéciaux',
  },
  'city-tours': {
    en: 'City Tours & Sightseeing',
    fr: 'Visites de la ville',
  },
  'hourly-service': {
    en: 'Hourly Service',
    fr: "Service à l'heure",
  },
  'point-to-point': {
    en: 'Point-to-Point Transfer',
    fr: 'Transfert direct',
  },
} as const

type ServiceId = keyof typeof SERVICE_ID_TO_OPTION

interface ContactFormProps {
  /**
   * Preselects a service when the form is embedded on a dedicated service
   * page. A `?service=` URL parameter takes precedence over this default.
   */
  defaultService?: ServiceId
}

function ContactFormInner({ defaultService }: ContactFormProps) {
  const [formspreeState, formspreeSubmit] = useFormspree('xpqokeoy')
  const { t, lang } = useLanguage()
  const f = t.form
  const searchParams = useSearchParams()
  // Validate the URL param: only accept known vehicle names to prevent
  // arbitrary text from appearing in the UI via crafted URLs.
  const rawVehicle = searchParams.get('vehicle')
  const selectedVehicle = rawVehicle && VEHICLES.some((v) => v.name === rawVehicle) ? rawVehicle : null

  const rawService = searchParams.get('service')

  // A ?service= URL parameter wins; otherwise fall back to the service this
  // form was embedded for, if any.
  const serviceId: ServiceId | undefined =
    rawService && rawService in SERVICE_ID_TO_OPTION
      ? (rawService as ServiceId)
      : defaultService

  const selectedService = serviceId ? SERVICE_ID_TO_OPTION[serviceId][lang] : ''

  const serviceOptions = lang === 'fr' ? SERVICE_OPTIONS_FR : SERVICE_OPTIONS_EN

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: {
      vehicle: selectedVehicle ?? '',
      serviceType: selectedService,
    },
  })

  useEffect(() => {
    if (selectedService) {
      setValue('serviceType', selectedService)
    }
  }, [selectedService, setValue])

  const leadEventSentRef = useRef(false)

  useEffect(() => {
    if (formspreeState.succeeded && !leadEventSentRef.current) {
      leadEventSentRef.current = true
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: 'lead_form_success',
        form_name: 'booking_request',
      })
    }
  }, [formspreeState.succeeded])

  const onSubmit = async (data: ContactFormData) => {
    await formspreeSubmit(data as never)
    reset()
  }

  if (formspreeState.succeeded) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <CheckCircle size={48} className="text-green-500" />
        <h3 className="text-2xl font-serif font-bold text-text">{f.successTitle}</h3>
        <p className="text-textLight max-w-sm">{f.successText}</p>
        <Button variant="outline" onClick={() => window.location.reload()}>{f.sendAnother}</Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200">
        <Info size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-amber-900 text-sm font-medium leading-snug">
          {lang === 'fr'
            ? 'Pas de réservation le jour même. Pour les trajets dans les 24h, veuillez nous contacter pour une demande de réservation.'
            : 'No same-day bookings. For trips within 24h, please contact us for a Booking Request.'}
        </p>
      </div>
      {selectedVehicle && (
        <div className="flex items-center gap-3 p-4 bg-primary border-l-4 border-secondary">
          <Car size={20} className="text-secondary flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">
              {lang === 'fr' ? 'Véhicule sélectionné' : 'Selected Vehicle'}
            </p>
            <p className="text-white font-semibold">{selectedVehicle}</p>
          </div>
        </div>
      )}

      {formspreeState.errors && formspreeState.errors.getFormErrors().length > 0 && (
        <div role="alert" className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
          <AlertCircle size={18} />
          <span>{f.errorText}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input id="fullName" label={f.fullName} required placeholder="John Smith" error={errors.fullName?.message} maxLength={100}
          {...register('fullName', { required: `${f.fullName} is required`, maxLength: { value: 100, message: 'Max 100 characters' } })} />
        <Input id="email" label={f.email} type="email" required placeholder="john@example.com" error={errors.email?.message}
          {...register('email', { required: `${f.email} is required`, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' } })} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input id="phone" label={f.phone} type="tel" required placeholder="+1 (438) 799-8049" error={errors.phone?.message} maxLength={30}
          {...register('phone', {
            required: `${f.phone} is required`,
            maxLength: { value: 30, message: 'Max 30 characters' },
            pattern: { value: /^[+]?[\d\s\-().]{7,30}$/, message: 'Invalid phone number' },
          })} />
        <div className="flex flex-col gap-1">
          <label htmlFor="serviceType" className="text-sm font-medium text-text">
            {f.serviceType} <span className="text-secondary">*</span>
          </label>
          <select id="serviceType" className="w-full px-4 py-3 bg-white border border-gray-200 text-text focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors duration-200"
            {...register('serviceType', { required: true })}>
            <option value="">{f.selectService}</option>
            {serviceOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="vehicle" className="text-sm font-medium text-text">
          {lang === 'fr' ? 'Véhicule préféré' : 'Preferred Vehicle'}
        </label>
        <select id="vehicle"
          className="w-full px-4 py-3 bg-white border border-gray-200 text-text focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors duration-200"
          {...register('vehicle' as keyof ContactFormData)}>
          <option value="">{lang === 'fr' ? 'Sélectionnez un véhicule' : 'Select a vehicle'}</option>
          {VEHICLES.map((v) => (
            <option key={v.id} value={v.name}>{v.name} — {v.model}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input id="date" label={f.date} type="date" {...register('date')} />
        <Input id="time" label={f.time} type="time" {...register('time')} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input id="passengers" label={f.passengers} type="number" min={1} max={20} placeholder="1" {...register('passengers', { min: 1, max: 20 })} />
        <Input id="luggage" label={f.luggage} type="number" min={0} max={20} placeholder="0" {...register('luggage', { min: 0, max: 20 })} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input id="pickupLocation" label={f.pickup} placeholder="123 Rue Sainte-Catherine, Montréal" maxLength={200} {...register('pickupLocation', { maxLength: { value: 200, message: 'Max 200 characters' } })} />
        <Input id="dropoffLocation" label={f.dropoff} placeholder="Aéroport Montréal-Trudeau (YUL)" maxLength={200} {...register('dropoffLocation', { maxLength: { value: 200, message: 'Max 200 characters' } })} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="specialRequests" className="text-sm font-medium text-text">{f.special}</label>
        <textarea id="specialRequests" rows={4} placeholder={f.specialPlaceholder} maxLength={1000}
          className="w-full px-4 py-3 bg-white border border-gray-200 text-text placeholder:text-textLight focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors duration-200 resize-none"
          {...register('specialRequests', { maxLength: { value: 1000, message: 'Max 1000 characters' } })} />
      </div>

      <Button type="submit" variant="primary" size="lg" fullWidth disabled={formspreeState.submitting} className="gap-2">
        {formspreeState.submitting ? f.sending : <><Send size={18} />{f.submit}</>}
      </Button>

      <p className="text-xs text-textLight text-center">
        {f.required.split('*')[0]}<span className="text-secondary">*</span>{f.required.split('*')[1]}
      </p>
    </form>
  )
}

export default function ContactForm({ defaultService }: ContactFormProps) {
  return (
    <Suspense fallback={<div className="h-96 animate-pulse bg-gray-50" />}>
      <ContactFormInner defaultService={defaultService} />
    </Suspense>
  )
}
