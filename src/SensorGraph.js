import React, { Component } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

class SensorGraph extends Component {

  render() {
    const { sensor } = this.props;
    return (
      <div className="col col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
        <div className="card" style={{ marginTop: "10px" }}>
          <div className="card-body">
          <h5 className="card-title">{sensor.nome}</h5>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={sensor.registros}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <XAxis dataKey="x" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="y"
                  name="Registro"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default SensorGraph;
