import {useState} from 'react';
import ProductSearch from './componentes/ProductSearch';
import Header from './componentes/Header';
import ProductList from './componentes/ProductList';
import { initialProducts } from './data/product';
import './App.css';

export default function App() {
  const [search, setSearch] = useState('')

  const filteredProducts = initialProducts.filter((product) =>
    product.nome.toLocaleLowerCase('pt-BR').includes(
      search.toLocaleLowerCase('pt-BR')
    )
  );

  return (
    <main className="container">
      <Header />
      <ProductSearch value={search} onSearchChange={setSearch}/>
      <p>{filteredProducts.length} produto(s) encontrado(s)</p>
      <ProductList products={filteredProducts}/>
    </main>
  );
}