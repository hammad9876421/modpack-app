import { useState } from "react";
import { getModpackMeta, setModpackMeta } from "../modpackMeta";

export default function ModpackMetaEditor() {
  const meta = getModpackMeta();

  const [name, setName] = useState(meta.name);
  const [author, setAuthor] = useState(meta.author);
  const [desc, setDesc] = useState(meta.description);

  const save = () => {
    setModpackMeta({
      name,
      author,
      description: desc,
    });
  };

  return (
    <div className="card">

      <h3>Modpack Info</h3>

      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" />
      <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" />

      <button onClick={save}>Save</button>

    </div>
  );
}
