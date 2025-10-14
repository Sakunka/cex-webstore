import { createGenericController } from "@/lib/controller/createGenericController";
import Phone from "@/lib/models/Phone";

const phonesController = createGenericController(Phone, "phone");

export const GET = phonesController.getAll;
export const POST = phonesController.create;
