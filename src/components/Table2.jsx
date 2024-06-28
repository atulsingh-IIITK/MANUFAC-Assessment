import React from 'react';
import { Table } from '@mantine/core';
import jsonData from '../data/Manufac _ India Agro Dataset.json';
import './styles/table.css'

const processCropData = (data) => {
  const cropData = {};

  data.forEach((entry) => {
    const { 'Crop Name': cropName, 'Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))': yieldValue, 'Area Under Cultivation (UOM:Ha(Hectares))': areaValue } = entry;
    const yieldParsed = yieldValue ? parseFloat(yieldValue) : 0;
    const areaParsed = areaValue ? parseFloat(areaValue) : 0;

    if (!cropData[cropName]) {
      cropData[cropName] = { totalYield: yieldParsed, totalArea: areaParsed, count: 1 };
    } else {
      cropData[cropName].totalYield += yieldParsed;
      cropData[cropName].totalArea += areaParsed;
      cropData[cropName].count += 1;
    }
  });

  return Object.keys(cropData).map((crop) => ({
    crop,
    avgYield: cropData[crop].totalYield / cropData[crop].count,
    avgArea: cropData[crop].totalArea / cropData[crop].count,
  }));
};

const Table2 = () => {
  const data = processCropData(jsonData);

  const rows = data.map((entry) => (
    <Table.Tr key={entry.crop}>
      <Table.Td>{entry.crop}</Table.Td>
      <Table.Td>{entry.avgYield.toFixed(3)}</Table.Td>
      <Table.Td>{entry.avgArea.toFixed(3)}</Table.Td>
    </Table.Tr>
  ));

  return (
    <div className='table'>
      <h2 className='heading'>Table 2</h2>
      <Table striped withTableBorder withColumnBorders className='table'>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Crop</Table.Th>
          <Table.Th>Average Yield of the Crop between 1950-2020 (Kg/Ha)</Table.Th>
          <Table.Th>Average Cultivation Area of the Crop between 1950-2020 (Ha)</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
    </div>
  );
};

export default Table2;
