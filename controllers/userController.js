const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
  static userRegistration = async (req, res) => {
    const { name, email, password, password_confirmation, tc } = req.body;
    const user = await UserModel.findOne({ email: email });

    if (user) {
      res.send({
        status: "failed",
        message: "Email already exists",
      });
    } else {
      if (name && email && password && password_confirmation && tc) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        if (password === password_confirmation) {
          try {
            const doc = new UserModel({
              name: name,
              email: email,
              password: hashPassword,
              tc: tc,
            });
            await doc.save();

            const saved_user = await UserModel.findOne({
              email,
            });
            //Generate JWT Token
            const token = jwt.sign(
              { userID: saved_user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "5d" }
            );

            res.status(201).send({
              status: "success",
              message: "Registartion Success",
              token,
            });
          } catch (error) {
            console.log(error);
            res.send({ status: "failed", message: "Unable to Register" });
          }
        } else {
          res.send({
            status: "failed",
            message: "Password and Confirm Password doesnt match",
          });
        }
      } else {
        res.send({
          status: "failed",
          message: "All fields are required",
        });
      }
    }
  };

  static userlogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await UserModel.findOne({
          email: email,
        });

        //Generate JWT Token
        // const token = jwt.sign({ userID: saved_ });

        if (user != null) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (user.email === email && isMatch) {
            //generate jwt token
            const token = jwt.sign(
              { userID: user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "5d" }
            );

            res.send({
              status: "success",
              message: "Login Success",
              token,
            });
          }
        } else {
          res.send({
            status: "failed",
            message: "You are not a Registered User",
          });
        }
      } else {
        res.send({
          status: "failed",
          message: "All fields are required",
        });
      }
    } catch (error) {}
  };

  static chnageUserPassword = async (req, res) => {
    const { password, password_confirmation } = req.body;
    if (password && password_confirmation) {
      if (password !== password_confirmation) {
        res.send({
          status: "failed",
          message: "Password and Confirm Password doesnt match",
        });
      } else {
        console.log(password);
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        console.log(req.user);
        await UserModel.findByIdAndUpdate(req.user._id, {
          $set: {
            password: hashPassword,
          },
        });
        res.send({
          status: "success",
          message: "Password changed Successfully",
        });
      }
    } else {
      res.send({
        status: "failed",
        message: "All fields are required",
      });
    }
  };

  static loggedUser = async (req, res) => {
    res.send({
      loggedUser: req.user,
    });
  };

  static sendUserPasswordResetEmail = async (req, res) => {
    const { email } = req.body;

    if (email) {
      const user = await UserModel.findOne({ email: email });
      if (user) {
      }
    } else {
      res.send({});
    }
  };
}

module.exports = UserController;
