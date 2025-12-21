import express, { type Request, type Response } from 'express';
const app = express();

app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok' });
});

app.listen(3001, () => console.log('API on http://localhost:3001'));
