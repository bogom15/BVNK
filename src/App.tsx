import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const [uuid, setUuid] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const goToQuote = () => {
    if (!uuid || uuid.length < 10) {
      setError('Please enter a valid UUID from Postman');
      return;
    }
    setError('');
    navigate(`/payin/${uuid}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">Start Payment</h1>
        <p className="text-gray-600 mb-6 text-sm">
          Enter a UUID from Postman to simulate a customer payment journey using the sandbox API.
        </p>
        <input
          type="text"
          placeholder="UUID from Postman"
          value={uuid}
          onChange={(e) => setUuid(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <br></br>
        <br></br>
        <button
          onClick={goToQuote}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition w-full"
        >
          Continue
         
        </button>
        {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
      </div>
    </div>
  );
}

export default App;
