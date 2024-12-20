// 조형민

import express from 'express';
import { PrismaClient } from '@prisma/client';
import asyncHandler from '../controllers/asyncHandler.js';
import { convertToBigIntFromObjArray } from '../controllers/convertToBigIntFromObjArray.js';

const router = express.Router();
const prisma = new PrismaClient();

// 특정 사용자의 최근 선택 기업 목록 조회
router.get(
  '/users/:id/selections',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    // 사용자의 latestSelectedCompanies 값을 조회
    const userSelections = await prisma.user.findUniqueOrThrow({
      where: { id },
      select: { latestSelectedCompanies: true },
    });
    // latestSelectedCompanies에서 기업 id배열을 추출
    const selectedIdsArray = userSelections.latestSelectedCompanies;
    // 해당 id를 가진 기업 목록을 조회
    const selectedCompanies = await prisma.company.findMany({
      where: { id: { in: selectedIdsArray } },
    });
    res.send(convertToBigIntFromObjArray(selectedCompanies));
  })
);

export default router;
