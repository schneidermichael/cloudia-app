import {
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUsersProfil } from '../../auth/decorator';
import { JwtGuard } from '../../auth/guard';
import { AwsService } from './aws.service';

@UseGuards(JwtGuard)
@Controller('aws')
export class AwsController {
  constructor(private awsService: AwsService) {}

  @Get('/option/')
  async getAwsSimpleOptions(@GetUsersProfil() profil: User) {
    return this.awsService.getAwsSimpleDataOptions();
  }

  @Get('/')
  async getAwsSimpleDataAll(@GetUsersProfil() profil: User) {
    return this.awsService.getAwsSimpleDataAll();
  }

  @Get(':product')
  async getAwsSimpleDataProduct(
    @GetUsersProfil() profil: User,
    @Param('product') product,
  ) {
    return this.awsService.getAwsSimpleDataProduct(product);
  }

  @Get('/calculate/:product/time/:hours')
  async calculatePrice(
    @GetUsersProfil() profil: User,
    @Param('product') product,
    @Param('hours') hours,
  ) {
    return this.awsService.calculate(product, hours);
  }
}
