const express = require("express");
require("dotenv").config();
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");

const app = express();

const PORT = process.env.PORT || 8000;

connectDb();

// ✅ Allow requests from frontend
app.use(
  cors({
    origin: "https://contacts-fe-react-vite-hook-form.onrender.com", // Replace with your frontend origin
    credentials: true, // Only if you're using cookies or auth headers
  })
);

// To get payload in json format - using built in middleware.
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

// application level custom middleware to capture and throw proper error
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Express BE is running on port: ", PORT);
});
