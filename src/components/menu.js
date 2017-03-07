import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Accordion, Panel } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

import { fetchMenu, onFilterChange } from '../actions/index';
import MenuDishes from './menuDishes';

class Menu extends Component {
  constructor(props) {
    super(props);

    this.handleOnFilterChange = this.handleOnFilterChange.bind(this);
    this.state = { filter: '' };
  }

  componentWillMount() {
    this.props.fetchMenu();
  }

  handleOnFilterChange(event) {
    const filter = event.target.value;
    this.setState({ filter });
    this.props.onFilterChange(filter);
  }

  renderMenuItems() {
    return (
      <Accordion>
        {this.props.menu.map(item => {
          return (
            <Panel header={`${item.Name}`} eventKey={item.id} key={item.id}>
              <MenuDishes items={item.Classes[0].Items} />
            </Panel>
          );
        })}
      </Accordion>
    );
  }

  render() {
    return (
      <div className="menu">
        <div className="form-group has-feedback">
          <input
            value={this.state.filter}
            onChange={this.handleOnFilterChange}
            type="text"
            className="form-control"
            placeholder="Filter"
          />
          <span className="glyphicon glyphicon-search form-control-feedback" />
        </div>
        <br /><br />
        {this.renderMenuItems()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { all, filter } = state.menu;

  const newAll = [];
  all.forEach(item => {
    const innerItems = item.Classes[0].Items;
    const innerFiltered = innerItems.filter(innerItem => {
      return innerItem.Name.toLowerCase().indexOf(filter) !== -1;
    });

    if (innerFiltered && innerFiltered.length) {
      const newItem = cloneDeep(item);
      newItem.Classes[0].Items = innerFiltered;
      newAll.push(newItem);
    }
  });
  return { menu: newAll };
}

export default connect(mapStateToProps, { fetchMenu, onFilterChange })(Menu);
