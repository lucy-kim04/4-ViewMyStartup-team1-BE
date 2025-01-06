import express from 'express';
import { PrismaClient } from '@prisma/client';
import asyncHandler from '../controllers/asyncHandler.js';
import { convertToBigIntFromObjArray } from '../controllers/convertToBigIntFromObjArray.js';
import { convertToBigIntFromObject } from '../controllers/convertToBigIntFromObject.js';

const router = express.Router();
const prisma = new PrismaClient();

router.get(
  '/companies/:id/investments',
  asyncHandler(async (req, res) => {
    const { limit, skip } = req.query;
    const allCompanyInvestments = await prisma.company.findUniqueOrThrow({
      where: { id: req.params.id },
      select: { investments: true },
    });
    let totalInvestAmount = 0;
    allCompanyInvestments.investments.forEach((investment) => {
      const newInvestment = convertToBigIntFromObject(investment);
      totalInvestAmount += newInvestment.amount;
    });
    const totalCount = allCompanyInvestments.investments.length;
    console.log(allCompanyInvestments);
    const companyInvestments = await prisma.company.findUniqueOrThrow({
      where: {
        id: req.params.id,
      },
      select: {
        investments: {
          select: {
            id: true,
            name: true,
            userId: true,
            companyId: true,
            amount: true,
            password: true,
            createdAt: true,
            updatedAt: true,
            comment: true,
          },
          take: parseInt(limit),
          skip: parseInt(skip),
          orderBy: { amount: 'desc' },
        },
      },
    });
    console.log(companyInvestments);
    if (!companyInvestments) {
      return res.status(404).send({ message: 'Company not found' });
    }
    console.log(companyInvestments);
    companyInvestments.investments.forEach((investment, index) => {
      investment['rank'] = index + parseInt(skip) + 1; // skip을 반영해야 페이지를 넘겼을 때의 순위가 제대로 부여됨
    });
    res.send({
      totalCount,
      totalInvestAmount,
      companyInvestments: convertToBigIntFromObjArray(
        companyInvestments.investments
      ),
    });
  })
);

export default router;
