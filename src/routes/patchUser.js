// 조형민

import express from 'express';
import { PrismaClient } from '@prisma/client';
import asyncHandler from '../controllers/asyncHandler.js';

const router = express.Router();
const prisma = new PrismaClient();

// user 정보 수정
router.patch(
  '/users/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.update({
      where: { id },
      data: req.body,
    });
    res.send(user);
  })
);

export default router;
