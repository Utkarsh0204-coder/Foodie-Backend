const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MenuItem = require('./MenuItem');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const Mongo_URI = 'mongodb+srv://ug02042006:<db_password>@foodiedb.vdc9yvc.mongodb.net/?retryWrites=true&w=majority&appName=foodieDB';
mongoose.connect(Mongo_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.Console.error('MongoDB error:' , err));

app.post('/api/menu' , async(req, res) => {
    try {const item = new MenuItem(req.body);
        await item.save();
        res.json({ message: 'Meni item saved successfully'});
    } catch (error) {
        res.status(500).json({ error: 'Failed to save menu item'});
    }
});

app.get('/api/menu' , async (req, res) => {
    try {
        const items = await MenuItem.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch menu items'});
    }
});

app.get('/', (req, res) => {
  res.send('Project Backend is running!');
});

const PORT = process.env.PORT || 5000;
mongoose.connect(
  'your-mongodb-uri-here',
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})