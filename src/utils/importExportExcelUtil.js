const ExcelJS = require("exceljs");
const fs = require("fs");
const path = require("path");
const moment = require("moment");

/**
 * Exports data to an Excel file.
 * @param {Array} data - Array of objects to be written to Excel.
 * @param {string} filePath - Path to save the Excel file.
 * @returns {Promise<string>} - Returns the file path.
 */
const exportToExcel = async (data, filePath) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    if (data.length > 0) {
      worksheet.columns = Object.keys(data[0]).map((key) => ({
        header: key,
        key: key,
        width: 20,
      }));

      data.forEach((row) => {
        worksheet.addRow(row);
      });
    }

    await workbook.xlsx.writeFile(filePath);
    return filePath;
  } catch (error) {
    throw new Error(`Error exporting Excel: ${error.message}`);
  }
};

/**
 * Exports data to CSV and sends it as a downloadable response.
 * @param {Array} data - The array of objects representing CSV rows.
 * @param {String} fileName - The name of the exported file (without extension).
 * @param {Object} res - Express response object.
 */
const exportToCSV = async (data, fileName, res) => {
  try {
    if (!res || typeof res.setHeader !== "function") {
      throw new Error(
        "Invalid response object. Make sure this function is called inside an Express route."
      );
    }

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ message: "No data available for export" });
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Data");

    // Add headers dynamically based on keys in the first object
    worksheet.columns = Object.keys(data[0]).map((key) => ({
      header: key,
      key: key,
    }));

    // Add rows
    data.forEach((row) => worksheet.addRow(row));

    // Ensure a valid filename
    const safeFileName = fileName ? fileName.replace(/\s+/g, "_") : "export";
    const fullFileName = `${safeFileName}-${moment().format(
      "YYYY-MM-DD_HH-mm-ss"
    )}.csv`;

    // Set response headers for file download
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${fullFileName}`
    );

    // Write CSV data to response stream
    await workbook.csv.write(res);
    res.end();
  } catch (error) {
    console.error("Error exporting CSV:", error);
    if (res && typeof res.status === "function") {
      return res.status(500).json({ message: "Error generating CSV file" });
    } else {
      throw error; // Ensure proper error handling
    }
  }
};

/**
 * Reads data from an Excel file.
 * @param {string} filePath - Path of the Excel file to read.
 * @returns {Promise<Array>} - Returns an array of objects.
 */
const importFromExcel = async (filePath) => {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error("File not found");
    }

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.worksheets[0];

    const headers = worksheet.getRow(1).values.slice(1);
    const data = [];

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // Skip header row
      const rowData = {};
      headers.forEach((header, colIndex) => {
        rowData[header] = row.getCell(colIndex + 1).value;
      });
      data.push(rowData);
    });

    return data;
  } catch (error) {
    throw new Error(`Error importing Excel: ${error.message}`);
  }
};

module.exports = { exportToExcel, importFromExcel, exportToCSV };
