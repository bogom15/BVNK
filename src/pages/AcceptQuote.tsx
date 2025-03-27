import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CurrencySelector from '../components/CurrencySelector';
import QuoteSummary from '../components/QuoteSummary';
import { getQuoteSummary, updateCurrency, acceptQuote } from '../lib/api';
import { QuoteResponse } from '../types/api';

const AcceptQuote: React.FC = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('BTC');
  const [loading, setLoading] = useState(true);

  const fetchQuote = useCallback(async () => {
    try {
      const res = await getQuoteSummary(uuid!);
      handleRedirects(res);
      setQuote(res);
    } finally {
      setLoading(false);
    }
  }, [uuid]);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  // Auto-refresh on expiry
  useEffect(() => {
    if (!quote) return;
    const expiry = new Date(quote.acceptanceExpiryDate).getTime();
    const now = Date.now();
    const delay = expiry - now - 1000;
    const timeout = setTimeout(fetchQuote, delay);
    return () => clearTimeout(timeout);
  }, [quote, fetchQuote]);

  const handleRedirects = (res: QuoteResponse) => {
    if (res.status === 'EXPIRED') navigate(`/payin/${uuid}/expired`);
    if (res.quoteStatus === 'ACCEPTED') navigate(`/payin/${uuid}/pay`);
  };

  const handleCurrencyChange = async (currency: string) => {
    setSelectedCurrency(currency);
    const res = await updateCurrency(uuid!, currency);
    setQuote(res);
  };

  const handleConfirm = async () => {
    await acceptQuote(uuid!);
    navigate(`/payin/${uuid}/pay`);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Accept Quote</h1>
      {loading && <div>Loading...</div>}
      {!loading && quote && (
        <>
          <CurrencySelector selected={selectedCurrency} onChange={handleCurrencyChange} />
          <QuoteSummary quote={quote} onConfirm={handleConfirm} />
        </>
      )}
    </div>
  );
};

export default AcceptQuote;