import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

type ChatRequest = {
  message: string;
  redactions?: string[];
  locale?: string;
};

type TranslationEntry = {
  id: string;
  text: string;
  from?: string;
  role?: 'user' | 'guide';
};

type TranslationRequest = {
  targetLocale?: string;
  entries: TranslationEntry[];
};

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('preview')
  async preview(@Body() body: ChatRequest) {
    return this.chatService.generatePreview(body.message, body.redactions ?? [], body.locale);
  }

  @Post('translate')
  async translate(@Body() body: TranslationRequest) {
    return this.chatService.translateBatch(body.entries ?? [], body.targetLocale);
  }
}