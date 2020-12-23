const { jsPDF } = require("jspdf"); // will automatically load the node version

// Landscape export, 2×4 inches
const doc = new jsPDF({
    orientation: "landscape",
    unit: "in",
    format: [4, 2]
  });
  
  doc.text("Hello world!", 1, 1);
  doc.save("two-by-four.pdf");
