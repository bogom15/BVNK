import React from 'react';
import { AlertTriangle } from 'lucide-react';

const Expired: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow p-8 max-w-md text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-3 rounded-full">
            <AlertTriangle className="text-red-500 w-6 h-6" />
          </div>
        </div>
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Payment details expired</h1>
        <p className="text-gray-600 mb-6">
          The payment details for your transaction have expired.
        </p>
        <a
          href="/"
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default Expired;