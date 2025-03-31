import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transfer } from '../transfer/transfer.schema';

@Injectable()
export class TransferRepository {

    constructor(@InjectModel('Transfer') private transferModel:Model<Transfer>) { }
    
    async findLastMonthCompanies() {
        try {
            const lastMonth = new Date();
            lastMonth.setMonth(lastMonth.getMonth() - 1);
        
            const transfersFound = await this.transferModel.aggregate([
                {
                    $match: {
                        $expr: {
                            $eq: [
                                { $month: "$createdAt" },
                                { $month: lastMonth }
                            ]
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'companies',
                        localField: 'companyId',
                        foreignField: '_id',
                        as: 'company'
                    }
                },
                {
                    $unwind: '$company'
                },
                {
                    $project: {
                        _id: '$company._id',
                        CUIT: '$company.CUIT',
                        companyName: '$company.companyName'
                    }
                }
            ]);
        
            return transfersFound;
        } catch (error) {
            throw new Error('There was a problem into the Transfers domain -> findLastMonthCompanies');
        }
    }
}
