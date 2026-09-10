import express from 'express';
const app = express();
const port = 3000;
//41 : 00 minutes
const router = express.Router();

app.use(express.json());

app.use((req, res, next) => {
    const timestamp = new Date().toISOString();

    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
});

let cars = [
    {id: 1, make: 'Toyota', model: 'Camry', year: 2022, price: 28000},
    {id: 2, make: 'Tesla', model: 'Model S', year: 2023, price: 25000},
    {id: 3, make: 'Ford', model: 'F-150', year: 2021, price: 35000},
]
app.get('/',(req,res)=>{
    res.json("Hello from the server")
})

router.get('/',(req,res)=>{
    res.json(cars)
})

router.get('/:id',(req,res)=>{
    const id = Number(req.params.id);
    const car = cars.find((car) => car.id === id);
    if(!car) return res.status(404).send('Car not found');

    res.json(car);
})

router.post('/',(req,res)=>{
    const {make, model, year, price} = req.body;
    
    if(!make || !model || !year || !price) {
        return res.status(400).send({ error: "Missing fields" });
    }
    
    const newCar = {
        id: cars.length + 1, make, model, year, price
    };
    cars.push(newCar);
    res.status(201).json(newCar);
})


router.put('/:id',(req,res)=>{
   const id = Number(req.params.id);
   const carIndex = cars.findIndex((car) => car.id === id);
   if (carIndex === -1) return res.status(404).send('Car not found');
   
   cars[carIndex] = {id, ...req.body};
   res.status(200).json(cars[carIndex]);
})

router.patch('/:id', (req, res) => {

    const id = Number(req.params.id);

    const carIndex = cars.findIndex((car) => car.id === id);

    if (carIndex === -1) {
        return res.status(404).send('Car not found');
    }

    cars[carIndex] = { ...cars[carIndex], ...req.body };

    res.status(200).json(cars[carIndex]);
});

router.delete('/:id',(req,res)=>{
    const id = Number(req.params.id);
    const carIndex = cars.findIndex((car) => car.id === id);
    if (carIndex === -1) return res.status(404).send('Car not found');
    cars.splice(carIndex, 1);
    res.status(204).send();
})



app.use('/api/v1/cars',router);
app.listen(port, () => console.log('Server is running on port http://localhost:3000'));
