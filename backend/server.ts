import express from "express";
import cors from "cors";
import { setupNotificationRoutes } from "./routes";
import { NotificationController } from "./controllers/NotificationController";
import { NotificationStore } from "./stores/NotificationStore";
import { API_ENDPOINTS } from "./constants/api";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

NotificationStore.initializeTestData();

app.use(
  "/api" + API_ENDPOINTS.NOTIFICATIONS,
  setupNotificationRoutes(new NotificationController())
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);

  console.log(setupNotificationRoutes(new NotificationController()));
});
