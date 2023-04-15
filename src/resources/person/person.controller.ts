import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Header,
    Param,
    Post,
    Put,
    Query,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { PersonService } from './person.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Person } from 'src/types/types';
import * as path from 'path';

@Controller('api/persons')
export class PersonController {
    constructor(private readonly personService: PersonService) {}

    @Get()
    @Header('Access-Control-Expose-Headers', 'Content-Range')
    @Header('Content-Range', 'bytes : 0-9/*')
    getPersons(@Query() query) {
        return this.personService.getPersons(+query.limit);
    }

    @Get(':id')
    getPerson(@Param('id') id: string) {
        return this.personService.getPerson(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(
        FileInterceptor('image', {
            limits: { fileSize: 1000000 * 50 },
            storage: diskStorage({
                destination: './public/images/persons/',
                filename: (req, file, callback) =>
                    callback(
                        null,
                        Date.now() + path.extname(file.originalname),
                    ),
            }),
        }),
    )
    createPerson(
        @UploadedFile() file: Express.Multer.File,
        @Body() person: Person,
    ) {
        return this.personService
            .createPerson({
                ...person,
                image:
                    process.env.BASE_URL + '/images/persons/' + file.filename,
            })
            .catch((error) => new BadRequestException(error.message));
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    updatePerson(@Req() req, @Param('id') id: string) {
        return this.personService
            .updatePerson(+id, req.body)
            .catch((error) => new BadRequestException(error.message));
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deletePerson(@Param('id') id: string) {
        return this.personService.deletePerson(+id);
    }
}
