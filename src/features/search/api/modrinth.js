import axios from "axios";

const BASE = "https://api.modrinth.com/v2";

export async function searchModrinth(query, page = 1) {
  const res = await axios.get(`${BASE}/search`, {
    params: {
      query,
      limit: 20,
      offset: (page - 1) * 20,
    },
  });

  return res.data;
}

export async function getModrinthProject(id) {
  const res = await axios.get(`${BASE}/project/${id}`);
  return res.data;
}
