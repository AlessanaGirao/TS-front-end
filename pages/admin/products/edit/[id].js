// pages/products/[id].js
import Appbar from '@/app/components/Appbar';
import Drawer from '@/app/components/Drawer';
import 'tailwindcss/tailwind.css'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { fetchProduct, updateProduct } from '@/app/utils/api'; // Importe as funções fetchProduct e updateProduct

const EditProduct = () => {
  const router = useRouter();
  const { id } = router.query;
  const { register, handleSubmit, setValue } = useForm();
  const [product, setProduct] = useState(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    const getProduct = async () => {
      if (id) {
        const productData = await fetchProduct(id);
        setProduct(productData);
        // Preencha os campos do formulário com os valores do produto
        setValue('title', productData.title);
        setValue('price', productData.price);
        setValue('description', productData.description);
        setValue('category', productData.category);
        // Continue preenchendo outros campos, se necessário
      }
    };

    getProduct();
  }, [id]);

  const onSubmit = async (data) => {
    // Envie a solicitação PUT para atualizar o produto
    const success = await updateProduct(id, data);
    if (success) {
      alert('produto alterado')
      router.push(`/admin`);
    }
  };

  if (!product) {
    return <div>Carregando...</div>;
  }

  return (
    <main className="min-h-screen">
      <Appbar onMenuToggle={handleMenuToggle}></Appbar>
      <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>
      <div className="flex items-center justify-center ">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Editar Produto</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-600">Título</label>
        <input {...register('title')} className="w-full border rounded py-2 px-3" />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block text-sm font-medium text-gray-600">Preço</label>
        <input {...register('price')} className="w-full border rounded py-2 px-3" />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-600">Descrição</label>
        <textarea rows="5" {...register('description')} className="w-full border rounded py-2 px-3" />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-600">Categoria</label>
        <input {...register('category')} className="w-full border rounded py-2 px-3" />
      </div>
      <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">Salvar</button>
    </form>
  </div>
</div>
</main>
  );
};

export default EditProduct;
