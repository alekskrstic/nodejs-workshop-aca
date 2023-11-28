import mongoose from "mongoose";
import validator from "validator";

const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      price: {
        type: Number,
        required: true,
        // validate: {
        //   validator: function (value) {
        //     console.log(
        //       "validator.isFloat(value, { min: 0.01 })",
        //       validator.isFloat(value, { min: 0.01 })
        //     );
        //     return validator.isFloat(value, { min: 0.01 });
        //   },
        //   message: "Price must be greater then 0.01",
        // },
      },
      quantity: {
        type: Number,
        required: true,
        // validate: {
        //   validator: function (value) {
        //     console.log(
        //       "validator.isInt(value, { min: 1 })",
        //       validator.isInt(value, { min: 1 })
        //     );
        //     return validator.isInt(value, { min: 1 });
        //   },
        //   message: "Quantity must be greater then 1.",
        // },
      },
    },
  ],
  amount: {
    type: Number,
    required: true,
    // validate: {
    //   validator: function (value) {
    //     return validator.isFloat(value, { min: 0.01 });
    //   },
    //   message: "Amount must be greater then 0.01",
    // },
  },
});

export default mongoose.model("Purchase", purchaseSchema);
