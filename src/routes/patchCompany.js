// 조형민

import express from 'express';
import { PrismaClient } from '@prisma/client';
import asyncHandler from '../controllers/asyncHandler.js';
import { convertToBigIntFromObject } from '../controllers/convertToBigIntFromObject.js';

const router = express.Router();
const prisma = new PrismaClient();

// 기업 정보 수정
router.patch(
  '/companies/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const company = await prisma.company.update({
      where: { id },
      data: req.body,
    });
    res.send(convertToBigIntFromObject(company));
  })
);

export default router;
