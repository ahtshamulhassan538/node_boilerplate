const fs = require("fs");
const csvParser = require("csv-parser");

/**
 * Parses a CSV file and transforms its keys for consistency.
 *
 * @param {string} filePath - The path to the CSV file to be parsed.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of parsed records.
 */
const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const records = []; // Array to store parsed records

    // Create a readable stream and pipe it to the CSV parser
    fs.createReadStream(filePath)
      .pipe(csvParser())

      // Event listener: Process each row of the CSV
      .on("data", (row) => {
        const transformedRow = {};

        // Normalize column names (convert to lowercase, replace spaces & slashes with underscores)
        Object.keys(row).forEach((key) => {
          const transformedKey = key
            .replace(/ /g, "_") // Replace spaces with underscores
            .replace(/\//g, "_") // Replace slashes with underscores
            .toLowerCase(); // Convert to lowercase for consistency

          transformedRow[transformedKey] = row[key]; // Assign transformed key to the new object
        });

        records.push(transformedRow); // Add transformed row to records array
      })

      // Event listener: When CSV parsing is complete
      .on("end", () => {
        fs.unlinkSync(filePath); // Delete the file after processing to free up space
        resolve(records); // Resolve the promise with the parsed records
      })

      // Event listener: Handle errors during file processing
      .on("error", (error) => {
        console.error("CSV Parsing Error:", error);
        reject(error); // Reject the promise in case of an error
      });
  });
};

module.exports = parseCSV;
