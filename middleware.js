const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // console.log(req.user)
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you must Log In!");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwned = async (req,res,next) => {
  let {id} = req.params;
  let listing = await Listing.findById(id);
  console.log(listing.owner._id);
  console.log(res.locals.currUser);
  if(!listing.owner === res.locals.currUser._id ) {
    req.flash("error", "your dont have permissions");
    returnres.redirect(`/listings/${id}`)
  }
  next();
}

module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};