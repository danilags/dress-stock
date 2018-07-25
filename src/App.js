import React, { Component } from 'react';
import { API_CALL } from './utils';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: []
    }
  }

  componentDidMount() {
    this.getAllProducts();
  }

  async getAllProducts() {
    try {
      const option = {
        method: 'GET',
        url: '/products'
      };
      const request = await API_CALL(option);
      const { data } = request;
      this.setState({ products: data });
    } catch (error) {
      throw new Error(error);
    }
  }

  renderSource() {
    const { products } = this.state;
    return products.map((product, index) => (
      <div key={index}>
        <img src={`${product.image_url}`} alt={product.description} />
        <h3>{product.title}</h3>
        <p>Price : { product.price }</p>
      </div>
    ))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={`https://ss-assets-stag.global.ssl.fastly.net/assets/images/logo-ss-34f2d4dd.png`} className="App-logo" alt="logo" />
        </header>
        { this.renderSource() }
      </div>
    );
  }
}

export default App;
