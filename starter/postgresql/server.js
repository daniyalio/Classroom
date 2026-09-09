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

/*let cars = [
    {id: 1, make: 'Toyota', model: 'Camry', year: 2022, price: 28000},
    {id: 2, make: 'Tesla', model: 'Model S', year: 2023, price: 25000},
    {id: 3, make: 'Ford', model: 'F-150', year: 2021, price: 35000},
]
    */
import { db } from './db.js';
import { cars } from './schema.js';
import { eq } from 'drizzle-orm';

app.get('/',(req,res)=>{
    res.json("Hello from the server")
})

router.get('/', async (req, res) => {
    const rows = await db.select().from(cars);
    res.json(rows);
})

router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const [car] = await db.select().from(cars).where(eq(cars.id, id));
    if(!car) return res.status(404).send('Car not found');

    res.json(car);
})

router.post('/', async (req,res)=>{
    const {make, model, year, price} = req.body;
    
    if(make == null || model == null || year == null || price == null) {
        return res.status(400).send({ error: "Missing fields" });
    }
    
    const[newCar] = await db.insert(cars).values({make, model, year, price}).returning();

    res.status(201).json(newCar);
})


router.put('/:id', async (req, res) => {
   const id = Number(req.params.id);
   const { make, model, year, price } = req.body;

   if(make == null || model == null || year == null || price == null) {
       return res.status(400).send({ error: "Missing fields" });
   }

   const [updatedCar] = await db.update(cars)
       .set({ make, model, year, price })
       .where(eq(cars.id, id))
       .returning();
   if (!updatedCar) return res.status(404).send('Car not found');

   res.status(200).json(updatedCar);
})

router.patch('/:id', async (req, res) => {

    const id = Number(req.params.id);
    const { make, model, year, price } = req.body;
    const updates = Object.fromEntries(
        Object.entries({ make, model, year, price }).filter(([, value]) => value !== undefined)
    );

    if (Object.keys(updates).length === 0) {
        return res.status(400).send({ error: "No fields to update" });
    }

    const [updatedCar] = await db.update(cars)
        .set(updates)
        .where(eq(cars.id, id))
        .returning();
    if (!updatedCar) return res.status(404).send('Car not found');

    res.status(200).json(updatedCar);
});

router.delete('/:id', async (req,res)=>{
    const id = Number(req.params.id);
    const [deletedCar] = await db.delete(cars)
        .where(eq(cars.id, id))
        .returning();
    if (!deletedCar) return res.status(404).send('Car not found');
    res.status(204).send();
})



app.use('/api/v1/cars',router);
app.listen(port, () => console.log('Server is running on port http://localhost:3000'));
