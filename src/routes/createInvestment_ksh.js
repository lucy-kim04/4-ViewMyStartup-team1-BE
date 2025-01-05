import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { PrismaClient } from '@prisma/client';
import asyncHandler from '../controllers/asyncHandler.js';

const prisma = new PrismaClient();
const router = express.Router();

export default router;


/**
 * POST /api/investments
 * 특정 기업에 투자를 추가하는 API
 */
router.post('/investments', asyncHandler(async (req, res) => {
    const { amount, comment, password, passwordConfirmation, user, company } = req.body;

    // 비밀번호 확인
    if (password !== passwordConfirmation) {
        return res.status(400).json({ error: 'Passwords do not match.' });
    }

    try {
        // 중복 투자 확인
        const existingInvestment = await prisma.investment.findFirst({
            where: {
                userId: user.id,
                companyId: company.id,
            },
        });

        if (existingInvestment) {
            return res.status(409).json({ error: 'Investment already exists for this company.' });
        }

        const newInvestment = await prisma.investment.create({
            data: {
                amount,
                comment,
                userId: user.id,
                companyId: company.id,
                password,
            },
        });

        const sanitizedInvestment = {
            ...newInvestment,
            amount: newInvestment.amount.toString(), // BigInt를 문자열로 변환
        };

        res.status(201).json(sanitizedInvestment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}));


