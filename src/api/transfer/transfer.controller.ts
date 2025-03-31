import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { TransferService } from './transfer.service';

@Controller('trasnfers')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Get('last-month-companies')
  async trasnfers(@Res() response): Promise<any> {
      try {
        const companies = await this.transferService.getLastMonthCompanies()
        
        return response.status(HttpStatus.ACCEPTED).json({
          message: 'Transfers have been found successfully', 
          data: companies
        });
      } catch (err) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          message: 'Transfers not found!',
          error: err.message
        });
      }
  }

}
