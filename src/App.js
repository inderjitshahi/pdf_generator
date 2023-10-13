import { useEffect, useState } from 'react';
import MyChart from './components/chart';
import { getData } from './service';
function App() {
  const [crimeData, setCrimeData] = useState([]);

  useEffect(() => {
    async function getCrimeData() {
      const data = await getData();
      console.log(data?.data);
      setCrimeData(data?.data);
    }
    getCrimeData();
  }, []);


  return (
    <div className=" h-screen flex flex-col items-center justify-center">
      <div className='w-1/2'>
        <MyChart crimeData={crimeData} />
      </div>
    </div>
  );
}

export default App;
