import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class EquipamentoEditar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
    this.handleEditEquipamento = this.handleEditEquipamento.bind(this);
  }

  componentDidMount() {
    this.props.readEquipamento(this.props.match.params.catId).then(res => {
      this.setState({ equipamento: res.data });
      this.refs.eqName.value = res.data.nome;
      this.refs.eqDescription.value = res.data.descricao;
    });
  }

  handleEditEquipamento(x) {
    console.log(x);
    console.log(this.refs[`sensor-${x.id}-name`].value);

    const id = x.id;
    const name = this.refs[`sensor-${x.id}-name`].value;
    const description = this.refs[`sensor-${x.id}-description`].value;
    const sensor = {
      id,
      name,
      description
    };

    this.props.editSensor(sensor, this.props.match.params.catId).then(res =>
      this.setState({
        redirect: "/dashboard/equipamento/" + this.props.match.params.catId
      })
    );
  }

  render() {
    const { equipamento } = this.state;
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
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
              <button type="submit" className="btn btn-success pull-right">
                Salvar
              </button>
            </form>

            <h5 className="display-5 mt-5">Sensores</h5>
            <hr className="my-3" />
            <div className="row">
              {equipamento.sensores.map((x, index) => {
                return (
                  <div className="col col-md-6" key={index}>
                    <div className="jumbotron">
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
                      <button
                        type="submit"
                        className="btn btn-success"
                        onClick={() => this.handleEditEquipamento(x)}
                      >
                        Salvar
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default EquipamentoEditar;
