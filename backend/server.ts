import express from "express";
import cors from "cors";
import { setupNotificationRoutes } from "./routes";
import { NotificationController } from "./controllers/NotificationController";
import { NotificationStore } from "./stores/NotificationStore";
import { API_ENDPOINTS } from "./constants/api";
import dotenv from "dotenv";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

dotenv.config({ path: path.resolve(__dirname, "../.env") });

NotificationStore.initializeTestData();

app.use(
  API_ENDPOINTS.NOTIFICATIONS,
  setupNotificationRoutes(new NotificationController())
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);

  console.log(setupNotificationRoutes(new NotificationController()));
});
