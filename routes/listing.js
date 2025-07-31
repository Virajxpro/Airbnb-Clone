const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../models/listing.js");
const { isLoggedIn, isOwned, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");

router //Index route
  //Create route
  .route("/")
  .get(wrapAsync(listingController.index))
  // .post(
  //   isLoggedIn,
  //   validateListing,
  //   wrapAsync(listingController.createListing)
  // );
  .post((req, res) => {
    res.send(req.body);
  });

//new route
router.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm));

router //show route//update route//delete route
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwned,
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwned, wrapAsync(listingController.destroyListing));

//edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwned,
  wrapAsync(listingController.editListing)
);

module.exports = router;
