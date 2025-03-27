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
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Pay with {quote?.paidCurrency.currency || ''}
      </h1>
      {quote && <PaymentDetails quote={quote} />}
    </div>
  );
};

export default PayQuote;