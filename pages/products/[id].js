import 'tailwindcss/tailwind.css'
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { fetchProduct, updateRating } from "@/app/utils/api";
import Appbar from '@/app/components/Appbar';
import Drawer from '@/app/components/Drawer';

const ProductPage = () => {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState();

  const handleMenuToggle  = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  useEffect(() => {
    const loadProduct = async () => {
      const productId = router.query.id;
      const productData = await fetchProduct(productId);
      setProduct(productData);
      setRating(productData ? productData.rating : 0);
    };

    if (router.query.id) {
      loadProduct();
    }
  }, [router.query.id]);

  const handleRatingChange = async () => {
    const productId = router.query.id;
    const response = await updateRating(productId, rating);
    if (response) {
      // Atualização bem-sucedida
      alert("Avaliação atualizada com sucesso!");
    } else {
      alert("Erro ao atualizar a avaliação do produto.");
    }
  };

  return (
    <main className="min-h-screen">
    <Appbar onMenuToggle={handleMenuToggle}></Appbar>
    <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>
    {product ? (
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <img
              src={product.product_image}
              alt={product.product_title}
              className="w-full h-auto max-h-96 object-contain"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.product_title}</h1>
            <p className="text-xl text-gray-600">${product.product_price.toFixed(2)}</p>
            <p className="text-lg text-gray-600">{product.product_description}</p>
            <div className="mt-4">
              <p>Avaliação do Produto:</p>
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-16 p-2 border border-gray-300 rounded"
              />
              <button
                onClick={handleRatingChange}
                className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
              >
                Atualizar Avaliação
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <p className="text-center text-2xl mt-8">Carregando...</p>
    )}
  </main>
  );
};

export default ProductPage;
