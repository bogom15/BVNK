import React from 'react';
import useCountdown from '../hooks/useCountdown';
import { QuoteResponse } from '../types/api';

const QuoteSummary = ({ quote, onConfirm }: { quote: QuoteResponse; onConfirm: () => void }) => {
  const countdown = useCountdown(quote.acceptanceExpiryDate);

  return (
    <div className="bg-white p-4 shadow rounded">
      <div className="mb-2">
        <strong>Amount due:</strong> {quote.paidCurrency.amount} {quote.paidCurrency.currency}
      </div>
      <div className="mb-4">
        <strong>Quoted price expires in:</strong> {countdown}
      </div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={onConfirm}
      >
        Confirm
      </button>
    </div>
  );
};

export default QuoteSummary;