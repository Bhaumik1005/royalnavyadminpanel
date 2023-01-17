import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { modelDefination } from './user/entities';

@Module({
                                      
  imports: [  
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.dev'
    }),
    UserModule,
    MongooseModule.forRoot(process.env.DBURL),
    MongooseModule.forFeature(modelDefination)
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
