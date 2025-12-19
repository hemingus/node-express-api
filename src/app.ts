import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import notesRoutes from "./routes/notes.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Auth routes
app.use("/v1/auth", authRoutes);

// Notes routes
app.use("/v1/notes", notesRoutes);

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
