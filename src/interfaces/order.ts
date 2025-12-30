
import { SubcategoryI } from "./Subcategory"
import { BrandI } from './Brand';
import { CategoryI } from "./Category";

export interface order {
  results: number
  metadata: Metadata
  data: orderitems[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
  nextPage: number
}

export interface orderitems {
  shippingAddress?: ShippingAddress
  taxPrice: number
  shippingPrice: number
  totalOrderPrice: number
  paymentMethodType: string
  isPaid: boolean
  isDelivered: boolean
  _id: string
  user: User
  cartItems: CartItem[]
  paidAt?: string
  createdAt: string
  updatedAt: string
  id: number
}

export interface ShippingAddress {
  details: string
  phone: string
  city: string
}

export interface User {
  _id: string
  name: string
  email: string
  phone?: string
}

export interface CartItem {
  count: number
  _id: string
  product: Product
  price: number
}

export interface Product {
  subcategory: SubcategoryI[]
  ratingsQuantity: number
  _id: string
  title: string
  imageCover: string
  category: CategoryI
  brand: BrandI
  ratingsAverage: number
  id: string
}