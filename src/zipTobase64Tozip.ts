import fs from "fs";

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
