import React, { Component } from 'react';
import {
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Button
} from 'reactstrap';
import { WrappSizes } from '../../components';
import { API_CALL } from '../../utils';
// import './App.css';


class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      price: 0,
      description: '',
      stock: 0,
      listSize: ['Choose size', 'S', 'M', 'L', 'XL', 'XXL'],
      listColor: [
        'Choose color',
        'Green',
        'Yellow',
        'Pale Blue',
        'Pink',
        'Red',
        'Blue',
        'Cobalt Blue',
        'Turquoise',
        'Orange',
        'Maroon',
        'Grey',
        'Black',
        'Purple',
        'White'
      ],
      materialList: [
        'Velvet',
        'Chiffon',
        'Georgette',
        'Crepe',
        'Satin',
        'Organza'
      ],
      sizes: [],
      colors: [],
      material: [],
      imageLink: '',
      _error: null,
      returned: false,
      testable: false,
      isProcess: false
    }
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeOption = this.handleChangeOption.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
  }

  formValidation() {
    let errors = {};
    if (this.state.title === '')
      errors['title'] = ['Please input the title'];
    if (this.state.price === 0 || this.state.price === '') 
      errors['price'] = ['Please input the price'];
    if (this.state.description === '')
      errors['description'] = ['Please input the description']
    if (this.state.stock === 0 || this.state.stock === '')
      errors['stock'] = ['Please input the stock']
    if (this.state.imageLink === '')
      errors['imageLink'] = ['Please input the description']
    if (Object.keys(errors).length) {
      this.setState({
        _error: {
          errors: { ...errors }
        }
      })
    }
    return errors;
  }

  handleChange(e) {
    const lastState = { ...this.state };
    lastState[e.target.name] = e.target.value;
    this.setState({ ...lastState });
  }

  errorChecker(name) {
    if(this.state._error!==null){
      return Object.keys(this.state._error.errors).filter(err => err === name).length > 0;
    }
    return false;
  }

  renderFeedBack(message, index) {
    return <p key={index} style={styles.feedBack}>{message}</p>
  }

  async submit(e) {
    e.preventDefault();
    const checker = await this.formValidation();
    if (Object.keys(checker).length === 0) {
      await this.setState({ isProcess: true });
      let value = {
        title: this.state.title,
        price: this.state.price,
        description: this.state.description,
        stock: this.state.stock,
        image_url: this.state.imageLink,
        sizes: this.state.sizes,
        colors: this.state.colors,
        material: this.state.material,
        returned: this.state.returned,
        testable: this.state.testable,
        loves: 0,
      }
      const option = {
        method: 'POST',
        url: 'products/',
        data: value
      };
      await API_CALL(option);
      setTimeout(() => {
        this.setState({ 
          title: '',
          price: 0,
          description: '',
          stock: 0,
          listSize: ['Choose size', 'S', 'M', 'L', 'XL', 'XXL'],
          listColor: [
            'Choose color',
            'Green',
            'Yellow',
            'Pale Blue',
            'Pink',
            'Red',
            'Blue',
            'Cobalt Blue',
            'Turquoise',
            'Orange',
            'Maroon',
            'Grey',
            'Black',
            'Purple',
            'White'
          ],
          materialList: [
            'Velvet',
            'Chiffon',
            'Georgette',
            'Crepe',
            'Satin',
            'Organza'
          ],
          sizes: [],
          colors: [],
          material: [],
          imageLink: '',
          _error: null,
          returned: false,
          testable: false,
          isProcess: false
        })
      }, 1500)
    }
  }

  handleChangeOption(e) {
    const lastOption = { ...this.state };
    const indexItem =  e.target.options.selectedIndex;
    const selected = lastOption[e.target.name].filter((item, index) => index === indexItem);
    let index = lastOption[e.target.name].indexOf(selected[0]);
    if (index > -1) {
      lastOption[e.target.name].splice(index, 1);
    }

    if (e.target.name === 'listSize') {
      const lastestSelected = this.state.sizes;
      lastestSelected.push(selected[0]);
      lastOption['sizes'] = lastestSelected;
    } else if (e.target.name === 'listColor') {
      const lastestSelected = this.state.colors;
      lastestSelected.push(selected[0]);
      lastOption['colors'] = lastestSelected;
    } else if (e.target.name === 'materialList') {
      const lastestSelected = this.state.material;
      lastestSelected.push(selected[0]);
      lastOption['material'] = lastestSelected;
    }
    this.setState({ ...lastOption });
  }

  handleChecked(e) {
    this.setState({
      [e.target.name]: !this.state[e.target.name]
    })
  }


  render() {
    console.log('this state ', this.state);
    if (this.state.isProcess) {
      return (
        <Container style={styles.container}>
          <h3>Loading...</h3>
        </Container>
      )
    }
    return (
      <Container style={styles.container}>
        <Form onSubmit={this.submit}>
          <FormGroup>
            <Label>Title</Label>
            <Input 
              type="text" 
              name="title"
              onChange={this.handleChange}
              value={this.state.title}
            />
            {
              !this.errorChecker('title') ? null :
              this.state._error.errors.title.map((item, index) => this.renderFeedBack(item, index))
            }
          </FormGroup>
          <FormGroup>
            <Label>Price</Label>
            <Input 
              type="number" 
              name="price"
              onChange={this.handleChange}
              value={this.state.price}
            />
            {
              !this.errorChecker('price') ? null :
              this.state._error.errors.price.map((item, index) => this.renderFeedBack(item, index))
            }
          </FormGroup>
          <FormGroup>
            <Label>Description</Label>
            <Input 
              type="text" 
              name="description"
              onChange={this.handleChange}
              value={this.state.description}
            />
            {
              !this.errorChecker('description') ? null :
              this.state._error.errors.description.map((item, index) => this.renderFeedBack(item, index))
            }
          </FormGroup>
          <FormGroup>
            <Label>Stock</Label>
            <Input 
              type="number" 
              name="stock"
              onChange={this.handleChange}
              value={this.state.stock}
            />
            {
              !this.errorChecker('stock') ? null :
              this.state._error.errors.stock.map((item, index) => this.renderFeedBack(item, index))
            }
          </FormGroup>
          <WrappSizes>
            {  
              this.state.sizes.length === 0 ? <p>Belum memilih size</p> :
              this.state.sizes.map((item, index) => <p key={index} style={{ background: '#d93b3d', padding: '5px', textAlign: 'center', color: '#fff', margin: '1px' }}>{item}</p>) 
            }
          </WrappSizes>
          <FormGroup>
            <Label>Available Size</Label>
            
            <Input type="select" name="listSize" onChange={this.handleChangeOption}>
              {
                this.state.listSize.map((item, index) => <option key={index}>{item}</option>)
              }
            </Input>
          </FormGroup>
          
          <WrappSizes>
            {  
              this.state.colors.length === 0 ? <p>Belum memilih warna</p> :
              this.state.colors.map((item, index) => <p key={index} style={{ background: '#d93b3d', padding: '5px', textAlign: 'center', color: '#fff', margin: '1px' }}>{item}</p>) 
            }
          </WrappSizes>
          <FormGroup>
            <Label>Available Color</Label>
            
            <Input type="select" name="listColor" onChange={this.handleChangeOption}>
              {
                this.state.listColor.map((item, index) => <option key={index}>{item}</option>)
              }
            </Input>
            
          </FormGroup>

          <WrappSizes>
            {  
              this.state.material.length === 0 ? <p>Belum memilih warna</p> :
              this.state.material.map((item, index) => <p key={index} style={{ background: '#d93b3d', padding: '5px', textAlign: 'center', color: '#fff', margin: '1px' }}>{item}</p>) 
            }
          </WrappSizes>
          <FormGroup>
            <Label>Available Material</Label>
            
            <Input type="select" name="materialList" onChange={this.handleChangeOption}>
              {
                this.state.materialList.map((item, index) => <option key={index}>{item}</option>)
              }
            </Input>
            
          </FormGroup>
          <FormGroup>
            <Label>Image URL</Label>
            <Input 
              type="text" 
              name="imageLink"
              onChange={this.handleChange}
              value={this.state.imageLink}
            />
            {
              !this.errorChecker('imageLink') ? null :
              this.state._error.errors.imageLink.map((item, index) => this.renderFeedBack(item, index))
            }
          </FormGroup>
          <FormGroup>
            <Input 
              name="returned"
              onChange={this.handleChecked} 
              checked={this.state.returned} 
              type="checkbox" />{' '}
                      Dapat di kembalikan
          </FormGroup>
          <FormGroup>
            <Input 
              name="testable"
              onChange={this.handleChecked} 
              checked={this.state.testable} 
              type="checkbox" />{' '}
                      Dapat di dicoba
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </Container>
      
    );
  }
}



const styles = {
  container: {
    minHeight: '500px',
    flex: 1,
    marginTop: '40px',
    padding: '40px',
    border: '1px solid #4a4a4a'
  },
  feedBack: {
    margin: '2px 0px',
    textAlign: 'left',
    color: '#fff',
    background: '#e5616b',
    display: 'table',
    padding: '0px 11px',
    borderRadius: '3px',
  }
}

export default Dashboard;
