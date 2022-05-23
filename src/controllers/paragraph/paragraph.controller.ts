import { Controller, Get, Header, Param, Post, Req } from '@nestjs/common';
import { ParagraphService } from 'src/services/paragraph/paragraph.service';

@Controller('api/paragraphs')
export class ParagraphController {
    constructor(private readonly paragraphService: ParagraphService) {}

    @Get()
    @Header('Access-Control-Expose-Headers', 'Content-Range')
    @Header('Content-Range', 'bytes : 0-9/*')
    getParagraphs() {
        return this.paragraphService.getParagraphs();
    }

    @Get(':id')
    async getParagraph(@Param('id') id: string) {
        return this.paragraphService.getParagraph(+id);

    }

    @Post()
    async createParagraph(@Req() req) {
        return this.paragraphService.createParagraph(req.body);
    }
}
