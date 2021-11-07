const express = require("express");
const passengerSchema = require("../models/Passenger");
const router = express.Router();
const bcrypt = require("bcryptjs");
const validateRegisterInput = require("../validation/register");

router.post("/register", (req, res) => {
	// Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
	if (!isValid) {
	  return res.status(400).json(errors);
	}
	passengerSchema.findOne({ emailID: req.body.emailID }).then(user => {
	  if (user) {
		return res.status(400).json({ email: "Email already exists" });
	  } else {
		const newUser = new passengerSchema({
		  firstName: req.body.firstName,
		  lastName: req.body.lastName,
		  emailID: req.body.emailID,
		  password: req.body.password
		});
  // Hash password before saving in database
		bcrypt.genSalt(10, (err, salt) => {
		  bcrypt.hash(newUser.password, salt, (err, hash) => {
			if (err) throw err;
			newUser.password = hash;
			newUser
			  .save()
			  .then(user => res.json(user))
			  .catch(err => console.log(err));
		  });
		});
	  }
	});
  });




module.exports=router;