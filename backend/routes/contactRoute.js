import express from 'express';
import { createContact } from '../controllers/contactController.js';

const contactRouter = express.Router();

contactRouter.post('/send', createContact);

export default contactRouter;
