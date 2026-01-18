import { useFlightStore } from "../store/flightStore";
import { useState } from "react";

export default function Filters() {
  const { flights, filters, updateFilters } = useFlightStore();
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    stops: true,
    airlines: true,
  });

  const airlines = [...new Set(flights.map((f) => f.airline))];

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const maxFlightPrice = flights.length > 0 
    ? Math.max(...flights.map((f) => f.price))
    : 20000;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Filters</h2>
        <p className="text-sm text-gray-600 mt-1">Refine your search</p>
      </div>

      {/* PRICE FILTER */}
      <div className="card p-5 hover:shadow-md transition-shadow">
        <button
          onClick={() => toggleSection("price")}
          className="w-full flex items-center justify-between hover:text-primary-600 transition-colors"
        >
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-bold text-gray-900">Max Price</h3>
          </div>
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${expandedSections.price ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>

        {expandedSections.price && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <input
              type="range"
              min="1000"
              max={maxFlightPrice}
              value={filters.maxPrice}
              onChange={(e) =>
                updateFilters({ maxPrice: Number(e.target.value) })
              }
              className="w-full h-2 bg-gradient-to-r from-primary-200 to-primary-500 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-gray-600">₹1,000</span>
              <span className="text-lg font-bold text-primary-600">
                ₹{filters.maxPrice.toLocaleString("en-IN")}
              </span>
              <span className="text-sm text-gray-600">₹{maxFlightPrice.toLocaleString("en-IN")}</span>
            </div>
          </div>
        )}
      </div>

      {/* STOPS FILTER */}
      <div className="card p-5 hover:shadow-md transition-shadow">
        <button
          onClick={() => toggleSection("stops")}
          className="w-full flex items-center justify-between hover:text-primary-600 transition-colors"
        >
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h3 className="text-lg font-bold text-gray-900">Stops</h3>
          </div>
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${expandedSections.stops ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>

        {expandedSections.stops && (
          <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
            {[
              { value: 0, label: "Non-stop", color: "green" },
              { value: 1, label: "1 Stop", color: "blue" },
              { value: 2, label: "2+ Stops", color: "orange" },
            ].map((stop) => (
              <label
                key={stop.value}
                className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
                <input
                  type="checkbox"
                  checked={filters.stops.includes(stop.value)}
                  onChange={(e) => {
                    const next = e.target.checked
                      ? [...filters.stops, stop.value]
                      : filters.stops.filter((x) => x !== stop.value);
                    updateFilters({ stops: next });
                  }}
                  className="w-5 h-5 rounded border-gray-300 text-primary-600 cursor-pointer accent-primary-600"
                />
                <span className={`text-sm font-medium text-gray-900 flex-1`}>
                  {stop.label}
                </span>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${stop.color}-100 text-${stop.color}-800`}
                >
                  {stop.value === 0 ? "Fast" : stop.value === 1 ? "Good" : "Budget"}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* AIRLINES FILTER */}
      <div className="card p-5 hover:shadow-md transition-shadow">
        <button
          onClick={() => toggleSection("airlines")}
          className="w-full flex items-center justify-between hover:text-primary-600 transition-colors"
        >
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <h3 className="text-lg font-bold text-gray-900">Airlines</h3>
          </div>
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${expandedSections.airlines ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>

        {expandedSections.airlines && (
          <div className="mt-4 pt-4 border-t border-gray-200 space-y-3 max-h-72 overflow-y-auto">
            {airlines.map((airline) => (
              <label
                key={airline}
                className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors group"
              >
                <input
                  type="checkbox"
                  checked={filters.airlines.includes(airline)}
                  onChange={(e) => {
                    const next = e.target.checked
                      ? [...filters.airlines, airline]
                      : filters.airlines.filter((x) => x !== airline);
                    updateFilters({ airlines: next });
                  }}
                  className="w-5 h-5 rounded border-gray-300 text-primary-600 cursor-pointer accent-primary-600"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-primary-600">
                    {airline}
                  </p>
                </div>
                <div className="w-8 h-6 bg-gradient-to-br from-primary-400 to-primary-600 rounded text-white text-xs font-bold flex items-center justify-center group-hover:scale-110 transition-transform">
                  {airline}
                </div>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Reset Filters Button */}
      <button
        onClick={() => {
          updateFilters({
            maxPrice: maxFlightPrice,
            stops: [0, 1, 2],
            airlines: airlines,
          });
        }}
        className="w-full btn btn-secondary py-3 font-semibold flex items-center justify-center gap-2 hover:bg-gray-100"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Reset Filters
      </button>
    </div>
  );
}
