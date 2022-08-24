const { StatusCodes } = require("http-status-codes");
const PaginationService = require("../../../common/services/PaginationService");
const findService = require("../../../common/services/findService");
const Wallets = require("../model/wallets.model");
const ConversionOrders = require("../../conversionOrders/model/conversionOrders.model");
const crtp = require('crypto');

//get all Wallets
exports.getWalletHandelr = async (req, res) => {
    const { searchKey, page, size } = req.query;
    const { skip, limit } = PaginationService(page, size);
    const models = {
        model : Wallets,
        childModel : ConversionOrders
    }
    const popul = {
        createdPath: "createdBy",
        updatedPath: "updatedBy",
        modelRef: "walletsId",
        userSelect: "username",
        modelPath: "walletsId",
        modelSelect: "walletNum"
    }
    try {
        const data = await findService(models, skip, limit, searchKey, [
            "walletNum"
        ], popul)
        res.json({ message: "success", data });
    } catch (error) {
        res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "error", error: error.message });
    }
};

//Add Wallet
exports.addWalletsHandelr = async (req, res) => {
    try {
        const { walletName, walletNum, walletBalance, send_limit, received_limit, createdBy, updatedBy } = req.body;
        const newWallets = new Wallets({
            walletName,
            walletNum,
            walletBalance,
            send_limit,
            received_limit,
            createdBy,
            updatedBy
        });
        const data = await newWallets.save();
        res
            .status(StatusCodes.CREATED)
            .json({ message: "add success", data });

    } catch (error) {
        res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "error", error: error.message });
    }
}

// Delete Wallet
exports.deleteWalletsHandelr = async (req, res) => {
    try {
        const { _id } = req.params;
        const data = await Wallets.deleteOne({ _id });
        res.json({ message: "delete success" });
    } catch (error) {
        res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "error", error: error.message });
    }
}

//update Wallet
exports.updateWalletsHandelr = async (req, res) => {
    try {
        const { _id } = req.params;
        const { walletName, walletNum, walletBalance, send_limit, received_limit, updatedBy } = req.body;
        const data = await Wallets.updateOne({ _id }, { walletName, walletNum, walletBalance, send_limit, received_limit, updatedBy });
        res.json({ message: "update wallet success", data });
    } catch (error) {
        res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "error", error: error.message });
    }
}

