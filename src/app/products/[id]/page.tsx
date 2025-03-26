"use client";
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { Product } from './type';

const fetchProductById = async (id: number | string | string[]) => {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    if (!response.ok) {
        console.error('Failed to fetch product');
    }
    return response.json();
};

const colors = ['red', 'blue', 'green', 'yellow', 'black', 'white'];
const sizes = ['sm', 'md', 'lg', 'xl', 'xxl'];

const ProductDetail = () => {
    const params = useParams();
    const { id } = params;

    const { data, isLoading, error } = useQuery<Product>({
        queryKey: ['product', id],
        queryFn: () => fetchProductById(id),
        enabled: !!id,
    });

    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error instanceof Error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container mx-auto p-8 dark:text-white text-black">
            <div className="flex flex-row">
                <div>
                    <div className="flex flex-col space-y-2">
                        {data?.images.map((image, index) => (
                            <button
                                key={index}
                                className={`w-16 h-16 border rounded-lg overflow-hidden ${index === 0 ? 'ring-2 ring-primary' : ''
                                    }`}
                                onClick={() => console.log(`Selected simulated image ${index + 1}`)}
                            >
                                <Image
                                    src={image}
                                    alt={`Simulated product image ${index + 1}`}
                                    width={64}
                                    height={64}
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>
                <Image
                    src={selectedImage ? selectedImage : data?.images[0]!}
                    alt="product image"
                    width={400}
                    height={400}
                />
                <div className="ml-8">
                    <h1 className="text-3xl">{data?.title}</h1>
                    <h1 className="text-3xl">$ {data?.price}</h1>

                    {/* Color Picker */}
                    <div className="mb-6">
                        <p className="font-semibold mb-2">Colors:</p>
                        <div className="flex space-x-2 mt-2">
                            {colors.map((color, index) => (
                                <button
                                    key={index}
                                    className={`w-6 h-6 rounded-full border-2 ${selectedColor === color ? 'ring-2 ring-black' : ''
                                        }`}
                                    style={{ backgroundColor: color }}
                                    aria-label={`Select color ${color}`}
                                    onClick={() => setSelectedColor(color)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Size Picker */}
                    <div className="mb-6">
                        <p className="font-semibold mb-2">Sizes:</p>
                        <div className="flex space-x-4">
                            {sizes.map((size, index) => (
                                <button
                                    key={index}
                                    className={`px-4 py-2 border rounded-lg text-sm font-medium ${selectedSize === size ? 'bg-gray-300 dark:bg-gray-700' : ''
                                        } hover:bg-gray-200 dark:hover:bg-gray-600 transition`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size.toUpperCase()}
                                </button>
                            ))}
                        </div>

                    </div>

                    <p>{data?.description}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;