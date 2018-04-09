import React, { Component } from "react";

class Saida extends Component {
  constructor(props) {
    super(props);

    this.handleUpdateOutput = this.handleUpdateOutput.bind(this);
  }

  handleUpdateOutput(saida) {
    const status = parseInt(this.refs["out-" + saida.id].value, 10);
    this.props.updateOutput({
      id: saida.id,
      status: status > 100 ? 99 : status < 0 ? 0 : status
    });
  }

  render() {
    const { saida } = this.props;
    return (
      <div className="col col-xs-6 col-sm-5 col-md-4 col-lg-3 col-xl-2">
        <div className="card" style={{ marginTop: "10px" }}>
          <div className="card-body">
            <h5 className="card-title">{saida.name}</h5>
            {this.props.editingOutput === saida.name && (
              <div>
                <div className="input-group mb-3">
                  <input
                    type="number"
                    min="0"
                    max="99"
                    ref={"out-" + saida.id}
                    defaultValue={saida.status}
                    className="form-control"
                    aria-label="Text input with dropdown button"
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
            {this.props.editingOutput !== saida.name && (
              <div className="input-group-append">
                <h4 className="card-text">{saida.status}</h4>
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
