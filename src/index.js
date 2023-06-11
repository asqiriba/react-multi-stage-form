import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";

async function modifyPdf() {
  const url = "https://www.cdtfa.ca.gov/formspubs/cdtfa810ftg.pdf";
  const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pages = pdfDoc.getPages();
  console.log(`Number of pages: ${pages.length}`);

  const firstPage = pages[0];
  const { width, height } = firstPage.getSize();
  console.log(`Width: ${width} Height: ${height}`);

  firstPage.drawText("Changweining was here", {
    x: 5,
    y: height / 2 + 300,
    size: 50,
    font: helveticaFont,
    color: rgb(0.95, 0.1, 0.1),
    rotate: degrees(-45),
  });

  const pdfBytes = await pdfDoc.save();
  console.log(`PDF file size: ${pdfBytes.length} bytes`);

  const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
  const pdfUrl = URL.createObjectURL(pdfBlob);

  const downloadLink = document.createElement("a");
  downloadLink.href = pdfUrl;
  downloadLink.download = "file.pdf";
  downloadLink.click();

  URL.revokeObjectURL(pdfUrl);
}

modifyPdf();
