import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3001;
export const HOST = process.env.HOST || '0.0.0.0';
export const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001';
