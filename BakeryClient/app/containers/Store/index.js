
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Switch, Route, withRouter, Link } from 'react-router-dom';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

// import messages from '../messages';
import { makeSelectStoreList, makeSelectCurrentStore, makeSelectRequestError, makeSelectRequestSuccess } from './selectors';
import { loadStoreListRequest, deleteStoreRequest, setCurrentStore, resetStoreSuccess } from './actions';
import StoreInput from './StoreInput';
import StoreList from './StoreList';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class Store extends React.Component {

  componentDidMount() {
    this.props.actions.loadStoreListRequest();
  }

  componentDidUpdate(prevProps) {
    const { currentStore, actions } = this.props;
    if (prevProps.currentStore !== currentStore) {
      actions.loadStoreListRequest();
    }
  }

  render() {
    return (
      <div>
        <Switch>
          <Route
            path={`${this.props.match.url}`}
            exact
            render={(routeProps) => (
              <StoreList {...routeProps} data={this.props.storeList} />
            )}
          />
          <Route
            path={`${this.props.match.url}/list`}
            exact
            render={(routeProps) => (
              <StoreList
                {...routeProps}
                data={this.props.storeList}
                deleteStoreRequest={this.props.actions.deleteStoreRequest}
                setCurrentStore={this.props.actions.setCurrentStore}
                requestSuccess={this.props.requestSuccess}
                requestError={this.props.requestError}
                resetStoreSuccess={this.props.actions.resetStoreSuccess}
              />
            )}
          />
          <Route
            path={`${this.props.match.url}/add-new`}
            exact
            component={StoreInput}

          />
          { this.props.storeList && this.props.storeList.length &&
            <Route
              path={`${this.props.match.url}/:id`}
              exact
              render={props => <StoreInput {...props} />}
            /> }

        </Switch>
      </div>

    );
  }
}

Store.propTypes = {
  actions: PropTypes.object,
  storeList: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  storeList: makeSelectStoreList(),
  currentStore: makeSelectCurrentStore(),
  requestSuccess: makeSelectRequestSuccess(),
  requestError: makeSelectRequestError(),
});


const mapDispatchToProps = (dispatch) => ({actions:
    bindActionCreators({
      loadStoreListRequest,
      deleteStoreRequest,
      setCurrentStore,
      resetStoreSuccess,
    },
      dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'store', reducer });
const withSaga = injectSaga({ key: 'store', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withRouter,
)(Store);
