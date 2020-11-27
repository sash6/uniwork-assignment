var userModel = require("../models/user.model");
var formModel = require("../models/form.model");
// const bcrypt = require('bcrypt');
var mongoose = require('mongoose');

module.exports = {
  registerUser: (req, res, next) => {
    console.log('req.body::::', req.body)
    req.body.password = userModel.hashPassword(req.body.password)
    userModel.create(req.body, function (err, user) {
      if (err) {
        return res.status(400).send(err);
      }
      res.status(200).send({ message: "Successfully Created" });
    });
  },

  saveForm: (req, res, next) => {
    console.log('req,bodt::::', req.body)
    formModel.create(req.body, function (err, form) {
      if (err) {
        return res.status(400).send(err);
      }
      res.status(200).send("Successfully Created");
    });
  },

  authenticateUser: async (req, res, next) => {
    console.log('req body::::', req.body)
    const user = await userModel.findOne({ email: req.body.email });
    if (user != null) {
      if (user.isValid(req.body.password)) {
        return res.status(200).send(user);
      } else {
        return res.status(400).send("Wrong Password");
      }
    } else {
      return res.status(404).send("Email Not Found");
    }
  },

  getUsers: (req, res, next) => {
    console.log('req.query.dept::::', req.params.dept)
    var query = {
      department: req.params.dept,
      username: { $ne: req.query.username }
    }
    userModel.find(query).select(['username']).then((users) => {
      if (users.length > 0) {
        return res.status(200).send(users);
      } else {
        console.error("no data exists");
        return res.status(401).send("No user exists with the selected Department");
      }
    });
  },

  getRequests: (req, res, next) => {
    console.log('get requests::::', req.params.status)
    let query = {
      'status': req.params.status.toUpperCase(),
    }
    if (req.params.status.toUpperCase() == 'REQUEST_APPROVAL'){
      query['assignee'] = req.query.user
      query['status'] = 'PENDING'
    } 
    else
      query['assigned'] = req.query.user
    // if(req.params.status.toUpperCase() == 'REQUEST_APPROVAL')  
    //   query['assignee'] = req.query.user
    // else
    //   query['assigned'] = req.query.user

    console.log('query::::', query)
    formModel.find(query).then((forms) => {
      if (forms) {
        return res.status(200).send(forms);
      } else {
        console.error("no data exists");
        return res.status(401).send("no data exists");
      }
    });
  },

  updateStatus: (req, res, next) => {
    console.log('req.params::::', req.params)
    let mongoObjectId = mongoose.Types.ObjectId(req.params.id);
    formModel.updateOne({ _id: mongoObjectId }, { status: 'APPROVED' }, function (err, data) {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).send({ message: 'Updated Successfully' });
    });
  }
}