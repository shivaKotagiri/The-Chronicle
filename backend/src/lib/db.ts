import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

// Export a function that creates a new PrismaClient with accelerate for each request
export function getDB(datasourceUrl: string) {
  return new PrismaClient({
    datasourceUrl: datasourceUrl,
  }).$extends(withAccelerate())
}
