import axios from "axios";

export async function searchFlights(params) {
  const res = await axios.get(
    "https://spottier-backend.onrender.com/api/flights",
    { params }
  );

  return res.data;
}
