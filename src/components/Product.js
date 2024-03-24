import React, { useState } from "react";
import products from "../Products.json";

const Products = ({ addToCart, quantities }) => {
  // Function to increase the quantity of a product
  const increaseProductQuantity = (productId, product) => {
    addToCart(product, 1);
  };

  // Function to decrease the quantity of a product
  const decreaseProductQuantity = (productId, product) => {
    addToCart(product, -1);
  };

  return (
    <div className="w-1/2 border m-2">
      <h1 className="text-center text-3xl underline text-gray-600">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {Object.values(products).map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded-lg flex flex-col justify-between"
          >
            <div>
              <h4 className="text-xl font-semibold mb-2 text-teal-700 underline">
                {product.name}
              </h4>
              <img
                className="w-48 h-48 mx-auto mb-4"
                src={product.imageURL}
                alt={product.name}
              />
              <p className=" text-red-400">
                $<span className="text-green-400">{product.price}</span>
              </p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                className="bg-gray-400 hover:bg-gray-500 text-red-400 font-bold py-2 px-4 rounded"
                onClick={() => decreaseProductQuantity(product.id, product)}
              >
                -
              </button>
              <span className="bg-gray-200 px-4 py-2 rounded">
                {quantities[product.id] || 0}
              </span>
              <button
                className="bg-gray-400  hover:bg-gray-500 text-green-400 font-bold py-2 px-4 rounded"
                onClick={() => increaseProductQuantity(product.id, product)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
