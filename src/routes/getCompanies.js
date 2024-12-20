// 조형민

import express from 'express';
import { PrismaClient } from '@prisma/client';
import asyncHandler from '../controllers/asyncHandler.js';
import { convertToBigIntFromObjArray } from '../controllers/convertToBigIntFromObjArray.js';

const router = express.Router();
const prisma = new PrismaClient();

// 기업 리스트 조회 API
router.get(
  '/companies',
  asyncHandler(async (req, res) => {
    const companies = await prisma.company.findMany();
    // 데이터 중 bigint를 number로 변경
    const convertedCompanies = convertToBigIntFromObjArray(companies);
    res.send(convertedCompanies);
  })
);

export default router;
