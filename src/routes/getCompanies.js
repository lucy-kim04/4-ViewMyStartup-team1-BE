import express from 'express';
import { PrismaClient } from '@prisma/client';
import asyncHandler from '../controllers/asyncHandler.js';
import { convertBigIntToNumber } from '../controllers/convertBigIntToNumber.js';

const router = express.Router();
const prisma = new PrismaClient();

// 전체 기업 리스트 조회
router.get(
  '/companies',
  asyncHandler(async (req, res) => {
    const companies = await prisma.company.findMany();
    // 데이터 중 bigint를 number로 변경
    const convertedCompanies = convertBigIntToNumber(companies);
    res.send(convertedCompanies);
  })
);

export default router;
