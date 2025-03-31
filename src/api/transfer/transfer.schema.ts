import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now, Schema as MongooseSchema, ObjectId } from 'mongoose';

export type TransferDocument = HydratedDocument<Transfer>;

@Schema()
export class Transfer {
  @Prop()
  amount: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Company' })
  companyId: ObjectId;

  @Prop()
  debitAccount: boolean;

  @Prop()
  creditAccount: boolean;

  @Prop({default: now()})
  createdAt: Date;

  @Prop({default: now()})
  updatedAt: Date;
}

export const TransferSchema = SchemaFactory.createForClass(Transfer);