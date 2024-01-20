import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }
})

export const ProductModel = mongoose.model('Product', ProductSchema)

export const getProducts = () => ProductModel.find()
export const createProduct = (values: Record<string, any>) => new ProductModel(values).save(values).then((product: any) => product.toObject())
export const deleteProductById = (id: string) => ProductModel.findByIdAndDelete(id)
export const updateProductById = (id: string, values: Record<string, any>) => ProductModel.findByIdAndUpdate(id, values)