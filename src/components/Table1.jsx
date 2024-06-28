import React from 'react';
import { Table } from '@mantine/core';
import jsonData from '../data/Manufac _ India Agro Dataset.json';
import './styles/table.css'

const processData = (data) => {
  const yearCropData = {};

  data.forEach((entry) => {
    const { Year, 'Crop Name': cropName, 'Crop Production (UOM:t(Tonnes))': production } = entry;
    const productionValue = production ? parseFloat(production) : 0;

    if (!yearCropData[Year]) {
      yearCropData[Year] = { maxCrop: cropName, maxProduction: productionValue, minCrop: cropName, minProduction: productionValue };
    } else {
      if (productionValue > yearCropData[Year].maxProduction) {
        yearCropData[Year].maxCrop = cropName;
        yearCropData[Year].maxProduction = productionValue;
      }

      if (productionValue < yearCropData[Year].minProduction) {
        yearCropData[Year].minCrop = cropName;
        yearCropData[Year].minProduction = productionValue;
      }
    }
  });

  return Object.keys(yearCropData).map((year) => ({
    year,
    maxCrop: yearCropData[year].maxCrop,
    minCrop: yearCropData[year].minCrop,
  }));
};

const Table1 = () => {
  const data = processData(jsonData);

  const rows = data.map((entry) => (
    <Table.Tr key={entry.year}>
      <Table.Td>{entry.year.substring(entry.year.length-4)}</Table.Td>
      <Table.Td>{entry.maxCrop}</Table.Td>
      <Table.Td>{entry.minCrop}</Table.Td>
    </Table.Tr>
  ));

  return (
    <div className='table'>
      <h2 className='heading'>Table 1</h2>
      <Table striped withTableBorder withColumnBorders className='table'>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Year</Table.Th>
          <Table.Th>Crop with Maximum Production</Table.Th>
          <Table.Th>Crop with Minimum Production</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
    </div>
  );
};

export default Table1;
