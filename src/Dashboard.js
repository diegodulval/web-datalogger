import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import Equipamento from "./Equipamento";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.renderEquipamentos = this.renderEquipamentos.bind(this);
  }

  componentDidMount() {
    this.props.loadEquipamentos();
  }

  renderEquipamentos(device) {
    return (
      <li key={device.id}>
        <Link to={`/dashboard/equipamento/${device.id}`}> {device.description} </Link>
      </li>
    );
  }

  render() {
    const { match } = this.props;
    const { equipamentos } = this.props;
    return (
      <div>
        <div className="container" style={{ marginTop: "40px" }}>
          <div className="row">
            <div className="col-md-2">
              <h5>Equipamentos</h5>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {this.props.equipamentos.length === 0 && (
                  <p className="alert alert-info">
                    {" "}
                    Nenhum equipamento cadastrada{" "}
                  </p>
                )}
                <ReactCSSTransitionGroup
                  transitionName="fade"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={300}
                >
                  {equipamentos.map(device => this.renderEquipamentos(device))}
                </ReactCSSTransitionGroup>
              </ul>
            </div>
            <div className="col-md-10">
              <Route
                exact
                path={match.url + "/equipamento/:catId"}
                render={props => {
                  return (
                    <Equipamento
                      {...props}
                      loadEquipamentos={this.props.loadEquipamentos}
                      readEquipamento={this.props.readEquipamento}
                      equipamentos={this.props.equipamentos}
                      equipamento={this.props.equipamento}
                      updateOutput={this.props.updateOutput}
                    />
                  );
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
