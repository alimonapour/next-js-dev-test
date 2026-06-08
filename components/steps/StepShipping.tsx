import { FormData } from '@/types/form'

export function StepShipping({
  data,
  onChange,
  onNext,
}: {
  data: Pick<FormData, 'fullName' | 'address'>
  onChange: (field: keyof FormData, value: string) => void
  onNext: () => void
}) {
  const isValid = data.fullName.trim() !== '' && data.address.trim() !== ''

  return (
    <div>
      <h2>Step 1 — Shipping</h2>

      <div>
        <label htmlFor='fullName'>Full Name</label>
        <input
          id='fullName'
          type='text'
          value={data.fullName}
          onChange={(e) => onChange('fullName', e.target.value)}
        />
      </div>

      <div>
        <label htmlFor='address'>Address</label>
        <input
          id='address'
          type='text'
          value={data.address}
          onChange={(e) => onChange('address', e.target.value)}
        />
      </div>

      <button onClick={onNext} disabled={!isValid}>
        Next
      </button>
    </div>
  )
}
