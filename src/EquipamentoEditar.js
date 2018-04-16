import React, { Component } from "react";
import { toast } from "react-toastify";

class EquipamentoEditar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sensorSelect: 0
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleEditSensor = this.handleEditSensor.bind(this);
    this.handleEditDevice = this.handleEditDevice.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    this.props.readEquipamento(this.props.match.params.catId).then(res => {
      this.setState({ equipamento: res.data });
      this.refs.eqName.value = res.data.nome;
      this.refs.eqDescription.value = res.data.descricao;
    });
    this.props.loadEquipamentos();
  }

  handleEditSensor(x) {
    const id = x.id;
    const name = this.refs[`sensor-${x.id}-name`].value;
    const description = this.refs[`sensor-${x.id}-description`].value;
    const sensor = {
      id,
      name,
      description
    };

    this.props.editSensor(sensor, this.props.match.params.catId).then(res => {
      this.openToast("😃 Sensor atualizado com sucesso");
      this.setState({
        sensorSelect: 0
      });
      this.refs[`select-sensor`].value = this.state.sensorSelect;
      this.loadData();
    });
  }

  handleSelectChange() {
    this.setState({
      sensorSelect: this.refs[`select-sensor`].value
    });
  }

  handleEditDevice() {
    const device = {
      name: this.refs.eqName.value,
      description: this.refs.eqDescription.value
    };
    this.props.editDevice(device, this.props.match.params.catId).then(res => {
      this.openToast("😃 Equipamento atualizado com sucesso!");
      this.loadData();
    });
  }

  openToast(message) {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  }

  render() {
    const { equipamento } = this.state;
    return (
      <div>
        {equipamento && (
          <div>
            <h3>Editar Equipamento {equipamento.id}</h3>
            <form>
              <div className="form-group">
                <label htmlFor="eqName">Nome</label>
                <input
                  ref="eqName"
                  type="text"
                  className="form-control"
                  id="eqName"
                  aria-describedby="eqName"
                />
              </div>
              <div className="form-group">
                <label htmlFor="eqDescription">Descrição</label>
                <textarea
                  ref="eqDescription"
                  type="text"
                  className="form-control"
                  id="eqDescription"
                  aria-describedby="eqDescription"
                />
                <small id="emailHelp" className="form-text text-muted">
                  Informe uma breve descrição do equipamento.
                </small>
              </div>
              <button
                type="button"
                onClick={this.handleEditDevice}
                className="btn btn-success pull-right"
              >
                Salvar
              </button>
            </form>

            <h5 className="display-5 mt-5">Sensores</h5>

            <div className="form-group">
              <label htmlFor="select-sensor">
                Selecione o sensor para edição
              </label>
              <select
                className="form-control"
                id="select-sensor"
                ref="select-sensor"
                onChange={this.handleSelectChange}
                defaultValue={0}
              >
                <option disabled value={0} key={0}>
                  Selecione um sensor
                </option>
                {equipamento.sensores.map(x => (
                  <option value={x.id} key={x.id}>
                    {x.nome}
                  </option>
                ))}
              </select>
            </div>

            <hr className="my-3" />
            <div className="row">
              {this.state.sensorSelect !== 0 &&
                equipamento.sensores.map(x => {
                  if (x.id === parseInt(this.state.sensorSelect, 10)) {
                    return (
                      <div className="col col-md-12" key={x.id}>
                        <div className="alert alert-light" role="alert">
                          <h4 className="alert-heading">Sensor #{x.id}</h4>
                          <div className="form-group">
                            <label htmlFor={`sensor-${x.id}-name`}>Nome</label>
                            <input
                              ref={`sensor-${x.id}-name`}
                              type="text"
                              className="form-control"
                              id={`sensor-${x.id}-name`}
                              defaultValue={x.nome}
                              aria-describedby={`sensor-${x.id}-name`}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor={`sensor-${x.id}-description`}>
                              Descrição
                            </label>
                            <textarea
                              ref={`sensor-${x.id}-description`}
                              type="text"
                              className="form-control"
                              id={`sensor-${x.id}-description`}
                              aria-describedby={`sensor-${x.id}-description`}
                              defaultValue={x.descricao}
                            />
                          </div>
                          <hr />
                          <button
                            type="submit"
                            className="btn btn-success pull-right"
                            onClick={() => this.handleEditSensor(x)}
                          >
                            Salvar
                          </button>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default EquipamentoEditar;
