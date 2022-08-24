const { StatusCodes } = require("http-status-codes");
const PaginationService = require("../../../common/services/PaginationService");
const findService = require("../../../common/services/findService");
const Wallets = require("../../wallets/model/wallets.model");
const ConversionOrders = require("../model/conversionOrders.model");
const crtp = require('crypto');

//get all conversion
exports.getConversionHandelr = async (req, res) => {
    const { searchKey, page, size } = req.query;
    const { skip, limit } = PaginationService(page, size);
    const popul = {
        createdPath: "createdBy",
        updatedPath: "updatedBy",
        userSelect: "username", 
        modelPath: "walletsId",
        modelSelect: "walletNum"
    }
    try {
        const data = await findService(ConversionOrders, skip, limit, searchKey, [
            "receiverNumber"
        ], popul)
        res.json({ message: "success", data });
    } catch (error) {
        res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "error", error: error.message });
    }
};

//Add conversion
exports.addConversionHandelr = async (req, res) => {
    try {
        const { receiverNumber, genreOfOperation, theAmount, walletsId, createdBy, updatedBy } = req.body;
        const findWallet = await Wallets.findOne({ _id: walletsId });
        if (findWallet) {
            const newConversion = new ConversionOrders({ receiverNumber, genreOfOperation, theAmount, walletsId, createdBy, updatedBy });
            const data = await newConversion.save();
            const walletBlnce = findWallet.walletBalance - theAmount;
            let walletsending = findWallet.send_limit;
            let walletreceived = findWallet.received_limit;
            if (genreOfOperation == 'send') {
                walletsending = findWallet.send_limit - theAmount;
            } else if (genreOfOperation == 'receive') {
                walletreceived = findWallet.received_limit - theAmount;
            }
            await Wallets.updateOne({ _id: findWallet._id }, { walletBalance: walletBlnce, send_limit: walletsending, received_limit: walletreceived });
            res
                .status(StatusCodes.CREATED)
                .json({ message: "add success", data });
        } else {
            res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: "invalid wallet id" })
        }
    } catch (error) {
        res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "error", error: error.message });
    }
}

// Delete Goods
exports.deleteGoodsHandelr = async (req, res) => {
    try {
        const { _id } = req.params;
        const data = await Goods.deleteOne({ _id });
        res.json({ message: "delete success" });
    } catch (error) {
        res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "error", error: error.message });
    }
}

//update Goods
exports.updateGoodsHandelr = async (req, res) => {
    try {
        const { _id } = req.params;
        const { productName, theNum, wholesalePrice, sellingPrice } = req.body;
        const data = await Goods.updateOne({ _id }, { productName, theNum, wholesalePrice, sellingPrice });
        res.json({ message: "update Goods success", data });
    } catch (error) {
        res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "error", error: error.message });
    }
}

