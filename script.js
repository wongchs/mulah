async function fetchAndParseCSV() {
    try {
      const response = await fetch("Table_Input.csv");
      const csvText = await response.text();
      const rows = csvText.trim().split("\n");

      const data = rows.slice(1).map((row) => {
        const values = row.split(",");
        return {
          "Index #": values[0].trim(),
          Value: parseInt(values[1]),
        };
      });

      const table1Body = document.getElementById("table1-body");
      data.forEach((row) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
                    <td>${row["Index #"]}</td>
                    <td>${row["Value"]}</td>
                `;
        table1Body.appendChild(tr);
      });

      const dataMap = data.reduce((acc, row) => {
        acc[row["Index #"]] = row["Value"];
        return acc;
      }, {});

      const table2Body = document.getElementById("table2-body");
      const calculatedValues = [
        {
          Category: "Alpha",
          Value: dataMap["A5"] + dataMap["A20"],
        },
        {
          Category: "Beta",
          Value: Math.floor(dataMap["A15"] / dataMap["A7"]),
        },
        {
          Category: "Charlie",
          Value: dataMap["A13"] * dataMap["A12"],
        },
      ];

      calculatedValues.forEach((row) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
                    <td>${row.Category}</td>
                    <td>${row.Value}</td>
                `;
        table2Body.appendChild(tr);
      });
    } catch (error) {
      console.error("Error reading CSV:", error);
      alert("Failed to load data: " + error.message);
    }
  }

  fetchAndParseCSV();