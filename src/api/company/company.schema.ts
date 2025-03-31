import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema()
export class Company {
  @Prop({required: true, unique: true})
  CUIT: number;

  @Prop({required: true, unique: true})
  companyName: string;

  @Prop({default: now()})
  createdAt: Date;

  @Prop({default: now()})
  updatedAt: Date;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
