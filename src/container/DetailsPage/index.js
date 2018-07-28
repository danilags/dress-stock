import React from 'react';
import { API_CALL } from '../../utils';

import { Container, CardProduct, InnerCard, WrappSizes } from '../../components';

class DetailsPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      idProduct: this.props.match.params.id,
      productDetails: null
    }
    this.renderSize = this.renderSize.bind(this);
  }

  componentDidMount() {
    this.getDetailsProduct();
  }

  async getDetailsProduct() {
    try {
      const option = {
        method: 'GET',
        url: `/products/${this.state.idProduct}`
      };
      const request = await API_CALL(option);
      const { data } = request;
      // let res = JSON.parse(data);
      // console.log('Balikan data productDetails ', res);
      this.setState({ productDetails: data });
    } catch (error) {
      throw new Error(error);
    }
  }

  renderSize() {
    const { sizes } = this.state.productDetails;
    return sizes.map((size, index) => <p key={index} style={{ background: '#d93b3d', padding: '5px', textAlign: 'center', color: '#fff', margin: '1px' }}>{size}</p> ) 
  }

  renderMaterial() {
    const { material } = this.state.productDetails;
    return material.map((material, index) => <p key={index} style={{ background: '#d93b3d', padding: '5px', textAlign: 'center', color: '#fff', margin: '1px' }}>{material}</p> ) 
  }

  renderColor() {
    const { colors } = this.state.productDetails;
    return colors.map((color, index) => <p key={index} style={{ background: '#d93b3d', padding: '5px', textAlign: 'center', color: '#fff', margin: '1px' }}>{color}</p> ) 
  }

  render() {
    console.log('this.sttae ', this.state.productDetails);
    const { productDetails } = this.state
    if (productDetails === null) {
      return (
        <Container>
          <h3>Loading...</h3>
        </Container>
      )
    }
    return (
      <CardProduct>
        <InnerCard>
          <div>
            <img src={`${productDetails.image_url}`} alt={productDetails.description} />
          </div>
          <div>
            <h3>{productDetails.title}</h3>
            <p>{productDetails.description}</p>
            <p>Price : { productDetails.price }</p>
            <p>Stock {productDetails.stock}</p>
            <p>Loves {productDetails.loves}</p>
            <p>
              Produk bisa 
              { productDetails.testable ? ' dicoba ' : null } dan 
              { productDetails.returned ? ' dikembalikan ' : null }
              : YA
            </p>
            <WrappSizes>
              { this.renderSize() }
            </WrappSizes>
            <WrappSizes>
              { this.renderMaterial() }
            </WrappSizes>
            <WrappSizes>
              { this.renderColor() }
            </WrappSizes>
          </div>
          
        </InnerCard>
        
      </CardProduct>
    )
  }
}

export default DetailsPage;
