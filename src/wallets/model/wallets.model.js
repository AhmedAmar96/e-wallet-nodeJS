const mongoose = require("mongoose");
const walletsSchema = require("../schema/wallets.schema");

const Wallets = mongoose.model("wallets", walletsSchema);

module.exports = Wallets;