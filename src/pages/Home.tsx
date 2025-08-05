import React, { useState } from 'react';
import TimeForm from '@/components/TimeForm';
import TimeChart from '@/components/TimeChart';

const Home = () => {
  const [data, setData] = useState<{ activity: string; hours: number; color: string }[]>([]);

  const handleAdd = (activity: string, hours: number, color: string) => {
    setData((prev) => [...prev, { activity, hours, color }]);
  };

  const handleReset = () => setData([]);

  const totalHours = data.reduce((sum, d) => sum + d.hours, 0);
  const overLimit = totalHours > 24;

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8 bg-white rounded-3xl shadow-2xl p-8">

        {/* LEFT SIDE: Form + Task List */}
        <div className="w-full md:w-1/2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">🕒 Time Tracker</h1>
            <p className="text-sm text-gray-600 mt-1">📆 {today}</p>
          </div>

          <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm transition hover:shadow-md">
            <TimeForm onAdd={handleAdd} />
          </div>

          <p className="text-sm font-medium text-gray-700">
            📅 Total Tracked: <span className={`font-bold ${overLimit ? 'text-red-600' : 'text-green-700'}`}>{totalHours}</span> hrs
          </p>

          {overLimit && (
            <p className="text-sm text-red-600 font-semibold bg-red-50 p-2 rounded-md border border-red-200">
              ⚠️ You have exceeded the 24-hour limit!
            </p>
          )}

          {data.length > 0 && (
            <>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2 max-h-64 overflow-y-auto">
                <h2 className="text-sm font-semibold mb-2">📝 Task List</h2>
                {data.map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-sm px-2 py-1 bg-white rounded shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                      {item.activity}
                    </div>
                    <div>{item.hours}h</div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleReset}
                className="w-full mt-3 py-2 rounded-md bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-sm font-bold transition"
              >
                ♻️ Reset Tracker
              </button>
            </>
          )}
        </div>

        {/* RIGHT SIDE: Chart Area */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-inner p-6 min-h-[300px]">
          {data.length > 0 ? (
            <>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">📊 Time Distribution</h2>
              <TimeChart data={data} />
            </>
          ) : (
            <p className="text-sm text-gray-400 italic text-center">
              ⏳ Add time entries to see your distribution chart here.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
