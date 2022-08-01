import { Body, Controller, Delete, Get, Header, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Book } from 'src/types/types';
import { BookService } from './book.service';

@Controller('api/books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @Header('Access-Control-Expose-Headers', 'Content-Range')
  @Header('Content-Range', 'bytes : 0-9/*')
  getBooks() {
    return this.bookService.getBooks()
  }

  @Get(':id')
  getBook(@Param('id') id: string) {
    return this.bookService.getBook(+id)
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createBook(@Body() book: Book) {
    return this.bookService.createBook(book)
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateBook(@Param('id') id: string, @Body() book: Book) {
    return this.bookService.updateBook(+id, book)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteBook(@Param('id') id: string) {
    return this.bookService.deleteBook(id)
  }
}
