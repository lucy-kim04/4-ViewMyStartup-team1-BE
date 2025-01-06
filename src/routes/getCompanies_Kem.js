//구은모

import express from 'express';
import { PrismaClient } from '@prisma/client';
import asyncHandler from '../controllers/asyncHandler.js';
import { convertToBigIntFromObjArray } from '../controllers/convertToBigIntFromObjArray.js';

const router = express.Router();
const prisma = new PrismaClient();

router.get(
  '/api/kem/companies',
  asyncHandler(async (req, res) => {
    const companies = await prisma.company.findMany();
    res.send(convertToBigIntFromObjArray(companies));
  })
);

export default router;