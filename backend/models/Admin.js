const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
	adminFirstName: {
		type: String,
	  required: true
	},
	adminLastName: {
		type: String,
	  required: true
	},
	email: {
	  type: String,
	  required: true
	},
	password: {
	  type: String,
	  required: true
	},
})


module.exports = Admin = mongoose.model("admin", adminSchema);