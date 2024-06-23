import mongoose from 'mongoose'
const AutoIncrement = require('mongoose-sequence')(mongoose)

export interface IProduct extends mongoose.Document {
  name: string
  price: number
}

const ProductSchema = new mongoose.Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true }
})

export const ProductModel = mongoose.model<IProduct>('Product', ProductSchema)

export const getProducts = () => ProductModel.find()
export const createProduct = async (values: IProduct) => {
  const product = new ProductModel(values)
  return product.save().then((product: any) => product.toObject())
}
export const deleteProductById = (id: string) => ProductModel.findByIdAndDelete(id)
export const updateProductById = (id: string, values: Record<string, any>) => ProductModel.findByIdAndUpdate(id, values)