import {PrismaClient} from "@prisma/client";

const prismaCLientSingleton= ()=>{
  return new PrismaClient();
}

declare global{
  var prismaGlobal: undefined | ReturnType <typeof prismaCLientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaCLientSingleton();

export default prisma;

if(process.env.NODE_ENV!=='production') globalThis.prismaGlobal = prisma;