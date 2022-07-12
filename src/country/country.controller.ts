import { Controller, Get } from '@nestjs/common';
import { CountryService } from './country.service';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  findAll() {
    return this.countryService.findAll();
  }
}
