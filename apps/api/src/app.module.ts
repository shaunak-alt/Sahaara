import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { LegalModule } from './legal/legal.module';

@Module({
  imports: [ChatModule, LegalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}