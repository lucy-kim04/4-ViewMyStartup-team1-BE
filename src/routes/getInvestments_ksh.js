import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import asyncHandler from '../controllers/asyncHandler.js';

const prisma = new PrismaClient();
const router = express.Router();
export default router;

// View My Startup에서 받은 투자 금액, 실제 누적 투자 금액 별 오름차순/내림차순 정렬

router.get('/investments', asyncHandler(async (req, res) => {
    const { offset = 0, limit = 10, orderBy = 'asc' } = req.query;
    const investments = await prisma.investment.findMany({
        skip: Number(offset),
        take: Number(limit),
        orderBy: (() => {
            switch (orderBy) {
                case 'asc':
                    return {
                        amount: 'asc'
                    };
                case 'desc':
                    return {
                        amount: 'desc'
                    };
                default:
                    return {};
            }
        })()
    });
    const formattedInvestments = investments.map(investment => ({
        ...investment,
        amount: investment.amount.toString(),
    }));
    res.send(formattedInvestments); // Fixed: Send the formattedInvestments instead of investments
}
));