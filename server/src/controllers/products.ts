import express from 'express'

import { getProducts, createProduct, deleteProductById, updateProductById } from '../models/products'

export const getAllProducts = async (req: express.Request, res: express.Response) => {
  try {
    const products = await getProducts()

    return res.status(200).json(products).end()
  } catch (err) {
    console.log(err)
    return res.sendStatus(400)
  }
}

export const createNewProduct = async (req: express.Request, res: express.Response) => {
  try {
    const { name, price } = req.body

    if (!name || !price) {
      return res.sendStatus(400)
    }

    const product: Record<string, any> = await createProduct({ name, price })

    return res.status(200).json(product).end()
  } catch (err) {
    console.log(err)
    return res.sendStatus(400)
  }

}

export const deleteProduct = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params

    const deletedProduct = await deleteProductById(id)

    return res.json(deletedProduct)
  } catch (err) {
    console.log(err)
    return res.sendStatus(400)
  }
}

export const updateProduct = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params
    const { name, price } = req.body

    if (!name || !price) {
      return res.sendStatus(400)
    }

    const product = await updateProductById(id, { name, price })

    return res.status(200).json(product).end()
  } catch (err) {
    console.log(err)
    return res.sendStatus(400)
  }
}