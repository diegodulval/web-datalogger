import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8091"
});
const apis = {

  updateOutput: (deviceId, out) => api.put("device/" + deviceId + "/output", out),

  loadEquipamentos: () => api.get("device"),
  readEquipamento: id => api.get("feed/test?device=" + id),
};

export default apis;
