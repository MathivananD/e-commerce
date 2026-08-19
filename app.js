const express = require("express");
const dotConfigure = require("./service");
const app = express();
const bodyparser = require("body-parser");
const corsMiddleware = require("./middleware/cors.middleware");
const {
  authMiddleWare,
  adminMiddleWare,
} = require("./middleware/auth.middleware");
const errorMiddleware = require("./middleware/error.middleware");
const { NotFoundError } = require("./utils/app-error");
const { successResponse } = require("./utils/response");
const setupSwagger = require("./config/swagger");
const addressRouter = require("./router/address.routes");
const categoryRouter = require("./router/category.router");
const userRouter = require("./router/user.routes");
const authRouter = require("./router/auth.routes");
const productRouter = require("./router/product.router");
const masterDataRouter = require("./router/master-data.router");

// Handle Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.error(
    "UNCAUGHT EXCEPTION! 💥 Shutting down...",
    err.name,
    err.message,
  );
  process.exit(1);
});

dotConfigure
  .init()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    const server = app.listen(PORT, () => {
      console.log(
        `Server is running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`,
      );
    });

    // Handle Unhandled Promise Rejections
    process.on("unhandledRejection", (err) => {
      console.error("UNHANDLED REJECTION! 💥 Shutting down gracefully...", err);
      server.close(() => {
        process.exit(1);
      });
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
  });

// Standard Middlewares
app.use(bodyparser.json());
app.use(corsMiddleware);

// API Documentation
setupSwagger(app);

// Health Check Endpoint
app.get("/", (req, res) => {
  return successResponse(res, 200, "E-commerce API is running cleanly");
});

// Public routes
app.use("/auth", authRouter);

// Protected routes

app.use(authMiddleWare);
app.use("/user", userRouter);
app.use("/address", addressRouter);
app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/master-data", adminMiddleWare, masterDataRouter);

// 404 Unhandled Route Handler
app.use((req, res, next) => {
  next(
    new NotFoundError(`Cannot find route ${req.originalUrl} on this server!`),
  );
});

// Centralized Error Handling Middleware (Must be last)
app.use(errorMiddleware);

module.exports = app;
