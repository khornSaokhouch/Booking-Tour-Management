"use client"
import React, { useState } from 'react';
// import React from 'react';
import ProfilerUser from '@/components/Profile';
import Footer from "@/components/Footer";

const SiemReapTour = () => {
    const [quantity, setQuantity] = useState(0);
    const pricePerPackage = 250;
    const totalPayment = quantity * pricePerPackage;
  
    const increaseQuantity = () => {
      setQuantity(quantity + 1);
    };
  
    const decreaseQuantity = () => {
      if (quantity > 0) {
        setQuantity(quantity - 1);
      }
    };
  return (

    <div>
    <ProfilerUser/>

    <div className="container mx-auto px-20 py-8">
      {/* Header Section */}
      <section>
        <h1 className="text-4xl font-bold mb-2">Siem Reap Tour</h1>
        <p className="text-gray-600 mb-4 text-yellow-600">📍 Siem Reap • ⭐⭐⭐⭐⭐ (348 reviews)</p>
      </section>

      {/* Gallery Section */}
      <section className="grid grid-cols-3 gap-4 mb-8">
        <img
          src="https://www.travelandleisure.com/thmb/wsA6EXFuYkqtuJGLbQWw05-cwPs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/lake-como-MOSTBEAUTIFUL0921-cb08f3beff1041e4beefc67b5e956b23.jpg"
          alt="Gallery Image 1"
          className="rounded-lg h-64 w-full object-cover"
        />
        <img
          src="https://pohcdn.com/guide/sites/default/files/styles/paragraph__text_with_image___twi_image/public/2024-09/Lake-Como.jpg"
          alt="Gallery Image 2"
          className="rounded-lg h-64 w-full object-cover"
        />
        <div className="relative h-64 w-full">
          <img
            src="https://www.travelandleisure.com/thmb/qmHq7O29-0s5MvBc8loMMHhNHmw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/banff-national-park-alberta-MOSTBEAUTIFUL0921-26a3ea1b54ca49a5a0ea5b759f8f96cd.jpg"
            alt="Gallery Image 3"
            className="rounded-lg h-64 w-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
            <span className="text-white text-xl font-bold">+2 More Photos</span>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                    <p className="text-gray-700 leading-relaxed">
                    Located in Taksim Gumusy, the heart of Istanbul, the CVK Park Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos iusto provident consequuntur numquam soluta amet delectus tempora officia, enim nostrum vitae veritatis cum nesciunt inventore temporibus velit. Voluptate, recusandae pariatur! Bosphorus Hotel Istanbul has risen from the ashes of the historic Park Hotel...
                    </p>
                </section>

                {/* Plan Package Section */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Plan Package Section */}
            <div className="col-span-1">
                <h2 className="text-xl text-blue-600 font-semibold mb-2">Plan Package</h2>
                <div>
                {/* Repeated Plan Package */}
                {Array(4)
                    .fill(0)
                    .map((_, index) => (
                    <div key={index} className="rounded-lg px-4 mb-4 mt-6">
                        <h3 className="font-semibold text-lg text-blue-400">Day 01: Phnom Penh</h3>
                        <p className="text-gray-600 mt-2">
                        See the highlights of Livestock of 2 zodiac nodes of tropper Westminster...
                        </p>
                    </div>
                    ))}
                </div>
            </div>

            {/* Booking Section */}
            <div className="col-span-1 bg-white shadow-lg rounded-lg p-6">
                <div className="mt-4">
                <h3 className="text-lg font-bold mb-5">Most popular facilities that we provide</h3>
                <div className="items-center space-x-6 text-gray-700">
                    {/* Private parking */}
                    <div className="flex mx-5 items-center space-x-2 mb-2">
                    <span className="text-green-600 text-xl">Ⓟ</span>
                    <span>Private parking</span>
                    </div>
                    {/* Free WiFi */}
                    <div className="flex items-center space-x-2 mb-2">
                    <span className="text-green-600 text-xl">📶</span>
                    <span>Free WiFi</span>
                    </div>
                    {/* Family rooms */}
                    <div className="flex items-center space-x-2 mb-2">
                    <span className="text-green-600 text-xl">👨‍👩‍👧‍👦</span>
                    <span>Family rooms</span>
                    </div>
                    {/* Non-smoking rooms */}
                    <div className="flex items-center space-x-2 mb-2">
                    <span className="text-green-600 text-xl">🚭</span>
                    <span>Non-smoking rooms</span>
                    </div>
                    {/* Good breakfast */}
                    <div className="flex items-center space-x-2">
                    <span className="text-green-600 text-xl">☕</span>
                    <span>Good breakfast</span>
                    </div>
                </div>
                <div className="mt-6 p-6 bg-gray-50 rounded-lg shadow-md">
                    <h1 className="text-lg font-semibold">
                    one package per <span className="text-red-500">$250</span>
                    </h1>

                    {/* Quantity Selector */}
                    <div className="mt-4 flex items-center bg-gray-200 rounded-lg p-2">
                    <label className="text-gray-700 mr-4 font-medium">Quantity</label>
                    <button
                        className="w-8 h-8 bg-gray-300 text-gray-700 rounded-full flex justify-center items-center hover:bg-gray-400"
                        onClick={decreaseQuantity}
                    >
                        -
                    </button>
                    <span className="mx-4 text-lg font-medium">{quantity}</span>
                    <button
                        className="w-8 h-8 bg-blue-500 text-white rounded-full flex justify-center items-center hover:bg-blue-600"
                        onClick={increaseQuantity}
                    >
                        +
                    </button>
                    </div>

                    {/* Total Payment */}
                    <div className="mt-6">
                    <h2 className="text-gray-700 font-semibold">Total Payment</h2>
                    <p className="text-2xl font-bold">${totalPayment}</p>
                    </div>

                    {/* Book Now Button */}
                    <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                    Book Now
                    </button>
                </div>
                </div>
            </div>
    </section>

      
    </div>



    <Footer/>
    </div>
  );
};

export default SiemReapTour;