// 조형민

import express from 'express';
import { PrismaClient } from '@prisma/client';
import asyncHandler from '../controllers/asyncHandler.js';
import { convertToBigIntFromObjArray } from '../controllers/convertToBigIntFromObjArray.js';
import { convertToBigIntFromObject } from '../controllers/convertToBigIntFromObject.js';

const router = express.Router();
const prisma = new PrismaClient();
export default router;

// 특정 기업 조회
router.get(
  '/companies/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const company = await prisma.company.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        description: true,
        category: true,
        actualInvest: true,
        simInvest: true,
        revenue: true,
        employeesCount: true,
        mySelectionCount: true,
        compareSelectionCount: true,
      },
    });
    res.send(convertToBigIntFromObject(company));
  })
);
