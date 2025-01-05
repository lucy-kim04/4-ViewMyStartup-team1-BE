import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { PrismaClient } from '@prisma/client';
import asyncHandler from '../controllers/asyncHandler.js';

const prisma = new PrismaClient();
const router = express.Router();


/**
 * PUT /api/investments/{investmentId}
 * 특정 투자 정보를 수정하는 API
 */
router.put('/investments/:investmentId', asyncHandler(async (req, res) => {
    const { amount, comment, password, passwordConfirmation, user, company } = req.body;
    const { investmentId } = req.params;

    // 비밀번호 확인
    if (password !== passwordConfirmation) {
        return res.status(400).json({ error: 'Passwords do not match.' });
    }

    try {
        // 투자 항목 찾기
        const investment = await prisma.investment.findUnique({
            where: { id: investmentId },
            include: { user: true },
        });

        if (!investment) {
            return res.status(404).json({ error: 'Investment not found.' });
        }

        // 비밀번호 확인 (입력된 비밀번호와 투자자의 비밀번호 비교)
        if (password !== investment.password) {
            return res.status(403).json({ error: 'Invalid password. Update not allowed.' });
        }

        // 투자 정보 업데이트
        const updatedInvestment = await prisma.investment.update({
            where: { id: investmentId },
            data: {
                amount,
                comment,
                userId: user.id,
                companyId: company.id,
            },
        });

        // 업데이트된 투자 정보 응답
        res.status(200).json({
            amount: updatedInvestment.amount.toString(), // BigInt 처리
            comment: updatedInvestment.comment,
            user: {
                id: updatedInvestment.userId,
                name: user.name,
            },
            company: {
                id: company.id,
                name: company.name,
                imageUrl: company.imageUrl,
                category: company.category,
            },
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}));

export default router;
