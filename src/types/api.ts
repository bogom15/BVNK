export interface QuoteResponse {
    status: string;
    quoteStatus: string;
    acceptanceExpiryDate: string;
    paidCurrency: {
      amount: string;
      currency: string;
    };
    address: {
      address: string;
    };
    expiryDate: string;
  }