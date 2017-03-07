import React, { Component } from 'react';
import Collapse, { Panel } from 'rc-collapse';

class MenuDishes extends Component {
  renderModifiers(modifiers) {
    return modifiers.map((item) => {
      return (
        <div key={item.id}>{item.Name}</div>
      );
    })
  }

  renderModifierGroups(modifierGroups) {
    if (!modifierGroups){
      return null;
    }

    return modifierGroups.map((gItem) => {
      return (
        <Panel header={`${gItem.Name}`} key={gItem.id}>
          {this.renderModifiers(gItem.Modifiers)}
        </Panel>
      );
    })
  }

  getItems() {
    const items = this.props.items.map(item => {
      return (
        <Panel header={`${item.Name} - ${item.Price}$`} key={item.id}>
          {this.renderModifierGroups(item.ModifierGroups)}
        </Panel>
      );
    });

    return items;
  }

  render() {
    return (
      <Collapse>
        {this.getItems()}
      </Collapse>
    );
  }
}

export default MenuDishes;
