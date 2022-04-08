import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async register(dto: AuthDto) {
        try {
            const hash = await argon.hash(dto.pwd);
            const user = await this.prisma.users.create({
                data: {
                    eMail: dto.eMail,
                    pwd: hash,
                },
            });
            delete user.pwd;
            return user;
        } catch(error) {
            if(error instanceof PrismaClientKnownRequestError) {
                if (error.code == 'P2002') {
                    throw new ForbiddenException('Credentials taken');
                }
            }
            throw error;
        }        
    }

    async signin(dto: AuthDto) {
        const user = await this.prisma.users.findUnique({
            where: {
                eMail: dto.eMail
            },
        });
        if (!user) throw new ForbiddenException('Credentials incorrect');
        
        const match = await argon.verify(user.pwd,dto.pwd);
        if (!match) throw new ForbiddenException('Credentials incorrect')
        
        delete user.pwd;
        return user;
    }
}
