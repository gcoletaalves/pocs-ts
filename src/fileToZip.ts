import archiver from "archiver";
import fs from "fs";

const filePath = "res/image.jpg";
const zipPath = "res/compressed.zip";

// Comprimir o arquivo em um zip
const output = fs.createWriteStream(zipPath);
const archive = archiver("zip", { zlib: { level: 9 } });

archive.on("error", (err) => {
  throw err;
});

output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');

  const zipPath = "res/compressed.zip";

  // Converter o zip para base64
  const fileData = fs.readFileSync(zipPath);
  const base64Data = fileData.toString("base64");

  console.log("Zip file converted to base 64 ");

  // Gerar um novo zip a partir do base64
  const newZipPath = "res/newCompressed.zip";
  const fileDataNew = Buffer.from(base64Data, "base64");
  fs.writeFileSync(newZipPath, fileDataNew);

  console.log("New zip file created: res/newCompressed.zip");
});

archive.pipe(output);
archive.file(filePath, { name: "image.jpg" });
archive.finalize();

