import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from '@/components/SearchBar'

describe('SearchBar', () => {
  it('renders a search input', () => {
    render(<SearchBar value='' onChange={() => {}} />)
    expect(screen.getByRole('searchbox')).toBeInTheDocument()
  })

  it('displays the current search value', () => {
    render(<SearchBar value='keyboard' onChange={() => {}} />)
    expect(screen.getByRole('searchbox')).toHaveValue('keyboard')
  })

  it('calls onChange when the user types', async () => {
    const handleChange = jest.fn()
    render(<SearchBar value='' onChange={handleChange} />)
    await userEvent.type(screen.getByRole('searchbox'), 'mouse')
    expect(handleChange).toHaveBeenCalled()
  })

  it('renders a placeholder text', () => {
    render(<SearchBar value='' onChange={() => {}} />)
    expect(
      screen.getByPlaceholderText('Search products...'),
    ).toBeInTheDocument()
  })
})
