import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import * as dotenv from 'dotenv';

dotenv.config();

console.log(process.env.MONGO_URI);

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
