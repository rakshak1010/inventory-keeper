const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema(
    {
        companyName: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        models: [
            {
                modelNo: {
                    type: String,
                    trim: true,
                    sparse: true,
                    dropDups: true
                },
                colors: [
                    {
                        colorName: {
                            type: String,
                            trim: true,
                            sparse: true,
                            dropDups: true
                        },
                        colorQuantity: {
                            type: Number,
                            default: 0
                        }
                    }
                ],
                modelQuantity: {
                    type: Number,
                    default: 0
                }
            },
        ],
        companyQuantity: {
            type: Number,
            default: 0
        },
        createdAt: Date,
        updatedAt: Date
    },
    {
        id: true,
        timestamps: true
    }
);

Inventory = mongoose.model("Inventory", InventorySchema);

module.exports = Inventory;
