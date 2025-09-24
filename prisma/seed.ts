import { PrismaClient } from '../lib/generated/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding started...');

  const hashedPassword = await bcrypt.hash('password123', 10);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@omahbasa.com' },
    update: {}, 
    create: {
      email: 'admin@omahbasa.com',
      name: 'Admin Omahbasa',
      password: hashedPassword,
    },
  });

  console.log(`Seeding finished. Created user: ${adminUser.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });