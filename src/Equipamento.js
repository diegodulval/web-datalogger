import React, { Component } from "react";
import { Link } from "react-router-dom";

import Saida from "./Saida";
import SensorResumo from "./SensorResumo";
import SensorGraph from "./SensorGraph";

class Equipamento extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      editingOutput: "",
      equipamento: { sensores: [{ registros: [{ x: "", y: 0 }] }], saidas: [] }
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
    this.props.readEquipamento(id).then(res => {
      this.setState({
        equipamento: res.data
      });
    });
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
    const { match } = this.props;
    const { equipamento } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col col-xs-8 col-sm-9 col-md-9 col-lg-10 col-xl-10">
            <h3>{equipamento.nome}</h3>
            <span className="border-left">{equipamento.descricao}</span>
          </div>
          <div className="col col-xs-4 col-sm-3 col-md-3 col-lg-2 col-xl-2">
            <Link
              className="btn btn-primary pull-right"
              to={`${match.params.catId}/editar`}
            >
              Editar
            </Link>
          </div>
        </div>
        <hr />
        <div className="row">
          {equipamento.saidas.sort((a, b) => a.id - b.id).map((key, i) => {
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
          {equipamento.sensores.map((x, i) => {
            return <SensorResumo key={i} sensor={x} />;
          })}
        </div>

        <div style={{ marginTop: "30px" }}>
          <h4>Graficos</h4>
          <hr />
        </div>
        <div className="row">
          {equipamento.sensores.map((x, i) => {
            return <SensorGraph sensor={x} key={i} />;
          })}
        </div>
      </div>
    );
  }
}

export default Equipamento;
