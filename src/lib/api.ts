import axios from 'axios';
import { QuoteResponse } from '../types/api';

const BASE_URL = 'https://api.sandbox.bvnk.com/api/v1/pay';

export const getQuoteSummary = async (uuid: string): Promise<QuoteResponse> => {
  const res = await axios.get(`${BASE_URL}/${uuid}/summary`);
  return res.data;
};

export const updateCurrency = async (uuid: string, currency: string): Promise<QuoteResponse> => {
  const res = await axios.put(`${BASE_URL}/${uuid}/update/summary`, {
    currency,
    payInMethod: 'crypto',
  });
  return res.data;
};

export const acceptQuote = async (uuid: string): Promise<void> => {
  await axios.put(`${BASE_URL}/${uuid}/accept/summary`, {
    successUrl: 'no_url',
  });
};