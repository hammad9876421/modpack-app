export function importModpack(file, setModpack) {
  const reader = new FileReader();

  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);

      if (data && Array.isArray(data.mods)) {
        setModpack(data.mods);
        localStorage.setItem("modpack", JSON.stringify(data.mods));
      } else {
        console.log("Invalid modpack format");
      }
    } catch (err) {
      console.log("Failed to read modpack file");
    }
  };

  reader.readAsText(file);
}
