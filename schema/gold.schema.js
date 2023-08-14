import mongoose, { Schema } from 'mongoose'

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
  },
  { timestamps: true }
)

goldItemSchema.statics.updateItemPrice = async function (price) {
  try {
    const itemList = await this.find({})
    itemList.forEach(async (item) => {
      item.itemPrice = item.itemWeight * price
      console.log(item)
      await item.save(item)
    })
  } catch (e) {
    next(e)
  }
}

goldItemSchema.statics.getItem = async function (id, time_range) {
  try {
    let query = {}
    if (id) query._id = id
    return await this.find(query, 'itemName itemWeight itemPrice').lean()
  } catch (e) {
    next(e)
  }
}

goldItemSchema.statics.addItem = async function (itemDetails) {
  try {
    return await this.create(itemDetails)
  } catch (e) {
    next(e)
  }
}

const goldModal = mongoose.model('Gold Items', goldItemSchema)

export default goldModal
