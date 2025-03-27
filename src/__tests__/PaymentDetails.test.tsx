import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import PaymentDetails from '../components/PaymentDetails';

const mockQuote = {
  paidCurrency: {
    amount: '0.05',
    currency: 'BTC',
  },
  address: {
    address: 'bc1qtestaddressxyz',
  },
  expiryDate: new Date(Date.now() + 60_000).toISOString(),
} as any;

describe('PaymentDetails', () => {
  it('renders amount and address', () => {
    render(<PaymentDetails quote={mockQuote} />);
    expect(screen.getByText(/0.05 BTC/)).toBeInTheDocument();
    expect(screen.getByText(/bc1qtestaddressxyz/)).toBeInTheDocument();
  });

  it('copies amount and address to clipboard', async () => {
    navigator.clipboard.writeText = vi.fn();
    render(<PaymentDetails quote={mockQuote} />);

    fireEvent.click(screen.getByText(/0.05 BTC/));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('0.05');

    fireEvent.click(screen.getByText(/bc1qtestaddressxyz/));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('bc1qtestaddressxyz');
  });
});