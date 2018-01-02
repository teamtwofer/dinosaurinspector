// import { observer } from 'mobx-react';
import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { RouteComponentProps, Switch } from 'react-router';
import { AccountContainer } from './components/containers/AccountContainer';
import { FlashMessages } from './components/containers/FlashMessages';
import { Header } from './components/containers/Header';
import { Home } from './components/containers/Home';
import { MeasurementPageContainer } from './components/containers/MeasurementPageContainer';
import { Footer } from './components/ui/Footer';
import { MainContent } from './components/ui/MainContent';
import MainGrid from './components/ui/MainGrid';
import { AuthRoute } from './components/wrapper/AuthRoute';
import { Test } from './test/test';
import { account, index, measurements } from './urls';

export class App extends React.Component<RouteComponentProps<any>, never> {
  render() {
    return (
      <Router>
        <MainGrid>
          <Header />
          <MainContent>
            <Switch>
              <Route exact path={index()} component={Home} />
              <AuthRoute exact path={'/test'} component={Test} />
              <Route path={account()} component={AccountContainer} />
              <AuthRoute
                path={measurements()}
                component={MeasurementPageContainer}
              />
            </Switch>
            <FlashMessages />
          </MainContent>
          <Footer />
        </MainGrid>
      </Router>
    );
  }
}
