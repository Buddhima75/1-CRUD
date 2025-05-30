import express from 'express';
import dotenv from "dotenv";
import path from "path";
import { connectDB } from './config/db.js';

import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); // allow to accept json data to body

// API routes
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
    // Serve static files from the frontend dist directory
    app.use(express.static(path.join(__dirname, "frontend", "dist")));

    // Handle all other routes by serving the index.html
    app.use((req, res) => {
        res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () =>  {
    connectDB();
    console.log("server started at http://localhost:" + PORT);
});
// vqai5fSRJ0ZN5yc8