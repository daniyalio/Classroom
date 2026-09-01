import express from 'express';
const app = express();
const port = 3000;
//41 : 00 minutes
const router = express.Router();

app.use(express.json());

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
    const car = cars.find((car) => car.id == id);
    if(!car) return res.status(404).send('Car not found');

    res.json(car);
})

router.post('/',(req,res)=>{

})


router.put('/:id',(req,res)=>{
   
})



router.delete('/:id',(req,res)=>{
    res.send("Delete a particular car")
})



app.use('/api/v1/cars',router);
app.listen(port, () => console.log('Server is running on port http://localhost:3000'));
