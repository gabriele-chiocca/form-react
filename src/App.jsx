import { useState } from 'react';
import './App.css';
import ProductCard from './components/ProductCard';
import Header from './components/Header';
import Footer from './components/Footer';

import ToggleVisible from './components/ToggleVisible';
import TodoApp from './components/TodoApp';
import Form from './components/Form';

function App() {
  return (
    <div className="container mt-5">
      <Form></Form>
    </div>
  );
}

export default App;
