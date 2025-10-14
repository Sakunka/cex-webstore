import { createGenericController } from "@/lib/controller/createGenericController";
import Computing from "@/lib/models/Computing";

const computingController = createGenericController(Computing, "computing");

export const GET = computingController.getById;
export const PUT = computingController.update;
export const DELETE = computingController.delete;
