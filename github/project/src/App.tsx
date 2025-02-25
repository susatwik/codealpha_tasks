import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';

interface AgeResult {
  years: number;
  months: number;
  days: number;
}

function calculateAge(birthDate: Date): AgeResult {
  const today = new Date();
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months += 12;
  }

  if (days < 0) {
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, birthDate.getDate());
    days = Math.floor((today.getTime() - lastMonth.getTime()) / (1000 * 60 * 60 * 24));
  }

  return { years, months, days };
}

function App() {
  const [birthDate, setBirthDate] = useState<string>('');
  const [age, setAge] = useState<AgeResult | null>(null);
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const inputDate = new Date(birthDate);
    const today = new Date();

    if (inputDate > today) {
      setError('Birth date cannot be in the future');
      setAge(null);
      return;
    }

    setError('');
    setAge(calculateAge(inputDate));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="w-8 h-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-800">Age Calculator</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2">
              Select your birth date
            </label>
            <input
              type="date"
              id="birthDate"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 flex items-center justify-center gap-2"
          >
            <Clock className="w-5 h-5" />
            Calculate Age
          </button>
        </form>

        {age && (
          <div className="mt-8 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Your age is:</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-indigo-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-indigo-600">{age.years}</p>
                <p className="text-sm text-gray-600">Years</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-indigo-600">{age.months}</p>
                <p className="text-sm text-gray-600">Months</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-indigo-600">{age.days}</p>
                <p className="text-sm text-gray-600">Days</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;