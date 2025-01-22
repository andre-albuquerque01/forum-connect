import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '../app/page'
 
test('Home', () => {
  render(<Home />)
  const heading = screen.getByRole('heading', { level: 1, name: 'Welcome to the Forum!' })
  expect(heading).toBeDefined()
})