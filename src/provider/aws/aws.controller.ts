import {
  Controller,
  ForbiddenException,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { Users } from '@prisma/client';
import { GetUsersProfil } from '../../auth/decorator';
import { JwtGuard } from '../../auth/guard';
import { AwsService } from './aws.service';

@UseGuards(JwtGuard)
@Controller('aws')
export class AwsController {
  constructor(private awsService: AwsService) {}

  @Get('')
  async getAwsSimpleDataAll(@GetUsersProfil() profil: Users) {
    //if (profil.id != 1) throw new ForbiddenException('Your are not allowed! Admin only!')
    return this.awsService.getAwsSimpleDataAll();
  }

  @Get(':product')
  async getAwsSimpleDataProduct(
    @GetUsersProfil() profil: Users,
    @Param('product') product,
  ) {
    if (profil.id != 1)
      throw new ForbiddenException('Your are not allowed! Admin only!');
    return this.awsService.getAwsSimpleDataProduct(product);
  }

  @Get('option')
  async getAwsSimpleOptions(@GetUsersProfil() profil: Users) {
    if (profil.id != 1)
      throw new ForbiddenException('Your are not allowed! Admin only!');
    return this.awsService.getAwsSimpleDataOptions();
  }
}
