import React from "react";

const PartNumbers = ({ thickness }) => {
  // Mapping of part numbers based on thickness
  const partNumberMapping = {
    '1.75"': {
      auxScrews: '#10-24 x 2.125"',
      etScrews: '01-4451 \n(#1/4-20 x 2.375")',
      spindle: "Cross = 97-0541\nSquare = 97-0549",
      tailpiece: "Standard = 13-0085",
    },
    '1.875"': {
      auxScrews: '#10-24 x 2.250"',
      etScrews: '01-4372 \n(#1/4-20 x 2.625")',
      spindle: "Cross = 97-0541\nSquare = 97-0550",
      tailpiece: "Standard = 13-0085",
    },
    '2.0"': {
      auxScrews: '#10-24 x 2.375"',
      etScrews: '01-4372 \n(#1/4-20 x 2.625")',
      spindle: "Cross: 97-0541\nSquare = 97-0550",
      tailpiece: "Standard = 13-0085",
    },
    '2.125"': {
      auxScrews: '#10-24 x 2.500"',
      etScrews: '01-4373 \n(#1/4-20 x 2.875")',
      spindle: "Cross: 97-0541\nSquare = 97-0551",
      tailpiece: "Standard = 13-0085",
    },
    '2.25"': {
      auxScrews: '#10-24 x 2.675"',
      etScrews: '01-1549 \n(#1/4-20 x 3.000")',
      spindle: "Cross: 97-0541\nSquare = 97-0551",
      tailpiece: "Standard = 13-0085",
    },
    '2.375"': {
      auxScrews: '#10-24 x 2.750"',
      etScrews: '01-1549 \n(#1/4-20 x 3.000")',
      spindle: "Cross: 97-0541\nSquare = 97-0916",
      tailpiece: "Standard = 13-0085",
    },
    '2.5"': {
      auxScrews: '#10-24 x 3.000"',
      etScrews: '01-1550 \n(#1/4-20 x 3.250")',
      spindle: "Cross: 97-0918\nSquare = 97-0920",
      tailpiece: 'Special = 3-13/16"',
    },
    '2.5625"': {
      auxScrews: '#10-24 x 3.250"',
      etScrews: '01-1550 \n(#1/4-20 x 3.250")',
      spindle: "Cross: 97-0918\nSquare = 97-0921",
      tailpiece: 'Special = 3-13/16"',
    },
    '2.75"': {
      auxScrews: '#10-24 x 3.375"',
      etScrews: '01-1551 \n(#1/4-20 x 3.500")',
      spindle: "Cross: 97-0918\nSquare = 97-0921",
      tailpiece: 'Special = 3-13/16"',
    },
    '3.0"': {
      auxScrews: '#10-24 x 3.575"',
      etScrews: '01-1552 \n(#1/4-20 x 3.750")',
      spindle: "Cross: 97-0918\nSquare = 97-0922",
      tailpiece: 'Special = 3-13/16"',
    },
    '3.25"': {
      auxScrews: '#10-24 x 3.775"',
      etScrews: '01-1553 \n(#1/4-20 x 4.000")',
      spindle: "Cross: 97-0918\nSquare = 97-0923",
      tailpiece: 'Special = 3-13/16"',
    },
    '3.375"': {
      auxScrews: '#10-24 x 3.900"',
      etScrews: '01-1553 \n(#1/4-20 x 4.000")',
      spindle: "Cross: 97-0584\nSquare = 97-0924",
      tailpiece: 'Special = 3-13/16"',
    },
    '3.5"': {
      auxScrews: '#10-24 x 3.4.125"',
      etScrews: '01-1554 \n(#1/4-20 x 4.250")',
      spindle: "Cross: 97-0584\nSquare = 97-0924",
      tailpiece: 'Special = 3-13/16"',
    },
    '3.625"': {
      auxScrews: '#10-24 x 4.250"',
      etScrews: '01-1554 \n(#1/4-20 x 4.250")',
      spindle: "Cross: 97-0584\nSquare = 97-0925",
      tailpiece: 'Special = 3-13/16"',
    },
    '3.75"': {
      auxScrews: '#10-24 x 4.375"',
      etScrews: '01-1555 \n(#1/4-20 x 4.500")',
      spindle: "Cross: 97-0584\nSquare = 97-0925",
      tailpiece: 'Special = 3-13/16"',
    },
    '3.875"': {
      auxScrews: '#10-24 x 4.575"',
      etScrews: '01-1555 \n(#1/4-20 x 4.500")',
      spindle: "Cross: 97-0584\nSquare = 97-0925",
      tailpiece: 'Special = 3-13/16"',
    },
    '4.0"': {
      auxScrews: '#10-24 x 4.775"',
      etScrews: '01-1556 \n(#1/4-20 x 4.500")',
      spindle: "Cross: 97-0584\nSquare = 97-0583",
      tailpiece: 'Special = 3-13/16"',
    },
    '4.125"': {
      auxScrews: '#10-24 x 5.00"',
      etScrews: '01-1556 \n(#1/4-20 x 4.500")',
      spindle: "Cross: 97-0584\nSquare = 97-0926",
      tailpiece: 'Rim Cyl + Tailpiece not available past 4"',
    },
    '4.25"': {
      auxScrews: '#10-24 x 5.000"',
      etScrews: '01-1557 \n(#1/4-20 x 5.000")',
      spindle: "Cross: 97-0919\nSquare = 97-0926",
      tailpiece: 'Rim Cyl + Tailpiece not available past 4"',
    },
    '4.375"': {
      auxScrews: '#10-24 x 4.675"',
      etScrews: '01-1557 \n(#1/4-20 x 5.000")',
      spindle: "Cross: 97-0919\nSquare = 97-0927",
      tailpiece: 'Rim Cyl + Tailpiece not available past 4"',
    },
    '4.5"': {
      auxScrews: '#10-24 x 4.750"',
      etScrews: '01-1558 \n(#1/4-20 x 5.250")',
      spindle: "Cross: 97-0919\nSquare = 97-0927",
      tailpiece: 'Rim Cyl + Tailpiece not available past 4"',
    },
    '4.75"': {
      auxScrews: '#10-24 x 5.000"',
      etScrews: '01-1559 \n(#1/4-20 x 5.500")',
      spindle: "Cross: 97-0919\nSquare = 97-0928",
      tailpiece: 'Rim Cyl + Tailpiece not available past 4"',
    },
    '4.875"': {
      auxScrews: '#10-24 x 5.125"',
      etScrews: '01-1559 \n(#1/4-20 x 5.500")',
      spindle: "Cross: 97-0919\nSquare = 97-0928",
      tailpiece: 'Rim Cyl + Tailpiece not available past 4"',
    },
    '5.0"': {
      auxScrews: '#10-24 x 5.250"',
      etScrews: '01-1580 \n(#1/4-20 x 5.750")',
      spindle: "Cross: 97-0919\nSquare = 97-0929",
      tailpiece: 'Rim Cyl + Tailpiece not available past 4"',
    },
  };
  

  // Get part numbers for the current thickness
  const parts = partNumberMapping[thickness] || {};

  return (
    <div
      style={{
        marginTop: "20px",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        fontSize: "1em",
      }}
    >
      <h3>Part Numbers</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "5px solid #ddd", padding: "8px" }}>Part</th>
            <th style={{ border: "5px solid #ddd", padding: "8px" }}>
              Part Number
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: "3px solid #ddd", padding: "8px" }}>
              Aux Screws
            </td>
            <td
              style={{ border: "1px solid #ddd", padding: "8px", whiteSpace: "pre-wrap" }}
            >
              {parts.auxScrews || "N/A"}
            </td>
          </tr>
          <tr>
            <td style={{ border: "3px solid #ddd", padding: "8px" }}>
              Trim Screws
            </td>
            <td
              style={{ border: "1px solid #ddd", padding: "8px", whiteSpace: "pre-wrap" }}
            >
              {parts.etScrews || "N/A"}
            </td>
          </tr>
          <tr>
            <td style={{ border: "3px solid #ddd", padding: "8px" }}>Spindle</td>
            <td
              style={{ border: "1px solid #ddd", padding: "8px", whiteSpace: "pre-wrap" }}
            >
              {parts.spindle || "N/A"}
            </td>
          </tr>
          <tr>
            <td style={{ border: "3px solid #ddd", padding: "4px" }}>
              Tailpiece
            </td>
            <td
              style={{ border: "1px solid #ddd", padding: "8px", whiteSpace: "pre-wrap" }}
            >
              {parts.tailpiece || "N/A"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PartNumbers;
