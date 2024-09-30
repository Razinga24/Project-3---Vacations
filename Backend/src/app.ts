import express from "express";
import cors from "cors";
import routeNotFound from "./3-middleware/route-not-found";
import expressFileUpload from "express-fileupload";
import catchAll from "./3-middleware/catch-all";
import appConfig from "./4-utils/app-config";
import vacationRoutes from "./6-routes/vacation-routes";
import followRoutes from "./6-routes/follow-routes";
import authRoutes from "./6-routes/auth-routes";
import fileLogger from "./2-models/file-logger";
import preventXss from "./3-middleware/prevent-xss";

// Server
const server = express();

// Middleware:
server.use(cors());
server.use(expressFileUpload());
server.use(express.json());
// server.use(fileLogger);

server.use(preventXss);

// Routes:
server.use("/api", vacationRoutes);
server.use("/api/follows", followRoutes);
server.use("/api", authRoutes);

server.use("*", routeNotFound );
server.use(catchAll);
 

server.listen(appConfig.port, () => console.log(`Listening on http://localhost:${appConfig.port}`));
