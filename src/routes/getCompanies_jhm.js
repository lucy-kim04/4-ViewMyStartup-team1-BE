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
    const { limit = 5, skip = 0, searchString, orderBy = 'highestSales' } = req.query;
    const where = searchString ? { name: { contains: searchString } } : {};
    let order;
    switch (orderBy) {
      case 'highestSales':
        order = {
          revenue: 'desc',
        };
        break;
      case 'lowestSales':
        order = {
          revenue: 'asc',
        };
        break;
      case 'highestInvestment':
        order = {
          actualInvest: 'desc',
        };
        break;
      case 'lowestInvestment':
        order = {
          actualInvest: 'asc',
        };
        break;
      case 'highestSimInvestment':
        order = {
          simInvest: 'desc',
        };
        break;
      case 'lowestSimInvestment':
        order = {
          simInvest: 'asc',
        };
        break;
      case 'mostEmployees':
        order = {
          employeesCount: 'desc',
        };
        break;
      case 'fewestEmployees':
        order = {
          employeesCount: 'asc',
        };
        break;
      case 'name':
        order = {
          name: 'asc',
        };
        break;
      default:
        order = {
          revenue: 'desc',
        };
    }
    const companies = await prisma.company.findMany({
      where,
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
      orderBy: order,
      take: parseInt(limit),
      skip: parseInt(skip),
    });
    const totalCount = await prisma.company.count({ where });
    res.send({ totalCount: totalCount, companies: convertToBigIntFromObjArray(companies) });
  })
);

export default router;
