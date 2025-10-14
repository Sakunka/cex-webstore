import { createGenericController } from "@/lib/controller/createGenericController";
import Media from "@/lib/models/Media";

const mediaController = createGenericController(Media, "media");

export const GET = mediaController.getAll;
export const POST = mediaController.create;
