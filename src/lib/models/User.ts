import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  isActive: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    default: "user",
  },
  shippingInfo: {
    organization: String,
    contactNumber: String,
    address1: String,
    address2: String,
    country: String,
    townCity: String,
    postcode: String,
  },
});

const User = mongoose.models.User || mongoose.model("User", usersSchema);

export default User;
