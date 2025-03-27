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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-xl font-semibold text-gray-900 mb-6 text-center">Accept Quote</h1>
        {loading && <div className="text-gray-600 text-center">Loading...</div>}
        {!loading && quote && (
          <>
            <div className="text-center mb-6">
              <div className="text-sm text-gray-500 mb-1">Merchant Display Name</div>
              <div className="text-3xl font-bold">
                {quote.paidCurrency.amount} {quote.paidCurrency.currency}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Reference: <span className="font-semibold">REF292970</span>
              </div>
            </div>
            <CurrencySelector selected={selectedCurrency} onChange={handleCurrencyChange} />
            <QuoteSummary quote={quote} onConfirm={handleConfirm} />
          </>
        )}
      </div>
    </div>
  );
};

export default AcceptQuote;