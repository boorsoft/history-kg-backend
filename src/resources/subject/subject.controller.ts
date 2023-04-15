import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Header,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common';
import { Subject } from '@prisma/client';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { SubjectService } from './subject.service';
import { Subject as ISubject } from 'src/types/types';

@Controller('api/subjects')
export class SubjectController {
    constructor(private readonly subjectService: SubjectService) {}

    @Header('Access-Control-Expose-Headers', 'Content-Range')
    @Header('Content-Range', 'bytes : 0-9/*')
    @Get()
    getSubjects(): Promise<Subject[]> {
        return this.subjectService.getSubjects();
    }

    @Get(':id')
    getSubject(@Param('id') id: string): Promise<Subject> {
        return this.subjectService.getSubject(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createSubject(@Body() { title }: ISubject) {
        return this.subjectService
            .createSubject({ title })
            .catch((error) => new BadRequestException(error.message));
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteSubject(@Param('id') id: string) {
        return this.subjectService
            .deleteSubject(+id)
            .catch((error) => new BadRequestException(error.message));
    }
}
