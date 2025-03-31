import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from './company.schema';

@Injectable()
export class CompanyRepository {

    constructor(@InjectModel('Company') private companyModel:Model<Company>) { }
    
    async findLastMonthRecords() {
        try {
            const lastMonth = new Date();
            lastMonth.setMonth(lastMonth.getMonth() - 1);
        
            const companiesFound = await this.companyModel.aggregate([
                {
                    $match: {
                        $expr: {
                            $eq: [
                                { $month: "$createdAt" },
                                { $month: lastMonth }
                            ]
                        }
                    }
                }
            ]);
        
            return companiesFound;
        } catch (error) {
            throw new Error('There was a problem into the Companies domain -> findLastMonthRecords');
        }
    }

    async create(companyDto) {
        try {
            const newCompany = await new this.companyModel(companyDto);
            
            return newCompany.save();
        } catch (error) {
            throw new Error('There was a problem into the Companies domain -> create');
        }
    }
}
