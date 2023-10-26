import mongoose from "mongoose";

const favouriteSchema = new mongoose.Schema({
  propertyId: {
    type: String,
    ref: "Property",
    required: true,
  },
  userId: {
    type: String,
    ref: "User",
    required: true,
  },
});

const Favourite = new mongoose.model("Favourite", favouriteSchema);

export default Favourite;
