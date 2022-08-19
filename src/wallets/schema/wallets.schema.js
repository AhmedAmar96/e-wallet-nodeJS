const { Schema } = require("mongoose")

const walletsSchema = new Schema(
    {
        walletName: {
            type: String,
            required: [true, 'Wallet name is requird'],
        },
        walletNum: {
            type: String,
            required: [true, 'Wallet Number is requird'],
            validate: {
                validator: function (v) {
                    return /^((\+)[0-9]{1,2})?(01)[0-9]{9}$/.test(v);
                },
                message: (props) => `${props.value} invalid number >`
            }
        },
        walletBalance: {
            type: Number,
            required: [true, 'Wallet balance is requird'],
        },
        transmission_limit: {
            type: Number,
            required: [true, 'Transmission limit price is requird'],
        },
        receipt_limit: {
            type: Number,
            required: [true, 'Receipt limit price is requird'],
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


module.exports = walletsSchema;