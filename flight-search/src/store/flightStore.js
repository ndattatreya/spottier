import { create } from "zustand";

export const useFlightStore = create((set, get) => ({
  flights: [],
  filteredFlights: [],

  filters: {
    maxPrice: 10000,
    stops: [],
    airlines: [],
  },

  setFlights: (flights) =>
    set({
      flights,
      filteredFlights: flights,
    }),

  updateFilters: (partial) => {
    const filters = { ...get().filters, ...partial };
    const allFlights = get().flights;

    const filtered = allFlights.filter((f) => {
      const priceOk = f.price <= filters.maxPrice;
      const stopsOk =
        filters.stops.length === 0 || filters.stops.includes(f.stops);
      const airlineOk =
        filters.airlines.length === 0 ||
        filters.airlines.includes(f.airline);

      return priceOk && stopsOk && airlineOk;
    });

    set({ filters, filteredFlights: filtered });
  },
}));
