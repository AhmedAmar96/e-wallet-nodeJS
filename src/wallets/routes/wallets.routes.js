const router = require('express').Router();
const isAuthoraized = require('../../../common/middelware/isAuthoraized');
const { GET_ALL_WALLETS, ADD_WALLET, DElETE_WALLET, UPDATE_WALLET } = require('../../users/endPoints')
const { addWalletsHandelr, getWalletHandelr, updateWalletsHandelr, deleteWalletsHandelr } = require('../controller/wallets.controller');


router.get("/wallets", isAuthoraized(GET_ALL_WALLETS), getWalletHandelr);
router.post("/wallets", isAuthoraized(ADD_WALLET), addWalletsHandelr);
router.delete("/wallets/:_id", isAuthoraized(DElETE_WALLET), deleteWalletsHandelr);
router.put("/wallets/:_id", isAuthoraized(UPDATE_WALLET), updateWalletsHandelr);

module.exports = router;