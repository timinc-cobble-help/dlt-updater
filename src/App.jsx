import { useState } from "react";
import JSZip from "jszip";
import Page from "./components/structure/Page";
import "./style.scss";
import downloadFile from "downloadfile-js";

const dropperDictionary = {
  capture: ["captured"],
  ko: ["defeated", "killed"],
};

function App() {
  const [processing, setProcessing] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setProcessing(true);
    const zip = new JSZip();
    const contents = await zip.loadAsync(file);

    const filesToAdd = [];

    contents.forEach((relativePath) => {
      if (
        relativePath.startsWith("data/droploottables/loot_table/") &&
        relativePath.endsWith(".json")
      ) {
        const [oldDropper, species, form] = relativePath
          .slice("data/droploottables/loot_table/".length, -".json".length)
          .split("/");
        const newDroppers = dropperDictionary[oldDropper];

        if (!newDroppers) return;

        newDroppers.forEach((newDropper) => {
          const dropperPath = `data/droploottables/drop/dropper/${newDropper}/${species}${form ? `_${form}` : ""}.json`;
          const dropperContents = `
{
  "trigger": "droploottables:${newDropper}",
  "conditions": [
    {
      "condition": "droploottables:pokemon_matcher",
      "matcher": [
        "${species}${form ? ` form=${form}` : ""}"
      ]
    }
  ],
  "tables": [
    "droploottables:${oldDropper}/${species}${form ? `/${form}` : ""}"
  ]
}
`.trim();
          filesToAdd.push({ path: dropperPath, contents: dropperContents });
        });
      }
    });

    filesToAdd.forEach(({ path, contents }) => {
      zip.file(path, contents);
    });

    setProcessing(false);
    downloadFile(
      await zip.generateAsync({ type: "blob" }),
      file.name.replace(".zip", "_updated.zip"),
    );
  };

  return (
    <Page name="DLT Updater">
      <h2>My apologies...</h2>
      <p>
        ...but it had to be done. The old version of Drop Loot Tables had some
        odd holes in it due to the way form names work. I spent a lot of time
        trynna figure out how to make them pretty, but eventually I just had to
        add this in-between layer of droppers. The benefit is that those holes
        no longer exist, and you can target events and conditions much easier
        and in whichever way&apos;s more comfortable to you.
      </p>
      <h2>Anyway</h2>
      <p>Pop your zipped up old pack here, and I&apos;ll update it for you.</p>
      <input
        type="file"
        accept=".zip"
        onChange={handleFileChange}
        disabled={processing}
      />
    </Page>
  );
}

export default App;
