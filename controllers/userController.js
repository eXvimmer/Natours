const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  // User.find().sort().select().skip().limit
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: "success",
    data: {
      msg: "This route is yet to be implemented.",
    },
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "success",
    data: {
      msg: "This route is yet to be implemented.",
    },
  });
};

exports.updateMe = catchAsync(async (req, res, next) => {
  const { password, passwordConfirm } = req.body;
  // 1. create error if user POSTs password data
  if (password || passwordConfirm) {
    return next(
      new AppError(
        `This route is not for password update. Please use /updateMyPassword`,
        400
      )
    );
  }
  // 2.filter our unwanted field names that are not allowed to be updated
  const filteredBody = filterObj(req.body, "name", "email");

  // 3. update user document
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    filteredBody,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "success",
    data: {
      msg: "This route is yet to be implemented.",
    },
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "success",
    data: {
      msg: "This route is yet to be implemented.",
    },
  });
};
