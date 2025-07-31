const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.signUp = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    console.log({ username, email, password });
    const newUser = new User({ email, username });
    const registerdUser = await User.register(newUser, password);
    // console.log(registerdUser);
    req.login(registerdUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "SignUp succesfully");
      res.redirect("/listings");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};

module.exports.logIn = async (req, res) => {
  // console.log(req.user)
  req.flash("success", "LogIn succesfully");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next();
    }
    req.flash("success", "you are logged out!");
    res.redirect("/listings");
  });
};
