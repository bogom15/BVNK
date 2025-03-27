import React from 'react';
import { QuoteResponse } from '../types/api';
import useCountdown from '../hooks/useCountdown';
import { QRCodeSVG } from 'qrcode.react';

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    alert('Copied to clipboard');
  } catch (err) {
    console.error('Failed to copy', err);
  }
};

const PaymentDetails = ({ quote }: { quote: QuoteResponse }) => {
  const countdown = useCountdown(quote.expiryDate);
  return (
    <div className="bg-white p-4 shadow rounded space-y-4">
      <div>
        <strong>Amount due:</strong>{' '}
        <span
          className="cursor-pointer underline"
          onClick={() => copyToClipboard(quote.paidCurrency.amount)}
        >
          {quote.paidCurrency.amount} {quote.paidCurrency.currency}
        </span>
      </div>
      <div>
        <strong>Address:</strong>{' '}
        <span
          className="cursor-pointer underline"
          onClick={() => copyToClipboard(quote.address.address)}
        >
          {quote.address.address}
        </span>
      </div>
      <div>
        <strong>Time left to pay:</strong> {countdown}
      </div>
      <div className="mt-4">
        <QRCodeSVG value={quote.address.address} size={200} />
      </div>
    </div>
  );
};

export default PaymentDetails;
