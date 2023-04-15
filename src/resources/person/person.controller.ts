import {
    BadRequestException,
    Controller,
    Delete,
    Get,
    Header,
    Param,
    Post,
    Put,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { PersonService } from './person.service';

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
    createPerson(@Req() req) {
        return this.personService
            .createPerson(req.body)
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
