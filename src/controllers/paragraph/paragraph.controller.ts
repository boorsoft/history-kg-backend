import { Controller, Delete, Get, Header, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
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

    @UseGuards(JwtAuthGuard)
    @Post()
    async createParagraph(@Req() req) {
        return this.paragraphService.createParagraph(req.body);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateParagraph(@Req() req, @Param('id') id: string) {
        return this.paragraphService.updateParagraph(+id, req.body);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteParagraph(@Param('id') id: string) {
        return this.paragraphService.deleteParagraph(+id);
    }
}
