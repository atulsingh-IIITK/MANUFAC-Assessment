import './App.css';
import Table1 from './components/Table1';
import Table2 from './components/Table2';
import data from './data/Manufac _ India Agro Dataset.json'
import { MantineProvider, Text } from '@mantine/core';
import '@mantine/core/styles.css';

function App() {
  console.log(data)

  return (
    <div className='container'>
      <Table1 />
      <Table2 />
    </div>
  );
}

export default App;
