import { Controller, Get, Header, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
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

    @UseGuards(JwtAuthGuard)
    @Post()
    createPerson(@Req() req) {
        return this.personService.createPerson(req.body)
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    updatePerson(@Req() req, @Param('id') id: string) {
        return this.personService.updatePerson(+id, req.body);
    }
}
