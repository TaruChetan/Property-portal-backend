import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
class UserController {
  static userRegistration = async (req, res) => {
    try {
      const { role, name, email, username, password } = req.body;
      const user = await User.findOne({ email: email });
      const user1 = await User.findOne({ username: username });
      if (user) {
        res.status(400).send({ message: "User already exists" });
      } else if (user1) {
        res.status(400).send({ message: "User already exists" });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const doc = new User({
          role: role,
          name: name,
          email: email,
          username: username,
          password: hashPassword,
        });
        await doc.save();
        const existingUser = await User.findOne({ email: email });
        const token = jwt.sign(
          { userID: existingUser._id },
          process.env.SECRET_KEY
        );
        res.status(200).send({
          message: "Registration successful, You can now log in",
          token: token,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "User registration failed or may be something went wrong",
      });
    }
  };

  static userLogin = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username: username });

      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          const token = jwt.sign({ userID: user._id }, process.env.SECRET_KEY);
          const { _id, name, email } = user;

          res.status(200).json({
            message: "You are now logged in",
            token: token,
            userid: _id,
            name: name,
            email: email,
          });
        } else {
          res.status(404).json({ message: "Incorrect username or password" });
        }
      } else {
        res.status(404).json({ message: "User not registered" });
      }
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };
}
export default UserController;
