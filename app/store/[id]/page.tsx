import { notFound } from 'next/navigation'
import { products, getProductById } from '@/data/products'
import ProductClient from './ProductClient'

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }))
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = getProductById(id)
  if (!product) notFound()
  return <ProductClient product={product} />
}
