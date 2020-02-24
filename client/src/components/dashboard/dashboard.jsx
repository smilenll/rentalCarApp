import React, { useEffect, useState } from 'react';
import { getContracts } from '../services/contracts.service';
import Contract from '../contract/contract';


const Dashboard = () => {
  const [contracts, setContracts] = useState();
  useEffect(() => {
    (async () => {
      const contractsFromDb = await getContracts();
      setContracts(contractsFromDb);
    })();
  }, []);

  return (
    <div className="row">
      <div className="col-12">
        <table className="table table-hover table-dark">
          <thead>
            <tr>
              <th scope="col">Car</th>
              <th scope="col">Customer</th>
              <th scope="col">From</th>
              <th scope="col">Estimated return date</th>
              <th scope="col">Estimated days return</th>
              <th scope="col">Estimated price per day</th>
              <th scope="col">Current days returned</th>
              <th scope="col">Current price per day</th>
              <th scope="col">Current total price</th>
            </tr>
          </thead>
          <tbody>
            {
            contracts
              ? contracts.map((item) => <Contract key={item.id} contract={item} />)
              : null
            }
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>
                <button type="button" className="btn btn-outline-primary btn-block">Primary</button>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>
                <button type="button" className="btn btn-outline-primary btn-block">Primary</button>
              </td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>Bird</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>
                <button type="button" className="btn btn-outline-primary btn-block">Primary</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default Dashboard;
