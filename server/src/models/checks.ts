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

export const getChecks = ({ page, limit, date }: { page: number, limit: number, date: string[] }) => {
  return CheckModel
    .find({
      'date': {
        $gte: new Date(date[0]),
        $lte: new Date(date[1])
      }
    })
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ date: -1 })
}
export const createCheck = (values: Record<string, any>) => new CheckModel(values).save(values).then((check: any) => check.toObject())
export const deleteCheckById = (id: string) => CheckModel.findByIdAndDelete(id)
export const getChecksCount = ({ date }: { date: string[] }) => CheckModel.countDocuments({
  'date': {
    $gte: new Date(date[0]),
    $lte: new Date(date[1])
  }
})