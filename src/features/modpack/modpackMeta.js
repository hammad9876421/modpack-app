export function getModpackMeta() {
  return {
    name: localStorage.getItem("mp_name") || "My Modpack",
    author: localStorage.getItem("mp_author") || "Unknown",
    description: localStorage.getItem("mp_desc") || "",
    icon: localStorage.getItem("mp_icon") || "",
  };
}

export function setModpackMeta(meta) {
  localStorage.setItem("mp_name", meta.name || "");
  localStorage.setItem("mp_author", meta.author || "");
  localStorage.setItem("mp_desc", meta.description || "");
  localStorage.setItem("mp_icon", meta.icon || "");
}
