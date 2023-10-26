import Contact from "../models/contact.js";
import Favourite from "../models/favourite.js";

class InfoController {
  static contactInfo = async (req, res) => {
    try {
      const { name, email, phone, description } = req.body;
      const data = {};
      if (name) data.name = name;
      if (email) data.email = email;
      if (phone) data.phone = phone;
      if (description) data.description = description;
      const doc = new Contact(data);
      await doc.save();
      res.status(200).send({
        message: "Thanks for contact to us, we will get back to you soon.",
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: "Something went wrong" });
    }
  };

  static calculateEMI = async (req, res) => {
    try {
      const { amount, downPayment, years, interest } = req.body;
      if (amount && downPayment && years && interest) {
        let amount_without_down_payment = amount + amount * (interest / 100);
        let amount_with_down_payment =
          amount - downPayment + ((amount - downPayment) * interest) / 100;
        let EMI = amount_with_down_payment / (years * 12);
        res.status(200).send({
          amount_with_down_payment: amount_with_down_payment,
          amount_without_down_payment: amount_without_down_payment,
          EMI: EMI,
        });
      } else {
        res.status(400).send({ message: "invalid data" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ message: "An error occured due to some technical issue" });
    }
  };

  static addToFavourite = async (req, res) => {
    try {
      const data = req.body;
      const doc = new Favourite(data);
      await doc.save();
      res.status(200).send({ message: "Added to favourite" });
    } catch (error) {
      res.status(400).send({ message: "Something went wrong" });
    }
  };

  static viewFavourite = async (req, res) => {
    try {
      const { userId } = req.params;
      const data = await Favourite.find({ userId: userId }).populate(
        "propertyId"
      );
      res.status(200).send({ myFavourites: data });
    } catch (error) {
      res.status(400).send({ message: "Something went wrong" });
    }
  };

  static deleteFavourite = async (req, res) => {
    try {
      const { userId, propertyId } = req.body;
      const deletedData = await Favourite.findOneAndDelete({
        $and: [{ user: userId }, { property: propertyId }],
      });
      console.log(deletedData)
      if (deletedData) {
        res
          .status(200)
          .send({ message: "The property is no longer in your favourites" });
      }
      else{
        res.status(404).send({message:"Unable to delete or may be the id is incorrect"})
      }
    } catch (error) {
      res.status(400).send({ message: "Something went wrong" });
    }
  };
}
export default InfoController;
