"use strict";

import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";
import authRoutes from "../src/auth/auth.routes.js";
import communityRoutes from "../src/modules/community/community.routes.js";
import userRoutes from "../src/modules/user/user.routes.js";
import commentRoutes from "../src/modules/comment/comment.routes.js";
import postRoutes from "../src/modules/post/post.routes.js";
import requestRoutes from "../src/modules/request/request.routes.js";
import { createUserDefault } from "./default-conf.js";

class Server {
  constructor() {
    this.notes();
    this.app = express();
    this.port = process.env.PORT;
    this.authPath = "/neighbor/v1/auth";
    this.communityPath = "/neighbor/v1/community";
    this.userPath = "/neighbor/v1/user";
    this.commentPath = "/neighbor/v1/comment";
    this.postPath = "/neighbor/v1/post"
    this.requestPath = "/neighbor/v1/request";

    this.middlewares();
    this.conectDB();
    this.routes();
  }

  async conectDB() {
    await dbConnection();
    await createUserDefault();
  }

  routes() {
    this.app.use(this.authPath, authRoutes);
    this.app.use(this.communityPath, communityRoutes);
    this.app.use(this.userPath, userRoutes);
    this.app.use(this.commentPath, commentRoutes);
    this.app.use(this.postPath, postRoutes);
    this.app.use(this.requestPath, requestRoutes);
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(morgan("dev"));
    this.app.use(express.json());
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port ", this.port);
    });
  }

  notes() {
    console.log("");
    console.log("");
    console.log("NOTE: Server constructor called!");
    console.log("if port 3000 is in use:");
    console.log("netstat -ano | findstr :3000");
    console.log("taskkill /PID <PID> /F");
    console.log("");
  }
}

export default Server;
