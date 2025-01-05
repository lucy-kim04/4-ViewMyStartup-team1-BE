import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

export default router;

/**
 * DELETE /api/investments/{investmentId}
 * 특정 투자 항목을 삭제하는 API
 */
router.delete('/investments/:investmentId', async (req, res) => {
    const { investmentId } = req.params;
    const { password } = req.query; // 삭제를 위한 비밀번호

    try {
        // 해당 투자 항목 찾기
        const investment = await prisma.investment.findUnique({
            where: {
                id: investmentId,
            },
            include: {
                user: true, // 사용자 정보 포함
                company: true, // 회사 정보 포함
            },
        });

        if (!investment) {
            return res.status(404).json({ error: 'Investment not found.' });
        }

        // 투자 항목의 비밀번호 확인
        if (investment.password !== password) {
            return res.status(403).json({ error: 'Incorrect password.' });
        }

        // 투자 항목 삭제
        await prisma.investment.delete({
            where: {
                id: investmentId,
            },
        });

        res.status(200).json({ message: 'Investment deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});
