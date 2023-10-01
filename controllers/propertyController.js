import Property from "../models/property.js";

class PropertyController {
  static isWord = (input) => {
    const wordPattern = /^[A-Za-z]+$/;
    let sentence = "";
    checkWord = input.split(" ").map((word) => {
      if (wordPattern.test(word)) {
        sentence += word[0].toUpperCase() + word.slice(1) + " ";
      } else {
        sentence += word + " ";
      }
    });
    return sentence;
  };

  static getAllProperties = async (req, res) => {
    try {
      let dataFilter = {};
      const { property_type, minPrice, maxPrice, location, id } = req.query;
      if (property_type) {
        dataFilter.property_type = property_type;
      }
      if (id) {
        dataFilter._id = id;
      }
      if (location) {
        dataFilter.$or = [{ city: location }, { street: location }];
      }
      if (minPrice && maxPrice) {
        dataFilter.price = {
          $gte: parseInt(minPrice),
          $lte: parseInt(maxPrice),
        };
      } else if (minPrice) {
        dataFilter.price = { $gte: parseInt(minPrice) };
      } else if (maxPrice) {
        dataFilter.price = { $lte: parseInt(maxPrice) };
      }
      const data = await Property.find(dataFilter);
      data.length
        ? res.status(200).send(data)
        : res
            .status(404)
            .send({ message: "No data found related to your search" });
    } catch (error) {
      res.status(400).status({ message: "Something went wrong" });
    }
  };

  static addProperty = async (req, res) => {
    try {
      const data = req.body;
      const doc = new Property(data);
      await doc.save();
      res.status(200).send({ message: "Property added successfully" });
    } catch (error) {
      res.status(404).send({
        message: "Failed to add Property or may be something went wrong",
      });
    }
  };

  static deleteProperty = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedData = await Property.findByIdAndDelete({ _id: id });
      if (!deletedData) {
        return res
          .status(400)
          .send({ message: "Property not found according to your search" });
      }
      res.status(200).send({ message: "Property deleted successfully" });
    } catch (error) {
      res.status(400).send({
        message: "Something went wrong or may be your property ID is invalid",
      });
    }
  };

  static updateProperty = async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const propertyData = await Property.findOne({ _id: id });
      if (!propertyData) {
        return res
          .status(400)
          .send({ message: "Property not found according to your search" });
      }
      Object.assign(propertyData, data);
      await propertyData.save();
      res.status(200).send({ message: "Property updated successfully" });
    } catch (error) {
      res.status(400).send({
        message: "Something went wrong or maybe your property ID is invalid",
      });
    }
  };
}

export default PropertyController;
