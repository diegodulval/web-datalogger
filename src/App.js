import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./Home";
import Sobre from "./Sobre";
import Dashboard from "./Dashboard";
import Header from "./Header";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      equipamentos: [],
      equipamento: { sensores: [{ registros: [{ x: "", y: 0 }] }], saidas: [] }
    };

    this.loadFeeds = this.loadFeeds.bind(this);
    this.loadEquipamentos = this.loadEquipamentos.bind(this);
    this.readEquipamento = this.readEquipamento.bind(this);
    this.updateOutput = this.updateOutput.bind(this);
    this.editSensor = this.editSensor.bind(this);
    this.editDevice = this.editDevice.bind(this);
  }

  updateOutput(deviceId, out) {
    return this.props.api.updateOutput(deviceId, out);
  }

  editSensor(sensor, deviceId) {
    return this.props.api.editSensor(sensor, deviceId);
  }

  editDevice(device, deviceId) {
    return this.props.api.editDevice(device, deviceId);
  }

  loadEquipamentos() {
    this.props.api.loadEquipamentos().then(res => {
      this.setState({
        equipamentos: res.data.content
      });
    });
  }

  loadFeeds(catId) {
    this.props.api.loadEquipamentos(catId).then(res =>
      this.setState({
        equipamento: res.data
      })
    );
  }

  readEquipamento(catId) {
    return this.props.api.readEquipamento(catId);
  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route
            exact
            path="/"
            render={props => {
              return <Home {...props} />;
            }}
          />
          <Route
            path="/dashboard"
            render={props => {
              return (
                <Dashboard
                  {...props}
                  loadEquipamentos={this.loadEquipamentos}
                  equipamentos={this.state.equipamentos}
                  equipamento={this.state.equipamento}
                  readEquipamento={this.readEquipamento}
                  updateOutput={this.updateOutput}
                  editSensor={this.editSensor}
                  editDevice={this.editDevice}
                />
              );
            }}
          />
          <Route exact path="/sobre" component={Sobre} />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
          />
        </div>
      </Router>
    );
  }
}

export default App;
