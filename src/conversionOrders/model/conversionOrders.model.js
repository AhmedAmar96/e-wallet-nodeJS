const mongoose = require("mongoose");
const conversionOrdersSchema = require("../schema/conversionOrders.schema");

const ConversionOrders = mongoose.model("conversionOrders", conversionOrdersSchema);

module.exports = ConversionOrders;