import express from 'express';

const app = express();
app.use(express.json());
const PORT = 3000;

app.get('/:id', (req, res) => {
    const params = req.params;
    return res.json(params)
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});