import React, { Component } from "react";
import Saida from "./Saida";
import SensorResumo from "./SensorResumo";
import SensorGraph from "./SensorGraph";

class Equipamento extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      editingOutput: ""
    };

    this.loadData = this.loadData.bind(this);
    this.editOutput = this.editOutput.bind(this);
    this.cancelEditing = this.cancelEditing.bind(this);
    this.updateOutput = this.updateOutput.bind(this);
  }

  editOutput(out) {
    this.setState({
      editingOutput: out.nome
    });
  }
  cancelEditing() {
    this.setState({
      editingOutput: ""
    });
  }

  loadData(id) {
    this.setState({ id });
    this.props.readEquipamento(id);
  }

  componentDidMount() {
    const id = this.props.match.params.catId;
    this.loadData(id);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.match.params.catId !== this.state.id) {
      this.loadData(newProps.match.params.catId);
    }
  }

  updateOutput(saida) {
    this.props.updateOutput(this.props.match.params.catId, saida).then(res => {
      this.cancelEditing();
      this.loadData(this.props.match.params.catId);
    });
  }

  render() {
    return (
      <div>
        <h3>{this.props.equipamento.descricao}</h3>
        <hr />
        <div className="row">
          {this.props.equipamento.saidas
            .sort((a, b) => a.id - b.id)
            .map((key, i) => {
              return [
                <Saida
                  cancelEditing={this.cancelEditing}
                  editingOutput={this.state.editingOutput}
                  editOutput={this.editOutput}
                  updateOutput={this.updateOutput}
                  key={i}
                  saida={key}
                />
              ];
            })}
        </div>
        <div style={{ marginTop: "30px" }}>
          <h3>Sensores</h3>
          <hr />
        </div>
        <div className="row">
          {this.props.equipamento.sensores.map((x, i) => {
            return <SensorResumo key={i} sensor={x} />;
          })}
        </div>

        <div style={{ marginTop: "30px" }}>
          <h4>Graficos</h4>
          <hr />
        </div>
        <div className="row">
          {this.props.equipamento.sensores.map((x, i) => {
            return <SensorGraph sensor={x} key={i} />;
          })}
        </div>
      </div>
    );
  }
}

export default Equipamento;
