'use client'

import { useState, useCallback, useMemo } from 'react'
import {
  Check,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  MapPin,
  Package,
  PartyPopper,
} from 'lucide-react'
import type { FormData } from '@/types/form'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/cn'

function StepShipping({
  data,
  onChange,
  onNext,
  isValid,
}: {
  data: Pick<FormData, 'fullName' | 'address'>
  onChange: (field: keyof FormData, value: string) => void
  onNext: () => void
  isValid: boolean
}) {
  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-3'>
        <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand'>
          <MapPin className='h-5 w-5' aria-hidden='true' />
        </div>
        <h2 className='text-xl font-semibold text-foreground'>
          Step 1 — Shipping
        </h2>
      </div>

      <div className='space-y-4'>
        <div>
          <label
            htmlFor='fullName'
            className='mb-1.5 block text-sm font-medium text-foreground'
          >
            Full Name
          </label>
          <Input
            id='fullName'
            type='text'
            value={data.fullName}
            onChange={(e) => onChange('fullName', e.target.value)}
            placeholder='John Doe'
          />
        </div>

        <div>
          <label
            htmlFor='address'
            className='mb-1.5 block text-sm font-medium text-foreground'
          >
            Address
          </label>
          <Input
            id='address'
            type='text'
            value={data.address}
            onChange={(e) => onChange('address', e.target.value)}
            placeholder='123 Main St, City, State'
          />
        </div>
      </div>

      <div className='flex justify-end'>
        <Button onClick={onNext} disabled={!isValid}>
          Next
          <ChevronRight className='h-4 w-4' aria-hidden='true' />
        </Button>
      </div>
    </div>
  )
}

function StepPayment({
  data,
  onChange,
  onNext,
  onBack,
  isValid,
}: {
  data: Pick<FormData, 'cardNumber'>
  onChange: (field: keyof FormData, value: string) => void
  onNext: () => void
  onBack: () => void
  isValid: boolean
}) {
  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-3'>
        <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand'>
          <CreditCard className='h-5 w-5' aria-hidden='true' />
        </div>
        <h2 className='text-xl font-semibold text-foreground'>
          Step 2 — Payment
        </h2>
      </div>

      <div>
        <label
          htmlFor='cardNumber'
          className='mb-1.5 block text-sm font-medium text-foreground'
        >
          Card Number
        </label>
        <Input
          id='cardNumber'
          type='text'
          value={data.cardNumber}
          onChange={(e) => onChange('cardNumber', e.target.value)}
          placeholder='4111 1111 1111 1111'
        />
      </div>

      <div className='flex justify-between'>
        <Button variant='secondary' onClick={onBack}>
          <ChevronLeft className='h-4 w-4' aria-hidden='true' />
          Back
        </Button>
        <Button onClick={onNext} disabled={!isValid}>
          Next
          <ChevronRight className='h-4 w-4' aria-hidden='true' />
        </Button>
      </div>
    </div>
  )
}

function StepConfirmation({
  data,
  onBack,
  onSubmit,
}: {
  data: FormData
  onBack: () => void
  onSubmit: () => void
}) {
  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-3'>
        <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand'>
          <Package className='h-5 w-5' aria-hidden='true' />
        </div>
        <h2 className='text-xl font-semibold text-foreground'>
          Step 3 — Review your order
        </h2>
      </div>

      <div className='space-y-3 rounded-lg border border-border bg-muted/50 p-4'>
        <div className='flex justify-between text-sm'>
          <span className='text-muted-foreground'>Name</span>
          <span className='font-medium text-foreground'>{data.fullName}</span>
        </div>
        <div className='flex justify-between text-sm'>
          <span className='text-muted-foreground'>Address</span>
          <span className='font-medium text-foreground'>{data.address}</span>
        </div>
        <div className='flex justify-between text-sm'>
          <span className='text-muted-foreground'>Payment</span>
          <span className='font-medium text-foreground'>
            Card ending in {data.cardNumber.slice(-4)}
          </span>
        </div>
      </div>

      <div className='flex justify-between'>
        <Button variant='secondary' onClick={onBack}>
          <ChevronLeft className='h-4 w-4' aria-hidden='true' />
          Back
        </Button>
        <Button onClick={onSubmit}>Confirm</Button>
      </div>
    </div>
  )
}

function StepSuccess() {
  return (
    <div className='py-8 text-center'>
      <div className='mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success-muted text-success'>
        <PartyPopper className='h-8 w-8' aria-hidden='true' />
      </div>
      <h2 className='text-2xl font-bold text-foreground'>Order Placed!</h2>
      <p className='mt-3 text-muted-foreground'>
        Thank you for your purchase. Your order has been placed successfully.
      </p>
    </div>
  )
}

type Step = 1 | 2 | 3 | 'success'

const STEPS = [
  { id: 1, label: 'Shipping' },
  { id: 2, label: 'Payment' },
  { id: 3, label: 'Review' },
] as const

export default function CheckoutForm() {
  const [step, setStep] = useState<Step>(1)
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    address: '',
    cardNumber: '',
  })

  const handleChange = useCallback((field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }, [])

  const goNext = useCallback(() => {
    setStep((prev) => {
      if (prev === 1) return 2
      if (prev === 2) return 3
      return prev
    })
  }, [])

  const goBack = useCallback(() => {
    setStep((prev) => {
      if (prev === 2) return 1
      if (prev === 3) return 2
      return prev
    })
  }, [])

  const handleSubmit = useCallback(() => {
    setStep('success')
  }, [])

  const shippingValid = useMemo(
    () => formData.fullName.trim() !== '' && formData.address.trim() !== '',
    [formData.fullName, formData.address],
  )

  const paymentValid = useMemo(
    () => formData.cardNumber.trim() !== '',
    [formData.cardNumber],
  )

  const progressPercent = useMemo(() => {
    if (step === 1) return 33
    if (step === 2) return 66
    if (step === 3 || step === 'success') return 100
    return 0
  }, [step])

  if (step === 'success') return <StepSuccess />

  const currentStep = step as 1 | 2 | 3

  return (
    <div className='checkout-form'>
      <div className='mb-8'>
        <div className='mb-4 flex items-center justify-between'>
          {STEPS.map((s, i) => {
            const isActive = currentStep === s.id
            const isComplete = currentStep > s.id

            return (
              <div key={s.id} className='flex flex-1 items-center'>
                <div className='flex flex-col items-center gap-1.5'>
                  <div
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-base',
                      isActive && 'bg-brand text-brand-foreground',
                      isComplete && 'bg-brand text-brand-foreground',
                      !isActive &&
                        !isComplete &&
                        'bg-muted text-muted-foreground',
                    )}
                  >
                    {isComplete ? (
                      <Check className='h-4 w-4' aria-hidden='true' />
                    ) : (
                      s.id
                    )}
                  </div>
                  <span
                    className={cn(
                      'hidden text-xs font-medium sm:block',
                      isActive ? 'text-foreground' : 'text-muted-foreground',
                    )}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={cn(
                      'mx-2 h-0.5 flex-1 transition-base',
                      isComplete ? 'bg-brand' : 'bg-border',
                    )}
                    aria-hidden='true'
                  />
                )}
              </div>
            )
          })}
        </div>

        <div className='h-2 w-full overflow-hidden rounded-full bg-muted'>
          <div
            role='progressbar'
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            className='h-full rounded-full bg-brand transition-all duration-500 ease-out'
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <Card className='p-6 sm:p-8'>
        {step === 1 && (
          <StepShipping
            data={formData}
            onChange={handleChange}
            onNext={goNext}
            isValid={shippingValid}
          />
        )}

        {step === 2 && (
          <StepPayment
            data={formData}
            onChange={handleChange}
            onNext={goNext}
            onBack={goBack}
            isValid={paymentValid}
          />
        )}

        {step === 3 && (
          <StepConfirmation
            data={formData}
            onBack={goBack}
            onSubmit={handleSubmit}
          />
        )}
      </Card>
    </div>
  )
}
