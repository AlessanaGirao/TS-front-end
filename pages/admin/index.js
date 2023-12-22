'use client'
import 'tailwindcss/tailwind.css'
import Appbar from '@/app/components/Appbar';
import Drawer from '@/app/components/Drawer';
import React, {useContext, useEffect, useState} from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Link from 'next/link';
import { fetchProducts, deleteProduct, applyDiscount } from '@/app/utils/api'
import { CartContext } from '@/app/contexts/CartContext';
import { ProductContainer, ProductImage, CardButton } from '@/app/styles/ProductsStyles'

const AdminPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { addToCart } = useContext(CartContext);
  const { data: session } = useSession();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  const handleMenuToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    const getProducts = async () => {
      const productsData = await fetchProducts();
      console.log(productsData)
      setProducts(productsData);
    };
    getProducts();
  }, []);

  const handleDeleteProduct = async (productId) => {

    if (confirm("Quer mesmo excluir?") == true) {
      // Faça a chamada para excluir o produto
      const success = await deleteProduct(productId);

      if (success) {
        // Atualize a lista de produtos após a exclusão
        const updatedProducts = products.filter((product) => product.product_id !== productId);
        setProducts(updatedProducts);

        // Recarregue a página
        router.reload();
    }
    }
  };

  const handleApplyDiscount = async (productId) => {
    const confirmation = window.confirm("Deseja aplicar um desconto de 10% a este produto?");
    
    if (confirmation) {
      try {
        const response = await applyDiscount(productId);
        if (response) {
          alert("Desconto aplicado com sucesso!");
          // Atualize a lista de produtos após a aplicação do desconto
          const updatedProducts = products.map((product) => {
            if (product.product_id === productId) {
              // Aplicar um desconto de 10%
              product.price = product.price * 0.9;
            }
            return product;
          });
          setProducts(updatedProducts);
          // Recarregue a página
          router.reload();
        } else {
          alert("Erro ao aplicar o desconto.");
        }
      } catch (error) {
        console.error("Erro ao aplicar desconto:", error);
        alert("Erro ao aplicar o desconto.");
      }
    }
  };
  

  useEffect(() => {
    const getProducts = async () => {
        const productsData = await fetchProducts();
        setProducts(productsData);
    }
    getProducts();
  }, []);

  
  return (
    <main className="min-h-screen">
    <Appbar onMenuToggle={handleMenuToggle}></Appbar>
    <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>
    <ul>
      {products.map((product) => (
        <li key={product.product_id}>
          <ProductContainer>
            <p>Produto: {product.product_title}</p>
            <p>Preço: {product.product_price}</p>
              <button
                className="bg-red-500 text-white px-4 py-2 m-2 rounded-md"
                onClick={() => handleDeleteProduct(product.product_id)}
              >
                Delete Product
              </button>
              <Link href={`/admin/products/edit/${product.product_id}`}>
                <button
                  className="bg-green-500 text-white px-4 py-2 m-2 rounded-md"
                >
                  Edit
                </button>
              </Link>

              <button
                className="bg-blue-500 text-white px-4 py-2 m-2 rounded-md"
                onClick={() => handleApplyDiscount(product.product_id)}
              >
                Apply 10% Discount
              </button>

          </ProductContainer>
        </li>
      ))}
    </ul>
  </main>
  );

}
export default AdminPage;