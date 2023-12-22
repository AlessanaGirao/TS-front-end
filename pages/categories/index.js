// pages/categories/index.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchCategories, deleteCategory } from '@/app/utils/api';
import Appbar from '@/app/components/Appbar';
import Drawer from '@/app/components/Drawer';
import 'tailwindcss/tailwind.css'


const CategoriesPage = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    };

    getCategories();
  }, []);

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
      const success = await deleteCategory(categoryId);

      if (success) {
        // Atualize a lista de categorias após a exclusão
        const updatedCategories = categories.filter((category) => category.category_id !== categoryId);
        setCategories(updatedCategories);
      }
    }
  };

  return (
    <div>
      <Appbar />
      <Drawer />

      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-semibold mb-4">Categorias</h1>
        <ul>
          {categories.map((category) => (
            <li key={category.category_id} className="mb-2 p-2 bg-gray-100 rounded">
              <span className="mr-2">{category.category_name}</span>
              <button
                onClick={() => handleDeleteCategory(category.category_id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoriesPage;
