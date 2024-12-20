import express from 'express';
import { PrismaClient } from '@prisma/client';
import asyncHandler from '../controllers/asyncHandler.js';

const router = express.Router();
const prisma = new PrismaClient();

// 전체 사용자 목록 조회
router.get(
  '/users',
  asyncHandler(async (req, res) => {
    const users = await prisma.user.findMany();
    res.send(users);
  })
);

export default router;
