import React, { useState } from 'react';

const Table = ({ data, pagination }) => {
  const [showData, setShowData] = useState(0);
  const [showNewData, setShowNewData] = useState(10);

  const dataPerPage = data.slice(showData, showNewData);

  const nextData = () => {
    if (showData >= data.length - 10) return;
    setShowData((prev) => prev + 10);
    setShowNewData((prev) => prev + 10);
  };

  const prevData = () => {
    if (showData <= 0) return;
    setShowData((prev) => prev - 10);
    setShowNewData((prev) => prev - 10);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>_id</th>
            <th>cityid</th>
            <th>name</th>
            <th>state</th>
            <th>probabilityof precip</th>
            <th>relativehu midity</th>
            <th>Lastreportt ime formato (YYYY/MM /DD)</th>
            <th>
              LLUEVE SI se cumple = probabilityof precip {'>'} 60 ||
              relativehumi dity {'>'} 50
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length &&
            dataPerPage.map((element) => {
              const {
                _id,
                cityid,
                name,
                state,
                probabilityofprecip,
                relativehumidity,
                lastreporttime,
              } = element;
              const rain = probabilityofprecip > 60 || relativehumidity > 50;

              return (
                <tr key={_id}>
                  <td>{_id}</td>
                  <td>{cityid}</td>
                  <td>{name}</td>
                  <td>{state}</td>
                  <td>{probabilityofprecip}</td>
                  <td>{relativehumidity}</td>
                  <td>{lastreporttime}</td>
                  <td>{rain ? 'LLUEVE' : 'NO LLUEVE'}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className='container-btn'>
        <button className='btn btn-prev' onClick={prevData}>
          PREV Page
        </button>
        <button className='btn btn-next' onClick={nextData}>
          Next Page
        </button>
      </div>
    </>
  );
};

export default Table;
