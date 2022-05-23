import { Controller, Get, Header, Param, Post, Req } from '@nestjs/common';
import { PersonService } from 'src/services/person/person.service';

@Controller('api/persons')
export class PersonController {
    constructor(private readonly personService: PersonService) {}

    @Get()
    @Header('Access-Control-Expose-Headers', 'Content-Range')
    @Header('Content-Range', 'bytes : 0-9/*')
    getPersons() {
        return this.personService.getPersons()
    }

    @Get(':id')
    getPerson(@Param('id') id: string) {
        return this.personService.getPerson(+id)
    }

    @Post()
    createPerson(@Req() req) {
        return this.personService.createPerson(req.body)
    }
}
