const Listing = require("../models/listing.js");


module.exports.index = async (req, res) => {
  const allListing = await Listing.find({});
  res.render("listing/index.ejs", { allListing });
}

module.exports.renderNewForm = async (req, res) => {
  res.render("listing/new.ejs");
}

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  console.log(req.user._id)
  let listing = await Listing.findById(id).populate("reviews").populate("owner");
  if (!listing) {
    req.flash("error", "Listing does not exist!");
    res.redirect("/listings");
  }
  // console.log(listing);
  res.render("listing/show.ejs", {listing});
}

module.exports.createListing = async (req, res, next) => {
  const listing = new Listing(req.body.listing);
  // console.log(req.user)
  listing.owner = req.user._id;
  await listing.save();
  req.flash("success", "New Listings Added");
  res.redirect("/listings");
}

module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing does not exist!");
    res.redirect("/listings");
  }
  res.render("listing/edit.ejs", { listing });
}

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash("success", "Listings Updated");
  res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listings Deleted");
  res.redirect("/listings");
}