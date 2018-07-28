import React from 'react';

import { API_CALL } from '../../utils';
import { CardProduct, InnerCard } from '../../components';

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      page: 1,
      prevY: 0,
      loading: false,
    }
  }

  componentDidMount() {
    this.getAllProducts(1, 20);
    let options = {
      root: null, 
      rootMargin: '0px',
      threshold: 1.0
    };
    // Create an observer instance
    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this), // pass the callback
      options
    );
    this.observer.observe(this.loadingRef);
  }

  handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      const curPage = this.state.page + 1;
      this.getAllProducts(curPage, 5);
      this.setState({ page: curPage, loading: true });
    }
    this.setState({ prevY: y });
  }

  async getAllProducts(page, limit) {
    try {
      const option = {
        method: 'GET',
        url: `/products?_page=${page}&_limit${limit}`
      };
      const request = await API_CALL(option);
      const { data } = request;
      console.log('Balikan data ', data);
      if (data.length) {
        const lastState = [ ...this.state.products, ...data ];
        this.setState({ products: lastState });
      } else {
        this.setState({ loading: false })
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  slugify(title) {
    return title.split(' ').join('-').toLowerCase();
  }

  renderSource() {
    const { products } = this.state;
    return products.map((product, index) => (
      <CardProduct key={index}>
        <a href={`/products/${product.id}/${this.slugify(product.title)}`}>
          <InnerCard>
            <div>
              <img src={`${product.image_url}`} alt={product.description} />
            </div>
            <div>
              <h3>{product.title}</h3>
              <p>Price : { product.price }</p>
              <p>{product.description}</p>
            </div>
          </InnerCard>
        </a>
      </CardProduct>
    ));
  }

  render() {
    const loadingTextCSS = { display: this.state.loading ? 'block' : 'none' };
    const loadingCSS = {
      height: '100px',
      margin: '30px'
    };
    return (
      <div>
        { this.renderSource() }
        <div
          ref={loadingRef => (this.loadingRef = loadingRef)}
          style={loadingCSS}
        >
          <span style={loadingTextCSS}>Loading...</span>
        </div>
      </div>
    )
  }
}


export default HomePage;

