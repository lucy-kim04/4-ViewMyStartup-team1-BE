// 조형민

import express from 'express';
import { PrismaClient } from '@prisma/client';
import asyncHandler from '../controllers/asyncHandler.js';
import { convertToBigIntFromObjArray } from '../controllers/convertToBigIntFromObjArray.js';

const router = express.Router();
const prisma = new PrismaClient();
export default router;

// 기업 순위 조회하기(인접한 상하위 2개의 기업 포함 총 5개 기업 정보 조회)
router.get(
  '/companies/:id/rank',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const companies = await prisma.company.findMany({ orderBy: { revenue: 'desc' } });
    const myCompanyIdx = companies.findIndex((company) => company.id === id);
    let rankCompanies;
    if (companies.length < 5) {
      rankCompanies = [...companies];
    } else {
      if (myCompanyIdx === 0 || myCompanyIdx === 1) {
        rankCompanies = [companies[0], companies[1], companies[2], companies[3], companies[4]];
      } else if (myCompanyIdx === companies.length - 1 || myCompanyIdx === companies.length - 2) {
        rankCompanies = [
          companies[companies.length - 5],
          companies[companies.length - 4],
          companies[companies.length - 3],
          companies[companies.length - 2],
          companies[companies.length - 1],
        ];
      } else {
        rankCompanies = [
          companies[myCompanyIdx - 2],
          companies[myCompanyIdx - 1],
          companies[myCompanyIdx],
          companies[myCompanyIdx + 1],
          companies[myCompanyIdx + 2],
        ];
      }
    }
    res.send(convertToBigIntFromObjArray(rankCompanies));
  })
);
