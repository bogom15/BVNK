import React from 'react';
import { render, screen } from '@testing-library/react';
import Expired from '../pages/Expired';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('Expired Page', () => {
  it('renders expired message and back button', () => {
    render(
      <BrowserRouter>
        <Expired />
      </BrowserRouter>
    );

    expect(screen.getByText('Payment details expired')).toBeInTheDocument();
    expect(
      screen.getByText('The payment details for your transaction have expired.')
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /go back home/i })).toBeInTheDocument();
  });
});