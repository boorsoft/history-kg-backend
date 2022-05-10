import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ParagraphService } from 'src/services/paragraph/paragraph.service';

@Controller('api/paragraphs')
export class ParagraphController {
    constructor(private readonly paragraphService: ParagraphService) {}

    @Get()
    getParagraphs() {
        return this.paragraphService.getParagraphs();
    }

    @Get(':id')
    async getParagraph(@Param('id') id: string) {
        const data = this.paragraphService.getParagraph(+id);
        let text: string;

        await data.then((paragraph) => {
            text = paragraph.text;
        })

        return text;

    }

    @Post()
    async createParagraph(@Req() req) {
        return this.paragraphService.createParagraph(req.body);
    }
}
