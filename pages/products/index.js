// Importe as dependências necessárias
import 'tailwindcss/tailwind.css';
import Appbar from '@/app/components/Appbar';
import Drawer from '@/app/components/Drawer';
import React, { useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { fetchProductsPaginated } from '@/app/utils/api';
import { CartContext } from '@/app/contexts/CartContext';
import { ProductContainer, ProductImage, CardButton } from '@/app/styles/ProductsStyles';

const ProductsPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { addToCart } = useContext(CartContext);

  const handleMenuToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const { data: session } = useSession();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    loadProducts(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  const [orderPrice, setOrderPrice] = useState(''); // Estado para armazenar a ordenação
  const [categoryId, setCategoryId] = useState(''); // Estado para armazenar o ID da categoria

  const handleOrderChange = (event) => {
    setOrderPrice(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategoryId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loadProducts(currentPage, pageSize, orderPrice, categoryId);
  };

  const loadProducts = async (page, pageSize, orderPrice, categoryId) => {
    try {
      const productsData = await fetchProductsPaginated(page, pageSize, orderPrice, categoryId);
      setProducts(productsData.products);
      setCurrentPage(productsData.currentPage);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadProducts(currentPage, pageSize, orderPrice, categoryId);
  }, [currentPage, pageSize, orderPrice, categoryId]);

  return (
    <main className="min-h-screen">
      <Appbar onMenuToggle={handleMenuToggle}></Appbar>
      <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>
      <form onSubmit={handleSubmit} className="flex justify-center mt-4">
        {/* Select para ordenação */}
        <select value={orderPrice} onChange={handleOrderChange} className="mr-2">
          <option value="">Ordenar por</option>
          <option value="asc">Preço mais baixo</option>
          <option value="desc">Preço mais alto</option>
        </select>

        {/* Input text para ID da categoria */}
        <input
          type="text"
          placeholder="ID da Categoria"
          value={categoryId}
          onChange={handleCategoryChange}
          className="mr-2"
        />

        {/* Botão para enviar o formulário */}
        <button type="submit" className="bg-lime-600 text-white font-semibold py-2 px-4 rounded">
          Filtrar
        </button>
      </form>

   
      <ul>
        {products.map((product) => (
          <li key={product.product_id}>
            <ProductContainer>
              <p>{product.product_title}</p>
              <p>{product.product_price}</p>
              <p>{product.product_description}</p>
              <p>{product.product_category} </p>
              <CardButton onClick={() => addToCart(product)}>Add cart</CardButton>
            </ProductContainer>
          </li>
        ))}
      </ul>

      {/* Adicione a navegação de páginação */}
      <div className="flex justify-center mt-4">
        <button
          className="bg-lime-600 text-white font-semibold py-2 px-4 rounded mr-2"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <button
          className="bg-lime-600 text-white font-semibold py-2 px-4 rounded"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Próxima
        </button>
      </div>
    </main>
  );
};

export default ProductsPage;
