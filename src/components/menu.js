import React, { Component } from 'react';
import { connect } from 'react-redux';
import Collapse, { Panel } from 'rc-collapse';

import { fetchMenu, onFilterChange } from '../actions/index';
import MenuDishes from './menuDishes';

class Menu extends Component {
  constructor(props) {
    super(props);

    this.handleOnFilterChange = this.handleOnFilterChange.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = { filter: '', accordion: false, activeKey: [] };
  }

  componentWillMount() {
    this.props.fetchMenu();
  }

  handleOnFilterChange(event) {
    const filter = event.target.value;
    this.setState({ filter });
    this.props.onFilterChange(filter);
  }

  getItems() {
    const items = this.props.menu.map(menuCls => {
      return (
        <Panel header={`${menuCls.Name}`} key={menuCls.id}>
          <MenuDishes items={menuCls.Classes[0].Items} />
        </Panel>
      );
    });

    return items;
  }

  onChange(activeKey) {
    this.setState({
      activeKey
    });
  }

  render() {
    const accordion = this.state.accordion;
    const activeKey = this.state.activeKey;
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
        {
          (
            <Collapse accordion={accordion} onChange={this.onChange} activeKey={activeKey}>
              {this.getItems()}
            </Collapse>
          )
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { all, filter } = state.menu;
  const filtered = all.filter(item => {
    return item.Classes[0].Items.find(fItem => {
      return fItem.Name.indexOf(filter) !== -1;
    });
  });
  return { menu: filtered };
}

export default connect(mapStateToProps, { fetchMenu, onFilterChange })(Menu);
