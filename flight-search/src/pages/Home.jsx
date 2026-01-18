import { useState } from "react";
import SearchForm from "../components/SearchForm";
import FlightCard from "../components/FlightCard";
import PriceChart from "../components/PriceChart";
import Filters from "../components/Filters";
import MobileFilters from "../components/MobileFilters";
import { useFlightStore } from "../store/flightStore";

export default function Home() {
  const flights = useFlightStore((s) => s.filteredFlights);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState("price");

  // Sort flights based on selected option
  const sortedFlights = [...flights].sort((a, b) => {
    switch (sortBy) {
      case "price":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "stops":
        return a.stops - b.stops;
      case "duration":
        return a.duration.localeCompare(b.duration);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">✈️ Spottier Flights</h1>
          <p className="text-blue-100">Find and book the best flights instantly</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Search Form */}
        <SearchForm />

        {/* Results Section */}
        {flights.length > 0 && (
          <div className="mb-8">
            <div className="lg:hidden flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {flights.length} Flights Found
              </h2>
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="flex items-center gap-2 btn btn-secondary px-4 py-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
              </button>
            </div>

            {/* Sort Options */}
            <div className="hidden lg:flex gap-3 mb-6">
              <span className="text-sm font-semibold text-gray-700 flex items-center">Sort by:</span>
              {[
                { value: "price", label: "Lowest Price" },
                { value: "stops", label: "Fewest Stops" },
                { value: "duration", label: "Shortest Duration" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    sortBy === option.value
                      ? "bg-primary-600 text-white shadow-md"
                      : "bg-white border border-gray-300 text-gray-700 hover:border-primary-300"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block lg:col-span-1 h-fit sticky top-6">
            <Filters />
          </div>

          {/* Results Area */}
          <div className="lg:col-span-3">
            {flights.length === 0 ? (
              <div className="card p-12 md:p-16 text-center">
                <div className="mb-6">
                  <svg className="w-20 h-20 md:w-24 md:h-24 mx-auto text-gray-400 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Flights Found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters to find available flights.</p>
                <button className="btn btn-primary">Search Again</button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Price Chart */}
                <PriceChart />

                {/* Flight Results */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <p className="text-sm font-semibold text-gray-700">
                      Showing {sortedFlights.length} result{sortedFlights.length !== 1 ? "s" : ""}
                    </p>
                    {sortBy === "price" && (
                      <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
                        Sorted by price (low to high)
                      </span>
                    )}
                  </div>

                  {sortedFlights.map((flight, index) => (
                    <div key={flight.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                      <FlightCard flight={flight} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Filters Drawer */}
      <MobileFilters
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 md:py-12 mt-12 md:mt-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">About</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Follow Us</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2024 Spottier Flights. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
