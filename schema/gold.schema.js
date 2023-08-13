import { Schema } from 'mongoose'

const goldItemSchema = new Schema(
  {
    itemName: {
      type: String,
    },
    itemWeight: {
      type: Number,
    },
    itemPrice: {
      type: Number,
    },
    itemPriceBest: {
      type: Number,
    },
    itemPriceHighest: {
      type: Number,
    },
  },
  { timestamps: true }
)

goldItemSchema.statics.updateItemPrice = async function (price) {
  try {
  } catch (e) {
    return e
  }
}

goldItemSchema.statics.getItem = async function (query) {
  try {
  } catch (e) {
    return e
  }
}

goldItemSchema.statics.addItem = async function (itemDetails) {
  try {
  } catch (e) {
    return e
  }
}
