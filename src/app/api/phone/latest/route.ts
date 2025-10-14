import { createGenericController } from "@/lib/controller/createGenericController";
import Phone from "@/lib/models/Phone";

const phoneController = createGenericController(Phone, "phone");

export const GET = phoneController.getLatest;
