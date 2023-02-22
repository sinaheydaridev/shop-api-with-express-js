import { Router } from "express";

import ChatController from "core/chat/chat.controller";

export class ChatRoutes {
  private router: Router;
  private chatController: ChatController;

  constructor() {
    this.router = Router();
    this.chatController = new ChatController();
  }

  routes() {
    this.router.get("", this.chatController.messages);
    return this.router;
  }
}
