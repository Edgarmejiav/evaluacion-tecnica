import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Importa ConfigService
import * as path from 'node:path'; // Importa path

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que ConfigService esté disponible globalmente
      envFilePath: path.resolve(
        __dirname,
        `../.env.${process.env.NODE_ENV || 'development'}`,
      ),
      // Si NODE_ENV no está definido, por defecto buscará '.env.development'
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Importa ConfigModule para que ConfigService esté disponible
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'), // Obtiene MONGO_URI de ConfigService
        // Puedes añadir más opciones de Mongoose aquí si las necesitas
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      }),
      inject: [ConfigService], // Indica que ConfigService debe ser inyectado
    }),
    TasksModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
