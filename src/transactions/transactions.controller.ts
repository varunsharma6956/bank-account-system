import { Controller, Post, Body, Get, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionEvent } from './event.entity';

@Controller('transactions')
export class TransactionsController {
  constructor(
    @InjectRepository(TransactionEvent)
    private readonly transactionRepository: Repository<TransactionEvent>,
  ) {}

  @Post()
  async createTransaction(@Body() transactionData: any): Promise<any> {
    try {
      // Logic to process transaction
      // ...

      // Save transaction event
      const transactionEvent = this.transactionRepository.create({
        type: transactionData.type,
        amount: transactionData.amount,
        accountId: transactionData.accountId,
      });
      await this.transactionRepository.save(transactionEvent);

      return { message: 'Transaction created successfully', transaction: transactionEvent };
    } catch (error) {
      throw new HttpException('Failed to create transaction', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async getTransactionHistory(): Promise<TransactionEvent[]> {
    try {
      const transactions = await this.transactionRepository.find();
      return transactions;
    } catch (error) {
      throw new HttpException('Failed to fetch transaction history', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}