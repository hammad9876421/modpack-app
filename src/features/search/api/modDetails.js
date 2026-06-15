import axios from "axios";

const BASE = "https://api.modrinth.com/v2";

export async function getModDetails(id) {
  const res = await axios.get(`${BASE}/project/${id}`);
  return res.data;
}
