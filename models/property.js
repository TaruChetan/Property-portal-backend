import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  property_type: {
    type: String,
    required: true,
  },
  property_name: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  square_feet: {
    type: Number,
    required: true,
  },
  amenities: {
    type: [],
  },
  image: {
    type: String,
  },
});

const Property = new mongoose.model("Property", propertySchema);
export default Property;
