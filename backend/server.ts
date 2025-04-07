import express from "express";
import cors from "cors";
import { setupNotificationRoutes } from "./routes";
import { NotificationController } from "./controllers/NotificationController";
import { NotificationServiceImplementation } from "./services/NotificationServiceImplementation";
import { SupabaseNotificationRepository } from "./repositories/SupabaseNotificationRepository";
import { API_ENDPOINTS } from "./constants/api";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const notificationRepository = new SupabaseNotificationRepository();
const notificationService = new NotificationServiceImplementation(
  notificationRepository
);
const notificationController = new NotificationController(notificationService);

app.use(
  "/api" + API_ENDPOINTS.NOTIFICATIONS,
  setupNotificationRoutes(notificationController)
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
