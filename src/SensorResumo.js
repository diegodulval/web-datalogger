import React, { Component } from "react";

class SensorResumo extends Component {

  getMaxValue(arr) {
    if (arr.length > 0) {
      return Math.max(...arr.map(o => o.y));
    } else {
      return 0;
    }
  }

  render() {
    const { sensor } = this.props;
    return (
      <div className="col col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
        <div className="card" style={{ marginTop: "10px" }}>
          <div className="card-body">
            <h5 className="card-title">{sensor.nome}</h5>
            <div className="input-group-append">
              <h4 className="card-text">{sensor.registros[0].y}</h4>
            </div>
          </div>
          <div className="card-footer">
            <b>MVR:</b> {this.getMaxValue(sensor.registros)}
          </div>
        </div>
      </div>
    );
  }
}

export default SensorResumo;
