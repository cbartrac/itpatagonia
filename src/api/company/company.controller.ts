import { Controller, Get, Post, Res, Body, HttpStatus } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyDto } from './company.dto';
import { CuitValidatorPipe } from './cuit-validator.pipe';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('last-month')
  async companies(@Res() response): Promise<any> {
    try {
      const companies = await this.companyService.getLastMonthRecords()
      
      return response.status(HttpStatus.ACCEPTED).json({
        message: 'Companies have been found successfully', 
        data: companies
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Companies not found!',
        error: err.message
      });
    }
  }

  @Post('create')
  async company(@Res() response, @Body(new CuitValidatorPipe()) companyDto: CompanyDto): Promise<any> {
    try {
      const newCompany = await this.companyService.create(companyDto);
      
      return response.status(HttpStatus.CREATED).json({
        message: 'Company has been created successfully', 
        data: newCompany
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Company was not created!',
        error: err.message
      });
    }
  }
}
