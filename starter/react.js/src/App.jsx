import Car from './components/Car';
import { useState, useEffect} from 'react';
// 1 hour and 35 min
const App = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch('/api/v1/cars')
      .then(res => res.json())
      .then(data => setCars(data))
      .catch(err => console.error(err));
  }, []);

    console.log(cars);
  return (
    <div>
      <ul>
          {cars.map((car) => (
            <Car key={car.id} {...car}/>
          ))}
      </ul>
    </div>
  );
}
export default App;
