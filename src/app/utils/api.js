const fetchProducts = async () => {
    const response = await fetch('http://localhost:3000/products');
    const products = await response.json();
    return products;
}

const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3000/products/${productId}`, {
        method: 'DELETE',
      });
  
      if (response.status === 204) {
        // A exclusão foi bem-sucedida (status 204)
        return true;
      } else {
        // Trate os erros, se necessário
        return false;
      }
    } catch (error) {
      // Trate os erros de rede ou outras exceções, se necessário
      return false;
    }
};
  
const searchProducts = async (searchTerm) => {
try {
    if (searchTerm) {
    const response = await fetch(`http://localhost:3000/products/search/?searchTerm=${searchTerm}`);
    if (response.ok) {
      const data = await response.json();
        return data;
    }
    }
    return [];
    } catch (error) {
        console.error('Erro ao buscar produtos', error);
        return [];
    }
};

const fetchProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`);
      if (response.ok) {
        const product = await response.json();
        return product;
      }
    } catch (error) {
      console.error('Erro ao buscar o produto', error);
    }
    return null;
  };
  
const updateProduct = async (id, data) => {
try {
    const response = await fetch(`http://localhost:3000/products/${id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    });
    return response.ok;
} catch (error) {
    console.error('Erro ao atualizar o produto', error);
    return false;
}
};
const createProduct = async (data) => {
  try {
    const response = await fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return response.ok;
  } catch (error) {
    console.error('Erro ao criar o produto', error);
    return false;
  }
};

const applyDiscount = async (productId) => {
  try {
    const response = await fetch(`http://localhost:3000/products/${productId}/discount`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ discount: 0.1 }), // 10% de desconto
    });

    if (response.ok) {
      // Desconto aplicado com sucesso (status 200)
      return true;
    } else {
      // Trate os erros, se necessário
      return false;
    }
  } catch (error) {
    // Trate os erros de rede ou outras exceções, se necessário
    return false;
  }
};

const updateRating = async (productId, rating) => {
  try {
    const response = await fetch(`http://localhost:3000/products/${productId}/rating`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "rating" : rating }),
    });

    return response.ok;
  } catch (error) {
    console.error('Erro ao atualizar a avaliação do produto', error);
    return false;
  }
};

// app/utils/api.js
const fetchCategories = async () => {
  try {
    const response = await fetch('http://localhost:3000/categories');
    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error('Erro ao buscar categorias', error);
    return [];
  }
};

const deleteCategory = async (categoryId) => {
  try {
    const response = await fetch(`http://localhost:3000/categories/${categoryId}`, {
      method: 'DELETE',
    });

    if (response.status === 204) {
      // A exclusão foi bem-sucedida (status 204)
      return true;
    } else {
      // Trate os erros, se necessário
      return false;
    }
  } catch (error) {
    // Trate os erros de rede ou outras exceções, se necessário
    return false;
  }
};

const fetchCategoriesOrderByName = async () => {
  try {
    const response = await fetch('http://localhost:3000/categories/categoriesOrderByName');
    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error('Erro ao buscar categorias', error);
    return [];
  }
};


const fetchProductsPaginated = async (page, pageSize, orderPrice, categoryId) => {
  try {
    const response = await fetch(`http://localhost:3000/products/filtered?page=${page}&categoryId=${categoryId}&orderPrice=${orderPrice}`);
    
    if (!response.ok) {
      throw new Error('Erro ao obter produtos');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export {
  fetchCategories,
  deleteCategory,
  fetchProducts,
  deleteProduct,
  searchProducts,
  fetchProduct,
  updateProduct,
  createProduct,
  applyDiscount,
  updateRating,
  fetchProductsPaginated,
  fetchCategoriesOrderByName, // Adicionando a função de paginação
};