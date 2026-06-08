import { FormData } from '@/types/form'

export function StepPayment({
  data,
  onChange,
  onNext,
  onBack,
}: {
  data: Pick<FormData, 'cardNumber'>
  onChange: (field: keyof FormData, value: string) => void
  onNext: () => void
  onBack: () => void
}) {
  const isValid = data.cardNumber.trim() !== ''

  return (
    <div>
      <h2>Step 2 — Payment</h2>

      <div>
        <label htmlFor='cardNumber'>Card Number</label>
        <input
          id='cardNumber'
          type='text'
          value={data.cardNumber}
          onChange={(e) => onChange('cardNumber', e.target.value)}
        />
      </div>

      <button onClick={onBack}>Back</button>
      <button onClick={onNext} disabled={!isValid}>
        Next
      </button>
    </div>
  )
}
