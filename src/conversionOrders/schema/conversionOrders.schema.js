const { Schema } = require("mongoose")

const ConversionOrdersSchema = new Schema(
    {
        receiverNumber: {
            type: String,
            required: [true, 'receiver Number is requird'],
            validate: {
                validator: function (v) {
                    return /^((\+)[0-9]{1,2})?(01)[0-9]{9}$/.test(v);
                },
                message: (props) => `${props.value} invalid number >`
            }
        },
        genreOfOp: {
            type: String,
            enum: ["send", "receive"],
        },
        theAmount: {
            type: Number,
            required: [true, 'The amount is requird'],
        },
        walletsId: {
            type: Schema.Types.ObjectId,
            ref: "wallets"
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
        updatedBy: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
    },
    {
        timestamps: true
    }
);


module.exports = ConversionOrdersSchema;