import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuoteSummary } from '../lib/api';
import { QuoteResponse } from '../types/api';
import PaymentDetails from '../components/PaymentDetails';

const PayQuote: React.FC = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [quote, setQuote] = useState<QuoteResponse | null>(null);

  useEffect(() => {
    const fetchQuote = async () => {
      const res = await getQuoteSummary(uuid!);
      if (res.status === 'EXPIRED') navigate(`/payin/${uuid}/expired`);
      setQuote(res);
    };
    fetchQuote();
  }, [uuid, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow p-8 w-full max-w-md text-center">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Pay with {quote?.paidCurrency.currency}
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          To complete this payment send the amount due to the BTC address provided below.
        </p>
        {quote && <PaymentDetails quote={quote} />}
      </div>
    </div>
  );
};

export default PayQuote;