import 'tailwindcss/tailwind.css'
import Appbar from '@/app/components/Appbar';
import Drawer from '@/app/components/Drawer';
import React, {useContext, useState} from 'react';
import { CartContext } from '@/app/contexts/CartContext';
import { ProductContainer, ProductImage, CardButton } from '@/app/styles/ProductsStyles'

const CartPage = () => {

  const [isDrawerOpen, setIsDrawerOpen] = useState();
  const { cartItems, removeFromCart } = useContext(CartContext);

  const handleMenuToggle  = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  return (
    <main className="min-h-screen">
      <Appbar onMenuToggle={handleMenuToggle}></Appbar>
      <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <ProductContainer>
              <ProductImage src={item.image}/>
                <p>{item.title}</p>
                <p>Price: {item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <CardButton onClick={() => removeFromCart(item.id)}>Remove from Cart</CardButton>
              </ProductContainer>
            </li>
          ))}
        </ul>

    </main>
  );

}
export default CartPage;