import { Router } from "express";

import UploadController from "core/upload/upload.controller";

export class UploadRoutes {
  private router: Router;
  private uploadController: UploadController;

  constructor() {
    this.router = Router();
    this.uploadController = new UploadController();
  }

  routes() {
    this.router.get("/:filename", this.uploadController.getFile);
    return this.router;
  }
}
