import React, { Component } from "react";

class Saida extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validationOutput: ""
    };
    this.handleUpdateOutput = this.handleUpdateOutput.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleUpdateOutput(saida) {
    const status = Math.floor(parseInt(this.refs["out-" + saida.id].value, 10));
    if (this.state.validationOutput === "") {
      this.props.updateOutput({
        id: saida.id,
        status: status > 100 ? 99 : status < 0 ? 0 : status
      });
    }
  }

  onChange(e) {
    const re = /^\+?(0|[1-9]\d*)$/;
    if (
      re.test(e.target.value) &&
      e.target.value >= 0 &&
      e.target.value <= 99
    ) {
      this.setState({ validationOutput: "" });
    } else {
      this.setState({
        validationOutput:
          "Por favor, insira somente números inteiros de 0 a 99."
      });
    }
  }

  render() {
    const { saida } = this.props;
    return (
      <div className="col col-xs-6 col-sm-5 col-md-4 col-lg-3 col-xl-3">
        <div className="card" style={{ marginTop: "10px" }}>
          <div className="card-body">
            <h5 className="card-title">{saida.nome}</h5>
            {this.props.editingOutput === saida.nome && (
              <div>
                <div className="input-group mb-3">
                  <input
                    type="number"
                    step="1"
                    min="0"
                    max="99"
                    ref={"out-" + saida.id}
                    defaultvalor={saida.valor}
                    className="form-control"
                    aria-label="Campo para inserir novo valor da saída"
                    onChange={e => this.onChange(e)}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-danger"
                      type="button"
                      onClick={this.props.cancelEditing}
                    >
                      <span className="fa fa-remove"> </span>
                    </button>
                  </div>
                </div>

                {this.state.validationOutput !== "" && (
                  <div className="alert alert-danger" role="alert">
                    {this.state.validationOutput}
                  </div>
                )}

                <button
                  style={{ width: "100%" }}
                  className="btn btn-fluid btn-outline-success"
                  type="button"
                  onClick={() => this.handleUpdateOutput(saida)}
                >
                  Salvar
                </button>
              </div>
            )}
            {this.props.editingOutput !== saida.nome && (
              <div className="input-group-append">
                <h4 className="card-text">{saida.valor}</h4>
                <button
                  className="btn btn-sm btn-outline-primary"
                  type="button"
                  onClick={() => this.props.editOutput(saida)}
                >
                  <span className="fa fa-edit"> </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Saida;
