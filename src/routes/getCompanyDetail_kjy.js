// 김주영
import express from 'express';
import { PrismaClient } from '@prisma/client';
import asyncHandler from '../controllers/asyncHandler.js';
import { convertToBigIntFromObjArray } from '../controllers/convertToBigIntFromObjArray.js';

const router = express.Router();
const prisma = new PrismaClient();

router.get(
  '/companies/:id',
  asyncHandler(async (req, res) => {
    const selectedCompanies = await prisma.company.findUnique({
      where: {
        id: req.params.id,
      },
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

    if (!selectedCompanies) {
      return res.status(404).send({ message: '회사 정보를 찾을 수 없습니다.' });
    }

    res.send(convertToBigIntFromObjArray([selectedCompanies])); // 배열로 감싸서 전달
  })
);

export default router;
