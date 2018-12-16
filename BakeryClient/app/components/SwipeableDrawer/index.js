import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Face from '@material-ui/icons/Face';
import Restaurant from '@material-ui/icons/Restaurant';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  noUnderline: {
    textDecoration: 'none',
  },
};

class SwipeableTemporaryDrawer extends React.Component {

  render() {
    const { classes } = this.props;

    const fullList = (
      <div className={classes.fullList}>
        <List>
          <Link to="/employee/list" className={classes.noUnderline}>
            <ListItem button key="employee">
              <ListItemIcon><Face /></ListItemIcon>
              <ListItemText primary="Employee" />
            </ListItem>
          </Link>
          <Link to="/store/list" className={classes.noUnderline}>
            <ListItem button key='store'>
              <ListItemIcon><Restaurant /></ListItemIcon>
              <ListItemText primary="Store" />
            </ListItem>
          </Link>

        </List>
      </div>
    );

    return (
      <div>
        <SwipeableDrawer
          anchor="top"
          open={this.props.top}
          onClose={this.props.toggleDrawer('top', false)}
          onOpen={this.props.toggleDrawer('top', true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.props.toggleDrawer('top', false)}
            onKeyDown={this.props.toggleDrawer('top', false)}
          >
            {fullList}
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

SwipeableTemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  top: PropTypes.bool,
  toggleDrawer: PropTypes.func,
};

export default withStyles(styles)(SwipeableTemporaryDrawer);
