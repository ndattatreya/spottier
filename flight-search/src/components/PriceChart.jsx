import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useFlightStore } from "../store/flightStore";

export default function PriceChart() {
  const flights = useFlightStore((s) => s.filteredFlights);

  if (flights.length === 0) {
    return null;
  }

  // Create chart data with better formatting
  const chartData = flights
    .sort((a, b) => a.price - b.price)
    .map((f, index) => ({
      id: f.id,
      price: f.price,
      airline: f.airline,
      stops: f.stops,
      displayName: `${f.airline} (${f.stops === 0 ? "Non-stop" : f.stops + " stop"})`,
      index: index + 1,
    }));

  return (
    <div className="card p-6 hover:shadow-md transition-shadow">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Price Trend</h2>
        <p className="text-sm text-gray-600">
          {flights.length} flights available • Lowest: ₹{Math.min(...flights.map((f) => f.price)).toLocaleString("en-IN")} • Highest: ₹{Math.max(...flights.map((f) => f.price)).toLocaleString("en-IN")}
        </p>
      </div>

      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 -mx-6 -mb-6">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="index"
              stroke="#9ca3af"
              style={{ fontSize: "12px" }}
            />
            <YAxis
              stroke="#9ca3af"
              style={{ fontSize: "12px" }}
              label={{ value: "Price (₹)", angle: -90, position: "insideLeft", offset: 10 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                padding: "12px",
              }}
              cursor={{ stroke: "#3b82f6", strokeWidth: 2 }}
              formatter={(value) => `₹${value.toLocaleString("en-IN")}`}
              labelFormatter={(label) => `Flight ${label}`}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: "#3b82f6", r: 4 }}
              activeDot={{ r: 6, fill: "#1d4ed8" }}
              isAnimationActive={true}
              animationDuration={800}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center">
          <p className="text-xs text-gray-600 font-semibold uppercase mb-2">Cheapest</p>
          <p className="text-2xl font-bold text-green-600">
            ₹{Math.min(...flights.map((f) => f.price)).toLocaleString("en-IN")}
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center">
          <p className="text-xs text-gray-600 font-semibold uppercase mb-2">Average</p>
          <p className="text-2xl font-bold text-blue-600">
            ₹{Math.round(flights.reduce((a, b) => a + b.price, 0) / flights.length).toLocaleString("en-IN")}
          </p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 text-center">
          <p className="text-xs text-gray-600 font-semibold uppercase mb-2">Most Expensive</p>
          <p className="text-2xl font-bold text-orange-600">
            ₹{Math.max(...flights.map((f) => f.price)).toLocaleString("en-IN")}
          </p>
        </div>
      </div>
    </div>
  );
}
