const router = require('express').Router();
const isAuthoraized = require('../../../common/middelware/isAuthoraized');
const { ADD_CONVERSION, GET_ALL_CONVERSIONS } = require('../../users/endPoints');
const { addConversionHandelr, getConversionHandelr } = require('../controller/conversionOrders.controller');

router.get("/conversion", isAuthoraized(GET_ALL_CONVERSIONS), getConversionHandelr);
router.post("/conversion", isAuthoraized(ADD_CONVERSION), addConversionHandelr);
// router.delete("/conversion/:_id", isAuthoraized(DElETE_GOODS), deleteGoodsHandelr);
// router.put("/conversion/:_id", isAuthoraized(UPDATE_GOODS), updateGoodsHandelr);

module.exports = router;