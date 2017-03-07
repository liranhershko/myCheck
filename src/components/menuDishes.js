import React, { Component } from 'react';
import { Accordion, Panel } from 'react-bootstrap';

class MenuDishes extends Component {
  renderModifiers(modifiers) {
    return modifiers.map(item => {
      return <div key={item.id}>{item.Name}</div>;
    });
  }

  renderModifierGroups(modifierGroups) {
    return (
      <Accordion>
        {modifierGroups.map(item => {
          return (
            <Panel header={item.Name} eventKey={item.id} key={item.id}>
              {this.renderModifiers(item.Modifiers)}
            </Panel>
          );
        })}
      </Accordion>
    );
  }

  render() {
    return (
      <div>
        {this.props.items.map(item => {
          return (
            <div className="dish" key={item.id}>
              {`${item.Name}: ${item.Price}$`}
              <div className="description">{item.Description}</div>
              {item.ModifierGroups ? this.renderModifierGroups(item.ModifierGroups) : null}
            </div>
          );
        })}
      </div>
    );
  }
}

export default MenuDishes;
