import React, { useState } from 'react';
import { cn } from "@/lib/utils"

const sizes = ['S', 'M', 'L', 'XL'];
const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00'];

export default function ProductOptions() {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  return (
    <div>
      <h2>Tallas</h2>
      <div className="flex">
        {sizes.map((size, index) => (
          <label key={index} className={cn("inline-flex items-center mt-3")}>
            <input
              type="checkbox"
              className={cn("form-checkbox h-5 w-5 text-gray-600")}
              checked={selectedSize === size}
              onChange={() => setSelectedSize(size)}
            />
            <span className={cn("ml-2 text-gray-700")}>{size}</span>
          </label>
        ))}
      </div>

      <h2>Colores</h2>
      <div className="flex">
        {colors.map((color, index) => (
          <label key={index} className={cn("inline-flex items-center mt-3")}>
            <input
              type="checkbox"
              className={cn("form-checkbox h-5 w-5", { [color]: selectedColor === color })}
              checked={selectedColor === color}
              onChange={() => setSelectedColor(color)}
            />
            <span className={cn("ml-2 text-gray-700")}>{color}</span>
          </label>
        ))}
      </div>
    </div>
  );
}