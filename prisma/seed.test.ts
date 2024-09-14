import { Prisma, PrismaClient, Project } from '@prisma/client';
import * as _ from 'lodash';

const prisma = new PrismaClient();

const projects: Prisma.ProjectCreateInput[] = [
  {
    name: 'Floood Relief',
    budget: 1000,
    tokenName: 'Flood Token',
    tokenQuantity: 10000,
    tokenSymbol: 'FLT',
    rwaRepresentation: 'tent',
    description: 'Description of Flood Relief',
    createdAt: new Date(),
    updatedAt: null,
    userWallet: '0x3ad456d3753BBA798dBCF1073D111A2f12b0feD2',
    txHash: '0xa39750906f2988a1004eab14e36e00db455dad986d46255df704c6d1981c2a84',
  },
];

const vendors: Prisma.VendorCreateInput[] = [
  {
    name: 'Vendor 1',
    walletAddress: 'vendor1-wallet-address',
    extras: { city: 'City1', country: 'Country1' },
    email: 'vendor1@mailinator.com',
    project: {
      connect: {
        id: 1,
      },
    },
    createdAt: new Date(),
    updatedAt: null,
  },
  {
    name: 'Vendor 2',
    walletAddress: 'vendor2-wallet-address',
    extras: { city: 'City2', country: 'Country2' },
    email: 'vendor2@mailinator.com',
    createdAt: new Date(),
    updatedAt: null,
    project: {
      connect: {
        id: 1,
      },
    },
  },
];

const beneficiaries: Prisma.BeneficiaryCreateInput[] = [
  {
    name: 'Beneficiary 1',
    walletAddress: '0x123',
    email: 'beneficiary1@mailinator.com',
    gender: 'Female',
    age: 30,
    latitude: 40.7128,
    longitude: -74.006,
    project: {
      connect: {
        id: 1,
      },
    },
    createdAt: new Date(),
    updatedAt: null,
  },
  {
    name: 'Beneficiary 2',
    walletAddress: '0x456',
    email: 'beneficiary2@mailinator.com',
    gender: 'Male',
    age: 25,
    latitude: 34.0522,
    longitude: -118.2437,
    project: {
      connect: {
        id: 1,
      },
    },
    createdAt: new Date(),
    updatedAt: null,
  },
];

async function main() {
  for (const project of projects) {
    const projectAttrs = _.cloneDeep(project) as Project;
    await prisma.project.create({
      data: {
        ...projectAttrs,
      },
    });
  }

  for (const vendor of vendors) {
    const vendorAttrs = _.cloneDeep(vendor);
    await prisma.vendor.create({
      data: {
        ...vendorAttrs,
      },
    });
  }

  for (const beneficiary of beneficiaries) {
    const beneficiaryAttrs = _.cloneDeep(beneficiary);
    await prisma.beneficiary.create({
      data: {
        ...beneficiaryAttrs,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async error => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
