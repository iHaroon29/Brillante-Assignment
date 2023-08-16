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

goldItemSchema.statics.updateItemPrice = async function (id = null, price) {
  try {
    let query = {}
    if (id) query._id = id
    const itemList = await this.find(query)
    itemList.forEach(async (item) => {
      item.itemPrice = item.itemWeight * price
      await item.save(item)
    })
  } catch (e) {
    console.log(e.message)
  }
}

goldItemSchema.statics.getItem = async function (id, time_range) {
  try {
    let query = {}
    if (id) query._id = id
    return await this.find(query, 'itemName itemWeight itemPrice').lean()
  } catch (e) {
    console.log(e.message)
  }
}

goldItemSchema.statics.addItem = async function (itemDetails) {
  try {
    return await this.create(itemDetails)
  } catch (e) {
    console.log(e.message)
  }
}

const goldModal = mongoose.model('Gold Items', goldItemSchema)

export default goldModal
