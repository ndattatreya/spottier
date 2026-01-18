import { useForm } from "react-hook-form";
import { searchFlights } from "../services/amadeus";
import { useFlightStore } from "../store/flightStore";
import { useState } from "react";

export default function SearchForm() {
    const { register, handleSubmit } = useForm();
    const setFlights = useFlightStore((s) => s.setFlights);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        if (
            data.origin.length !== 3 ||
            data.destination.length !== 3 ||
            !data.date
        ) {
            alert("Please enter valid IATA codes (DEL, BOM) and a date");
            return;
        }

        setLoading(true);
        try {
            const results = await searchFlights({
                originLocationCode: data.origin.toUpperCase(),
                destinationLocationCode: data.destination.toUpperCase(),
                departureDate: data.date,
                adults: 1,
            });

            const normalized = results.map((f) => ({
                id: f.id,
                airline: f.itineraries[0].segments[0].carrierCode,
                price: Number(f.price.total),
                stops: f.itineraries[0].segments.length - 1,
                duration: f.itineraries[0].duration,
            }));

            setFlights(normalized);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mb-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 tracking-tight">
                    Find Your Perfect Flight
                </h1>
                <p className="text-lg text-gray-600">
                    Search and compare flights from thousands of airlines
                </p>
            </div>

            {/* Search Form */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="hero-section"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                    {/* Origin */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-2">
                            From
                        </label>
                        <input
                            {...register("origin")}
                            placeholder="DEL"
                            maxLength="3"
                            className="input uppercase"
                        />
                        <p className="text-xs text-gray-500 mt-1">IATA Code</p>
                    </div>

                    {/* Destination */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-2">
                            To
                        </label>
                        <input
                            {...register("destination")}
                            placeholder="BOM"
                            maxLength="3"
                            className="input uppercase"
                        />
                        <p className="text-xs text-gray-500 mt-1">IATA Code</p>
                    </div>

                    {/* Date */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-2">
                            Departure
                        </label>
                        <input
                            {...register("date")}
                            type="date"
                            className="input"
                        />
                    </div>

                    {/* Passengers - Optional for now */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-2">
                            Passengers
                        </label>
                        <div className="input flex items-center justify-center cursor-default">
                            <span className="text-gray-900 font-medium">1 Adult</span>
                        </div>
                    </div>

                    {/* Search Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`btn btn-primary h-12 w-full md:w-auto flex items-center justify-center gap-2 ${
                            loading ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Searching...
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                Search
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
