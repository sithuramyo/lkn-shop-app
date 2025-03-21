"use client";

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';

interface Root {
    products: Product[]
    total: number
    skip: number
    limit: number
}

interface Product {
    id: number
    title: string
    description: string
    category: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    tags: string[]
    brand: string
    sku: string
    weight: number
    dimensions: Dimensions
    warrantyInformation: string
    shippingInformation: string
    availabilityStatus: string
    reviews: Review[]
    returnPolicy: string
    minimumOrderQuantity: number
    meta: Meta
    thumbnail: string
    images: string[]
}

interface Dimensions {
    width: number
    height: number
    depth: number
}

interface Review {
    rating: number
    comment: string
    date: string
    reviewerName: string
    reviewerEmail: string
}

interface Meta {
    createdAt: string
    updatedAt: string
    barcode: string
    qrCode: string
}

const fetchProducts = async (): Promise<Root> => {
    const response = await fetch('https://dummyjson.com/products')
    if (!response.ok) {
        throw new Error('Failed to fetch products')
    }
    return response.json()
}


const ShoppingItems = () => {
    const [selectedCategory, setSelectedCategory] = React.useState<string>('best seller');

    const { data, isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts
    });

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error instanceof Error) {
        return <div>Error: {error.message}</div>
    }

    const filteredProducts = selectedCategory === 'all'
        ? data?.products
        : data?.products.filter((product: Product) => product.category === selectedCategory);

    const categories = ['best seller', ...Array.from(new Set(data?.products.map((product: Product) => product.category)))];


    return (
        <div>
            <div className='flex flex-row justify-between items-center mb-8'>
                <h1 className="text-3xl font-bold mb-8">Our Products</h1>
                {/* Category Button Group */}
                <div className="flex mb-8">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full  ${selectedCategory === category
                                ? 'border-2 border-black text-black dark:border-white dark:text-white'
                                : 'text-slate-400'
                                } `}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className='grid grid-cols-4 gap-10'>
                {
                    data?.products.map((product: Product) => (
                        <Card
                            key={product.id}
                            className='p-4 transform transition-transform duration-300 hover:scale-110 hover:shadow-lg'
                        >
                            <CardHeader>
                                <Image
                                    src={product.images[0] || '/placeholder-image.png'}
                                    alt={`product - ${product.id}`}
                                    width={300}
                                    height={300}
                                    className='w-40 h-60'
                                />
                            </CardHeader>
                            <CardContent>
                                <CardTitle className='line-clamp-2'>{product.title}</CardTitle>
                                <CardTitle className='font-bold'>$ {product.price}</CardTitle>
                            </CardContent>
                        </Card>
                    ))
                }
            </div>
        </div>
    );
}

export default ShoppingItems