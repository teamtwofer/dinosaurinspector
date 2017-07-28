// import { observer } from 'mobx-react';
import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { RouteComponentProps } from 'react-router';
import { AccountContainer } from './components/containers/AccountContainer';
import { FlashMessages } from './components/containers/FlashMessages';
import { Header } from './components/containers/Header';
import { Home } from './components/containers/Home';
import { Footer } from './components/ui/Footer';
import { MainContent } from './components/ui/MainContent';
import MainGrid from './components/ui/MainGrid';
import { AuthRoute } from './components/wrapper/AuthRoute';
import { Test } from './test/test';
import { account, index } from './urls';

export class App extends React.PureComponent<RouteComponentProps<any>, never> {
  render() {
    return (
      <Router>
        <MainGrid>
          <Header />
          <MainContent>
            <Route exact path={index()} component={Home} />
            <AuthRoute exact path={'/test'} component={Test} />
            <Route path={account()} component={AccountContainer} />
            <FlashMessages />
          </MainContent>
          <Footer />
        </MainGrid>
      </Router>
    );
  }
}
