import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import Paper from '@material-ui/core/Paper/Paper';
import Table from '@material-ui/core/Table/Table';
import TableBody from '@material-ui/core/TableBody/TableBody';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import { NavLink } from 'react-router-dom';
import TablePagination from '@material-ui/core/TablePagination/TablePagination';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import IconButton from '@material-ui/core/IconButton/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddCircle from '@material-ui/icons/AddCircle';
import AlertDialogSlide from 'components/DialogSlide';

import { createStructuredSelector } from 'reselect/lib/index';
import EnhancedTableHead from './EnhancedTableHead';

import {
  deleteWorkingDayRequest,
  loadWorkingDayListRequest,
  resetWorkingDaySuccess,
  setCurrentWorkingDay,
} from '../actions';
// import { loadEmployeeListRequest } from '../../Employee/actions';
// import { loadStoreListRequest } from '../../Store/actions';
import {
  makeSelectCurrentWorkingDay,
  makeSelectRequestError,
  makeSelectRequestSuccess,
  makeSelectWorkingDayList,
} from '../selectors';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Working Day List
          </Typography>
        )}

      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon onClick={props.handleDelete} />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Add New">
            <NavLink to="/working-day/add-new">
              <AddCircle />
            </NavLink>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  handleDelete: PropTypes.func,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    // minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class WorkingDayList extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'calories',
    selected: [],
    page: 0,
    rowsPerPage: 5,
  };

  componentDidMount() {
    this.props.actions.loadWorkingDayListRequest();
  }

  componentDidUpdate(prevProps) {
    const { currentWorkingDay, actions } = this.props;
    if (prevProps.currentWorkingDay !== currentWorkingDay) {
      actions.loadWorkingDayListRequest();
    }
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: this.props.workingDayList.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected },() => {
      const { workingDayList, actions } = this.props;
      const itemList = this.state.selected;
      const currentId =
        itemList.length > 0 ? itemList[itemList.length - 1] : null;
      const current = workingDayList.find(item => item.id === currentId);
      actions.setCurrentWorkingDay(current);
    });
  };

  handleDeletePerId = () => {
    const { selected } = this.state;
    selected.map(workingDayId => {
      this.props.actions.deleteWorkingDayRequest(workingDayId);
    });
    this.setState({ selected: [] });
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  handleClose = () => {
    this.props.actions.resetWorkingDaySuccess();
  };

  render() {
    const { classes, workingDayList, requestSuccess, requestError } = this.props;
    if (!workingDayList) {
      return null;
    }
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, workingDayList.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} handleDelete={this.handleDeletePerId}/>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={workingDayList.length}
            />
            <TableBody>
              {stableSort(workingDayList, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.store}
                      </TableCell>
                      <TableCell>{n.employee}</TableCell>
                      <TableCell>{n.workingDay}</TableCell>
                      <TableCell numeric>
                        <Tooltip title="Edit">
                          <NavLink to={`/working-day/${n.id}`}>
                            <EditIcon />
                          </NavLink>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={workingDayList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
        <AlertDialogSlide message={requestError} open={requestError} handleClose={this.handleClose} />
        <AlertDialogSlide message='Successfully Update Database' open={requestSuccess} handleClose={this.handleClose}/>

      </Paper>
    );
  }
}

WorkingDayList.propTypes = {
  classes: PropTypes.object.isRequired,
  actions: PropTypes.object,
  workingDayList: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  workingDayList: makeSelectWorkingDayList(),
  currentWorkingDay: makeSelectCurrentWorkingDay(),
  requestSuccess: makeSelectRequestSuccess(),
  requestError: makeSelectRequestError(),
});


const mapDispatchToProps = (dispatch) => ({actions:
    bindActionCreators({
      loadWorkingDayListRequest,
      deleteWorkingDayRequest,
      setCurrentWorkingDay,
      resetWorkingDaySuccess,
      },
      dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  withStyles(styles),
)(WorkingDayList);
// export default withStyles(styles)(WorkingDayList);
