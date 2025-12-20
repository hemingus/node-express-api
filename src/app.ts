import express from "express";
import path from "path";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import notesRoutes from "./routes/notes.routes.js";
import healthRoutes from "./routes/health.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.use("/v1/health", healthRoutes);

// Auth routes
app.use("/v1/auth", authRoutes);

// Notes routes
app.use("/v1/notes", notesRoutes);

// Serve static frontend files
app.use(express.static(path.join(process.cwd(), "public")));

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err);
    res.status(err.status || 500).json({
        error: {
        code: err.code || "INTERNAL_SERVER_ERROR",
        message: err.message || "Something went wrong",
        details: err.details || undefined
        }
    });
});

export default app;
