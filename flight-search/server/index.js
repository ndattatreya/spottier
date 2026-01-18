import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();          // ✅ app FIRST
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let token = null;
let tokenExpiry = 0;

async function getToken() {
  if (token && Date.now() < tokenExpiry) return token;

  const res = await axios.post(
    "https://test.api.amadeus.com/v1/security/oauth2/token",
    new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.AMADEUS_KEY,
      client_secret: process.env.AMADEUS_SECRET,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  token = res.data.access_token;
  tokenExpiry = Date.now() + res.data.expires_in * 1000;
  return token;
}

app.get("/", (req, res) => {
  res.status(200).send("Flight Search Backend is running");
});


app.get("/api/flights", async (req, res) => {
  try {
    const accessToken = await getToken();

    const response = await axios.get(
      "https://test.api.amadeus.com/v2/shopping/flight-offers",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: req.query,
      }
    );

    res.json(response.data.data);
  } catch (err) {
    console.error("AMADEUS ERROR:", err.response?.data || err.message);
    res.status(err.response?.status || 500).json({
      error: err.response?.data || err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
