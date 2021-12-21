/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Button } from '../Product'
import { useMutation } from 'react-query'
import api from '@/modules/api'

interface Props {
    open: boolean
    onClose(): void
}

interface CreateProductProps {
    name: string,
    dishType: string,
    price: string,
}

export default function SimpleModal(props: Props) {
    const { open, onClose } = props
    const [ name, setName ] = useState('') 
    const [ dishType, setDishType ] = useState('') 
    const [ price, setPrice ] = useState('') 
    const { mutateAsync } = useMutation(async (data: CreateProductProps) => {
        await api.post('/dishes', data )
    }, {
        onError: (err) => {
            console.log(err);
            
        }
    })
    if (!open) {
        return null
    }
    return (
        <div style={{
            position: 'absolute',
            top: '10%',
            left: '20%',
            backgroundColor: '#ffffff',
        }} >

            <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Product Name
                        </label>
                        <input onChange={(e) => setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Enter product name here" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="producttype">
                            Product type
                        </label>
                        <input onChange={(e) => setDishType(e.target.value)}  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="producttype" type="text" placeholder="Enter product name here" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Price">
                            Price
                        </label>
                        <input onChange={(e) => setPrice(e.target.value)}  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Price" type="text" placeholder="Enter product name here" />
                    </div>
                    <Button onClick={() => {

                        if (name && price && dishType) {
                            mutateAsync({
                                name, price, dishType
                            })
                        }
                    }} >
                        Submit
                    </Button>
                </form>
            </div>

            <Button onClick={onClose} >
                Close
            </Button>

        </div>
    )
}