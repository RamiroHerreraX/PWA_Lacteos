import axios from "axios";

const API_URL = "http://localhost:3000/api/usuarios";

export const getUsuarios = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const crearUsuario = async (usuario) => {
  const res = await axios.post(`${API_URL}/nuevo`, usuario);
  return res.data;
};
