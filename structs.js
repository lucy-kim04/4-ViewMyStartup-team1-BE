import * as s from 'superstruct';
import isUuid from 'is-uuid';

const CATEGORIES = ['EDUTECH', 'FASHION', 'PET', 'ENVIRONMENT', 'FINTECH', 'TRAVEL'];

const Uuid = s.define('Uuid', (value) => isUuid.v4(value));

export const CreateUser = s.object({
  name: s.size(s.string(), 1, 20),
});

export const PatchUser = s.partial(CreateUser);

export const CreateCompany = s.object({
  name: s.size(s.string(), 1, 20),
  actualInvest: s.min(s.integer(), 0),
  simInvest: s.min(s.integer(), 0),
  revenue: s.min(s.integer(), 0),
  compareSelectionCount: s.min(s.integer(), 0),
  mySelectionCount: s.min(s.integer(), 0),
  employeesCount: s.min(s.integer),
  description: s.size(s.string(), 1, 500),
  category: s.enums(CATEGORIES),
});

export const PatchCompany = s.partial(CreateCompany);

export const CreateInvestment = s.object({
  userId: Uuid,
  companyID: Uuid,
  amount: s.min(s.integer(), 0),
  comment: s.size(s.string(), 1, 200),
  password: s.size(s.string(), 4, 30),
});

export const PatchInvestment = s.partial(CreateInvestment);
