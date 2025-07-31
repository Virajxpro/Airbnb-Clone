const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/FreakyAhhHouse";

main()
  .then(() => {
    console.log("connection sucessfull");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany();
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "66f3d11b94b6cce21d782950",
  }));
  await Listing.insertMany(initData.data);
  console.log("data was intialised");
};
initDB();
