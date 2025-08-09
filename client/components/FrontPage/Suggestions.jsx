"use client";

export default async function Suggestions() {
  const res = await fetch("http://localhost:8080/api/suggestions", { cache: "no-store" });
  const suggestions = await res.json();

  return (
    <div className="bg-white border border-gray-200 rounded p-4">
      <h3 className="font-semibold mb-4">Suggestions for you</h3>
      {suggestions.map((suggestion) => (
        <div key={suggestion.id} className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-2">
            <span className="text-sm font-semibold text-gray-600">{suggestion.user[0]}</span>
          </div>
          <div className="flex-1">
            <p className="font-semibold">{suggestion.user}</p>
            <button className="text-blue-500 font-semibold">Follow</button>
          </div>
        </div>
      ))}
    </div>
  );
}