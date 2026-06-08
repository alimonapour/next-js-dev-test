import { ChangeEvent } from 'react'
import { Search } from 'lucide-react'
import Input from '@/components/ui/Input'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <Input
      type='search'
      role='searchbox'
      placeholder='Search products...'
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      leadingIcon={<Search className='h-4 w-4' aria-hidden='true' />}
      className='h-11'
    />
  )
}
