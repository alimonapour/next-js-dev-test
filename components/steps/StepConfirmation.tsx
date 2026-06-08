import { FormData } from '@/types/form'

export function StepConfirmation({
  data,
  onBack,
  onSubmit,
}: {
  data: FormData
  onBack: () => void
  onSubmit: () => void
}) {
  return (
    <div>
      <h2>Step 3 — Review your order</h2>

      <p>{data.fullName}</p>
      <p>{data.address}</p>
      <p>Card ending in {data.cardNumber.slice(-4)}</p>

      <button onClick={onBack}>Back</button>
      <button onClick={onSubmit}>Confirm</button>
    </div>
  )
}
