import axios from "axios";

export async function searchFlights(params) {
  const res = await axios.get("http://localhost:5000/api/flights", {
    params,
  });

  return res.data;
}
