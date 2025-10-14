import { createGenericController } from "@/lib/controller/createGenericController";
import Game from "@/lib/models/Game";

const gamesController = createGenericController(Game, "game");

export const GET = gamesController.getById;
export const PUT = gamesController.update;
export const DELETE = gamesController.delete;
