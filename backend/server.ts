import express from "express";
import cors from "cors";
import { setupNotificationRoutes } from "./routes";
import { NotificationController } from "./controllers/NotificationController";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(
  "/api/notifications",
  setupNotificationRoutes(new NotificationController())
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
