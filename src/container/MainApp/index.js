import React from 'react';
import { Switch } from 'react-router-dom';
import Route from '../Route';

import { MainWrapper, NavBar, Container } from '../../components';

class MainApp extends React.Component {
  render() {
    return (
      <MainWrapper>
        <NavBar>
          <img src={`https://ss-assets-stag.global.ssl.fastly.net/assets/images/logo-ss-34f2d4dd.png`} className="App-logo" alt="logo" />
        </NavBar>
        <Container>
          <Switch>
            {this.props.routes.map((route, i) => (
                <Route key={i} {...route} />
            ))}
          </Switch>
        </Container>
      </MainWrapper>
    )
  }
}

export default MainApp;

