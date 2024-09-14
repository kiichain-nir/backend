import { PrismaClient } from '@prisma/client';
import * as _ from 'lodash';

enum ROLE {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export const users = [
  {
    name: 'Hope Admin',
    roles: [ROLE.ADMIN],
    email: 'hope.admin@nirbhik.com',
  },
  {
    name: 'Hope User',
    email: 'hope.user@mailinator.com',
  },
];

const prisma = new PrismaClient();

async function main() {
  for await (const user of users) {
    const userAttrs = _.cloneDeep(user);
    await prisma.user.create({
      data: {
        ...userAttrs,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async error => {
    console.log(error);
    await prisma.$disconnect();
  });
