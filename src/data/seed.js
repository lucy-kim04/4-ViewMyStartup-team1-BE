import { PrismaClient } from '@prisma/client';
import { COMPANIES, INVESTMENTS, USERS } from './mock.js';

const prisma = new PrismaClient();

async function main() {
  // 기존 데이터 삭제
  await prisma.user.deleteMany();
  await prisma.company.deleteMany();
  await prisma.investment.deleteMany();

  // 목 데이터 삽입
  await prisma.user.createMany({
    data: USERS,
    skipDuplicates: true, // unique한 필드가 중복되는 데이터는 skip
  });
  await prisma.company.createMany({
    data: COMPANIES,
    skipDuplicates: true,
  });
  await prisma.investment.createMany({
    data: INVESTMENTS,
    // skipDuplicates: true,
  });

  // nested(중첩된) data가 포함된 엔티티가 있을 경우에는
  // createMany를 사용할 수 없으므로 아래와 같이 사용할 것
  // await Promise.all(
  //   USERS.map(async (user) => {
  //     await prisma.user.create({ data: user });
  //   })
  // );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
