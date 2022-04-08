import { PrismaClient } from '.prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        super({
            datasources: {
                db: {
                    url: 'postgresql://postgres:postgres@localhost:5434/cloudia-db?schema=public'
                }
            }
        })
    }
}
