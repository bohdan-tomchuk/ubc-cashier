import mongoose from 'mongoose'

const CheckSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true }
    }
  ]
})

export const CheckModel = mongoose.model('Check', CheckSchema)

export const getChecks = () => CheckModel.find()
export const createCheck = (values: Record<string, any>) => new CheckModel(values).save(values).then((check: any) => check.toObject())
export const deleteCheckById = (id: string) => CheckModel.findByIdAndDelete(id)