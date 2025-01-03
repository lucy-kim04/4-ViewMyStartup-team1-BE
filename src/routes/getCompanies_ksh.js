import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import asyncHandler from '../controllers/asyncHandler.js';

const prisma = new PrismaClient();
const router = express.Router();
export default router;

router.get('/companies', asyncHandler(async (req, res) => {
    const { skip = 0, limit = 10, orderBy = 'lowestSimInvestment' } = req.query;
    const companies = await prisma.company.findMany({
        skip: parseInt(req.query.skip || skip),
        take: parseInt(req.query.limit || limit),
        orderBy: (() => {
            switch (orderBy) {
                case 'lowestSimInvestment':
                    return {
                        simInvest: 'asc'
                    };
                case 'highestSimInvestment':
                    return {
                        simInvest: 'desc'
                    };
                case 'lowestInvestment':
                    return {
                        actualInvest: 'asc'
                    };
                case 'highestInvestment':
                    return {
                        actualInvest: 'desc'
                    };
                default:
                    return {};
            }
        })()
    });
    const formattedCompanies = companies.map(company => ({
        ...company,
        simInvest: company.simInvest.toString(),
        actualInvest: company.actualInvest.toString(),
        revenue: company.revenue.toString(),
    }));
    const totalItems = await prisma.company.count();
    res.send({ companies: formattedCompanies, totalItems });
}));
