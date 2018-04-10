import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8090"
});
const apis = {

  updateOutput: (deviceId, out) => api.put("device/" + deviceId + "/output", out),

  loadEquipamentos: () => api.get("device"),
  readEquipamento: id => api.get("device/" + id + "/feeds"),
};

export default apis;
