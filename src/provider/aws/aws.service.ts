import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AwsService {
    constructor(private prisma: PrismaService) {}

    async getAwsSimpleDataAll() {
        return 'TODO'
    }

    async getAwsSimpleDataProduct() {
        return 'TODO'
    }

    async getAwsSimpleDataOptions() {
        return 'TODO'
    }
}
