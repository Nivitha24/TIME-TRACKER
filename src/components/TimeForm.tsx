import React, { useState } from 'react';

interface Props {
  onAdd: (activity: string, hours: number, color: string) => void;
}

const TimeForm: React.FC<Props> = ({ onAdd }) => {
  const [activity, setActivity] = useState('');
  const [hours, setHours] = useState('');
  const [color, setColor] = useState('#000000'); // default color

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(hours);
    if (!activity || isNaN(parsed) || parsed <= 0) return;
    onAdd(activity, parsed, color); // now passing color too
    setActivity('');
    setHours('');
    setColor('#000000'); // reset color if desired
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        placeholder="📄 Activity"
        className="w-full px-3 py-1.5 border rounded-md text-sm focus:ring-1 focus:ring-blue-400"
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
      />
      <input
        type="number"
        placeholder="⏱️ Hours"
        className="w-full px-3 py-1.5 border rounded-md text-sm focus:ring-1 focus:ring-pink-400"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
      />
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">🎨 Color:</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full py-1.5 rounded-md bg-black text-white text-sm font-semibold hover:bg-gray-800"
      >
        ➕ Add
      </button>
    </form>
  );
};

export default TimeForm;
