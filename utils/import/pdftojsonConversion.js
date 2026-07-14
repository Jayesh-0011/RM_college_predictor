import * as pdfParse from "pdf-parse";
import { readFile, writeFile } from "node:fs/promises";

async function pdfToJson() {
  try {
    const data = await readFile("./sample.pdf");
    const parse = (pdfParse).default ?? pdfParse;
    const result = await parse(data);

    // Extract text
    const text = await result.getText();

    const json = {
      pages: result.numPages,
      text,
    };

    await writeFile("output.json", JSON.stringify(json, null, 2));

    console.log("PDF converted successfully!");
  } catch (error) {
    console.error(error);
  }
}

pdfToJson();