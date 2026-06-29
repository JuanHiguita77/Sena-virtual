const express = require("express");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());

const cors = require("cors");

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use("/api/auth", authRoutes);

app.listen(3000, () => {
    console.log("Servidor ejecutándose en puerto 3000");
});