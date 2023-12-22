'use client'
import Appbar from './components/Appbar';
import Drawer from './components/Drawer';
import React, {useState, useEffect} from 'react';
import { useRouter } from "next/navigation";
import { searchProducts } from '@/app/utils/api'; // Importe a função searchProducts


export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();

  const handleMenuToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    // Função para buscar produtos com base no termo de pesquisa
    const search = async () => {
      const results = await searchProducts(searchTerm);
      setSearchResults(results);
    };

    search();
  }, [searchTerm]);

  return (
    <main className="min-h-screen">
      <Appbar onMenuToggle={handleMenuToggle}></Appbar>
      <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>
      <div className="w-full flex justify-center py-8">
        <input
          type="text"
          placeholder="Buscar produtos..."
          className="bg-gray-200 border border-gray-300 rounded-full p-2 w-80"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex justify-center">
        <ul>
          {searchResults.map((product) => (
            <li key={product.id} className="mb-4">
              <div className="bg-white p-4 shadow-md">
                <img src={product.product_image} alt={product.product_title} className="w-16 h-16 rounded-full" />
                <p className="mt-2">{product.product_title}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}