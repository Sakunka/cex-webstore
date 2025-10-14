import { createGenericController } from "@/lib/controller/createGenericController";
import Media from "@/lib/models/Media";

const mediaController = createGenericController(Media, "media");

export const GET = mediaController.getById;
export const PUT = mediaController.update;
export const DELETE = mediaController.delete;
