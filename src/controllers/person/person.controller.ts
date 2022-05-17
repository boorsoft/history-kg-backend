import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { PersonService } from 'src/services/person/person.service';

@Controller('api/person')
export class PersonController {
    constructor(private readonly personService: PersonService) {}

    @Get()
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
