import { useEffect, useState } from 'react';
import Table from './components/Table';

function App() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.datos.gob.mx/v1/condiciones-atmosfericas/'
        );
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        const { results, pagination } = await response.json();
        setData(results);
        setPagination(pagination);
        setError(null);
      } catch (error) {
        setError(error.message);
        setData(null);
      } finally {
        setIsLoading(true);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='App'>
      {error && <div>{error}</div>}
      {!isLoading && <div>Loading...</div>}
      {data && <Table data={data} pagination={pagination} />}
    </div>
  );
}

export default App;
