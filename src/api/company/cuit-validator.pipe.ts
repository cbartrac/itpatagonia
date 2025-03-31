import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class CuitValidatorPipe implements PipeTransform {
  transform(value: any) {
    if (!this.isValidCuit(value.CUIT)) {
      throw new BadRequestException('Invalid CUIT format');
    }
    return value;
  }

  private isValidCuit(cuit: number): boolean {
    const cuitString = cuit.toString();
    if (cuitString.length !== 11) {
      return false; // CUIT must be 11 digits long
    }

    // Validate CUIT checksum
    const coefficients = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
    const digits = cuitString.split('').map(Number);
    const checksum = digits.slice(0, 10).reduce((sum, digit, index) => sum + digit * coefficients[index], 0);
    const remainder = 11 - (checksum % 11);

    const checkDigit = remainder === 11 ? 0 : remainder === 10 ? 9 : remainder;
    return checkDigit === digits[10];
  }
}