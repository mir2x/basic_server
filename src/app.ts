import express, { Request, Response, NextFunction } from "express";
import { notFound } from "@middlewares/notfound";
import { errorHandler } from "@middlewares/errorHandler";
import cors from "cors";
import AuthRouter from "@routes/authRouter";
import UserRouter from "@routes/userRouter";
import FaqRouter from "@routes/faqRouter";
import TaCRouter from "@routes/tacRouter";
import PrivacyRouter from "@routes/privacyRouter";
import { requestLogger } from "@middlewares/requestLogger";
import ContractRouter from "@routes/contractRouter";
import VersionRouter from "@routes/versionRouter";
import ActivityRouter from "@routes/activityRouter";

const app = express();

app.use(requestLogger);
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

const routes = [
  { path: "/auth", router: AuthRouter },
  { path: "/user", router: UserRouter },
  { path: "/activity", router: ActivityRouter},
  { path: "/faq", router: FaqRouter },
  { path: "/tac", router: TaCRouter },
  { path: "/privacy", router: PrivacyRouter },
  { path: "/contract", router: ContractRouter },
  { path: "/version", router: VersionRouter },
];

routes.forEach((route) => {
  app.use(route.path, route.router);
});

app.use("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello From the basic server");
});

app.use("/**", notFound);

app.use(errorHandler);

export default app;
