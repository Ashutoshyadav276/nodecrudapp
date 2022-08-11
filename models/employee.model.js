//Here we have the schemas for our database.

const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
  fullName: {
    type: String,

    //validation for required field
    required: 'This field is required.'
  },
  lastname: {
    type: String,

    required: 'This field is required.'
  },
  email: {
    type: String,
  },
  mobile: {
    type: String,
  },
});

//custom validation for email we have used regular expression here
employeeSchema.path('email').validate((val) => {

  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;

  return emailRegex.test(val);
}, 'Invalid e-mail');


mongoose.model("Employee", employeeSchema);
