import express from 'express';
import { PrismaClient } from '@prisma/client';
import asyncHandler from '../controllers/asyncHandler.js';
import { convertToBigIntFromObjArray } from '../controllers/convertToBigIntFromObjArray.js';

const router = express.Router();
const prisma = new PrismaClient();

router.get(
  '/companies/:id/investments',
  asyncHandler(async (req, res) => {
    const companyInvestments = await prisma.company.findUnique({
      where: {
        id: req.params.id,
      },
      select: {
        investments: {
          select: {
            id: true,
            userId: true,
            amount: true,
            createdAt: true,
          },
        },
      },
    });

    if (!companyInvestments) {
      return res.status(404).send({ message: 'Company not found' });
    }

    res.send(convertToBigIntFromObjArray(companyInvestments.investments));
  })
);

export default router;
