const URL_BASE = '/api';

// Comunicacion de Productos {Products.html a ProductsController}

// Obtener todos los productos
export const getAllProducts = async () => {
    const response = await fetch(`${URL_BASE}/products`);
    const products = await response.json();
    return products;
};

// Agregar un producto
export const addProduct = async (product) => {
  try {
    const response = await fetch(`${URL_BASE}/products`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      const errorData = await response.text();
      console.error("La API ha arrojado un error:", errorData);
      throw new Error(`Server error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("No se pudo agregar el producto", error);
    throw error;
  }
}