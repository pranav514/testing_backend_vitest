import { PrismaClient } from "@prisma/client";
import { createClient} from "redis"
export const prisma = new PrismaClient();
export const redisclient = createClient();