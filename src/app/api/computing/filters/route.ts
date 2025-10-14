import { createGenericController } from "@/lib/controller/createGenericController";
import Computing from "@/lib/models/Computing";

const computingController = createGenericController(Computing, "computing");

export const GET = computingController.getFilters;
