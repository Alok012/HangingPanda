interface Product {
    id: number;
    title: string;
  }
  
  interface ProductResponse {
    products: Product[];
  }
  
  const ProductData = async () => {
    const response = await fetch('https://dummyjson.com/products');
    const data: ProductResponse = await response.json();
    const products = data.products;
    console.log(data);
  
    return (
      <div>
        <h2>Product List</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default ProductData;
  