'use client'
import 'tailwindcss/tailwind.css'
import Appbar from '@/app/components/Appbar';
import Drawer from '@/app/components/Drawer';
import React, {useContext, useEffect, useState} from 'react';
import { ProductContainer, ProductImage, CardButton } from '@/app/styles/ProductsStyles'

const PaymentPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState();

  const handleMenuToggle  = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  return (
    <main className="min-h-screen">
      <Appbar onMenuToggle={handleMenuToggle}></Appbar>
      <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>
        Página de pagamento
    </main>
  );

}
export default PaymentPage;