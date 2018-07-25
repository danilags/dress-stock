import React from 'react';

import { API_CALL } from '../../utils';
import { CardProduct, InnerCard } from '../../components';

class HomePage extends React.Component {
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
      <CardProduct key={index}>
        <InnerCard>
          <div>
            <img src={`${product.image_url}`} alt={product.description} />
          </div>
          <div>
            <h3>{product.title}</h3>
            <p>Price : { product.price }</p>
          </div>
        </InnerCard>
      </CardProduct>
    ));
  }

  render() {
    return (
      <div>
        { this.renderSource() }
      </div>
    )
  }
}


export default HomePage;

