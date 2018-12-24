
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import { DAEMON } from 'utils/constants';

import { Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Employee from 'containers/Employee/Loadable';
import Store from 'containers/Store/Loadable';
import WorkingDay from 'containers/WorkingDay/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { selectIsLoggedIn } from 'containers/App/selectors';
import saga from './saga';
import LoginScreen from './LoginScreen';


import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

class App extends Component {
  render() {
    const { isLoggedIn } = this.props;
    if (!isLoggedIn) {
      return (
        <AppWrapper>
          <Helmet
            titleTemplate="%s - Bakery Management"
            defaultTitle="Bakery Management"
          >
            <meta name="description" content="A Small Bakery" />
          </Helmet>
          <Header />

          <Redirect from="/" to="/login" />
          <Switch>
            <Route path="/login" component={LoginScreen} />

          </Switch>
          <Footer />
          <GlobalStyle />
        </AppWrapper>
          );
    }
    return (
      <AppWrapper>
        <Helmet
          titleTemplate="%s - Bakery Management"
          defaultTitle="Bakery Management"
        >
          <meta name="description" content="A Small Bakery" />
        </Helmet>
        <Header />

        <Switch>
          <Route path="/employee" component={Employee} />
          <Route path="/store" component={Store} />
          <Route path="/working-day" component={WorkingDay} />
          <Route path="" component={NotFoundPage} />
        </Switch>

        <Footer />
        <GlobalStyle />
      </AppWrapper>
    );
  }

}

App.propTypes = {

  isLoggedIn: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isLoggedIn: selectIsLoggedIn(state),
});
const withConnect = connect(mapStateToProps, null);
const withSaga = injectSaga({ key: 'global', saga, mode: DAEMON });

export default compose(withConnect, withSaga)(App);
// export default compose(withConnect)(App);
