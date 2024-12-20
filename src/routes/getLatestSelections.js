import express from 'express';
import { PrismaClient } from '@prisma/client';
import asyncHandler from '../controllers/asyncHandler.js';

const router = express.Router();
const prisma = new PrismaClient();

// 특정 사용자가 최근 선택한 기업 목록(최대 5개) 조회
router.get(
  '/users/:id/selections',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const selectionIds = await prisma.user.findUniqueOrThrow({
      where: { id },
      select: { latestSelectedCompanies: true },
    });
    res.sendStatus(200).send(selectionIds);
  })
);
