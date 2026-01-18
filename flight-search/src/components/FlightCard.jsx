import { useState } from "react";

// Airline name mapping for better display
const airlineNames = {
  AA: "American Airlines",
  BA: "British Airways",
  UA: "United Airlines",
  DL: "Delta Airlines",
  SW: "Southwest Airlines",
  AF: "Air France",
  LH: "Lufthansa",
  AI: "Air India",
  SQ: "Singapore Airlines",
  NZ: "Air New Zealand",
  QF: "Qantas",
  EK: "Emirates",
  QR: "Qatar Airways",
  AE: "Aer Lingus",
};

// Get airline colors for visual variety
const airlineColors = {
  AA: "from-blue-500 to-blue-600",
  BA: "from-red-500 to-red-600",
  UA: "from-gray-600 to-gray-700",
  DL: "from-red-600 to-red-700",
  SW: "from-yellow-500 to-yellow-600",
  AF: "from-blue-600 to-blue-700",
  LH: "from-yellow-500 to-yellow-600",
  AI: "from-orange-500 to-orange-600",
  SQ: "from-gray-700 to-gray-800",
  NZ: "from-white to-gray-100",
  QF: "from-red-500 to-red-600",
  EK: "from-red-600 to-red-700",
  QR: "from-gray-600 to-gray-700",
  AE: "from-green-600 to-green-700",
};

export default function FlightCard({ flight }) {
  const [isSelected, setIsSelected] = useState(false);
  const airlineCode = flight.airline;
  const airlineName = airlineNames[airlineCode] || airlineCode;
  const colorGradient = airlineColors[airlineCode] || "from-primary-500 to-primary-600";

  // Parse duration
  const parseDuration = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?/);
    const hours = match?.[1] ? parseInt(match[1]) : 0;
    const minutes = match?.[2] ? parseInt(match[2]) : 0;
    return `${hours}h ${minutes}m`;
  };

  const stopsText = flight.stops === 0 ? "Non-stop" : `${flight.stops} ${flight.stops === 1 ? "Stop" : "Stops"}`;

  return (
    <div
      onClick={() => setIsSelected(!isSelected)}
      className={`card cursor-pointer hover:shadow-lg active:scale-98 transition-all duration-300 overflow-hidden group ${
        isSelected ? "ring-2 ring-primary-500 shadow-lg" : ""
      }`}
    >
      <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left Section - Airline Info */}
        <div className="flex items-start md:items-center gap-4 flex-1">
          {/* Airline Avatar */}
          <div className={`bg-gradient-to-br ${colorGradient} rounded-lg w-16 h-16 md:w-20 md:h-20 flex items-center justify-center flex-shrink-0 shadow-md text-white text-lg md:text-2xl font-bold group-hover:scale-110 transition-transform duration-300`}>
            {airlineCode}
          </div>

          {/* Flight Details */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
              {airlineName}
            </h3>
            <p className="text-sm md:text-base text-gray-600 mb-2">
              {parseDuration(flight.duration)}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className={`badge ${flight.stops === 0 ? "badge-success" : "badge-warning"}`}>
                {stopsText}
              </span>
            </div>
          </div>
        </div>

        {/* Middle Section - Flight Stats */}
        <div className="hidden lg:grid grid-cols-3 gap-4 flex-1">
          {/* Duration Card */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-3 text-center hover:from-blue-50 hover:to-blue-100 transition-colors">
            <div className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-1">Duration</div>
            <div className="text-base font-bold text-gray-900">{parseDuration(flight.duration)}</div>
          </div>

          {/* Stops Card */}
          <div className={`bg-gradient-to-br ${flight.stops === 0 ? "from-green-50 to-green-100" : "from-orange-50 to-orange-100"} rounded-lg p-3 text-center transition-colors`}>
            <div className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-1">Stops</div>
            <div className="text-base font-bold text-gray-900">{flight.stops}</div>
          </div>

          {/* Rating Card */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 text-center hover:from-purple-100 hover:to-purple-200 transition-colors">
            <div className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-1">Rating</div>
            <div className="flex items-center justify-center gap-1">
              <span className="text-base font-bold text-yellow-500">★</span>
              <span className="text-base font-bold text-gray-900">4.5</span>
            </div>
          </div>
        </div>

        {/* Right Section - Price & CTA */}
        <div className="md:flex-shrink-0 text-right">
          <div className="mb-3">
            <p className="text-xs md:text-sm text-gray-500 font-semibold uppercase tracking-wide mb-1">
              Starting from
            </p>
            <div className="flex items-baseline justify-end gap-2">
              <span className="text-2xl md:text-3xl font-bold text-primary-600">
                ₹{flight.price.toLocaleString("en-IN")}
              </span>
              <span className="text-sm text-gray-500">/person</span>
            </div>
          </div>

          <button className="btn btn-primary w-full md:w-auto px-6 py-2 text-sm md:text-base whitespace-nowrap">
            {isSelected ? "✓ Selected" : "Select"}
          </button>
        </div>
      </div>

      {/* Expanded Details (Mobile) */}
      {isSelected && (
        <div className="lg:hidden border-t border-gray-200 px-4 md:px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Duration</p>
            <p className="text-sm font-bold text-gray-900">{parseDuration(flight.duration)}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Stops</p>
            <p className="text-sm font-bold text-gray-900">{flight.stops}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Rating</p>
            <p className="text-sm font-bold"><span className="text-yellow-500">★</span> 4.5</p>
          </div>
        </div>
      )}
    </div>
  );
}
