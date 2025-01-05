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
    const { orderBy } = req.query;
    const { id } = req.params;
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
      default:
        order = {
          revenue: 'desc',
        };
    }
    const companies = await prisma.company.findMany({ orderBy: order });
    const myCompanyIdx = companies.findIndex((company) => company.id === id);
    let rankCompanies;
    // 전체 기업 개수가 5보다 작으면 rank 정보만 추가
    if (companies.length < 5) {
      rankCompanies = [...companies];
      // 각 기업에 rank 부여하기
      rankCompanies.forEach((company, index) => {
        company['rank'] = index + 1;
      });
    } else {
      // 내가 선택한 기업이 1위나 2위인 경우
      if (myCompanyIdx === 0 || myCompanyIdx === 1) {
        rankCompanies = [companies[0], companies[1], companies[2], companies[3], companies[4]];
        // 각 기업에 rank 부여하기
        rankCompanies.forEach((company, index) => {
          company['rank'] = index + 1;
        });
      }
      // 내가 선택한 기업이 꼴지 혹은 꼴지 앞자리인 경우
      else if (myCompanyIdx === companies.length - 1 || myCompanyIdx === companies.length - 2) {
        rankCompanies = [
          companies[companies.length - 5],
          companies[companies.length - 4],
          companies[companies.length - 3],
          companies[companies.length - 2],
          companies[companies.length - 1],
        ];
        // 각 기업에 rank 부여하기
        rankCompanies.forEach((company, index) => {
          company['rank'] = companies.length - 4 + index;
        });
      } else {
        rankCompanies = [
          companies[myCompanyIdx - 2],
          companies[myCompanyIdx - 1],
          companies[myCompanyIdx],
          companies[myCompanyIdx + 1],
          companies[myCompanyIdx + 2],
        ];
        // 각 기업에 rank 부여하기
        rankCompanies.forEach((company, index) => {
          company['rank'] = myCompanyIdx - 1 + index;
        });
      }
    }
    res.send(convertToBigIntFromObjArray(rankCompanies));
  })
);
