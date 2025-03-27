import React from 'react';

const currencies = ['BTC', 'ETH', 'LTC'];

const CurrencySelector = ({ selected, onChange }: { selected: string; onChange: (val: string) => void }) => {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">Pay with</label>
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="border px-4 py-2 rounded w-full"
      >
        {currencies.map((cur) => (
          <option key={cur} value={cur}>
            {cur}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;