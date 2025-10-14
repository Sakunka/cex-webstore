import { createGenericController } from "@/lib/controller/createGenericController";
import Phone from "@/lib/models/Phone";

const phonesController = createGenericController(Phone, "phone");

export const GET = phonesController.getById;
export const PUT = phonesController.update;
export const DELETE = phonesController.delete;
