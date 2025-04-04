import express from "express";
import cors from "cors";
import { setupNotificationRoutes } from "./routes";
import { NotificationController } from "./controllers/NotificationController";
import { NotificationStore } from "./stores/NotificationStore";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

NotificationStore.initializeTestData();

app.use(
  "/api/notifications",
  setupNotificationRoutes(new NotificationController())
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);

  console.log(setupNotificationRoutes(new NotificationController()));
});
