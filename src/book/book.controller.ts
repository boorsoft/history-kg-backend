import {
    Body,
    Controller,
    Delete,
    Get,
    Header,
    Param,
    Post,
    Put,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Book } from 'src/types/types';
import { resourceLimits } from 'worker_threads';
import { BookService } from './book.service';

@Controller('api/books')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @Get()
    @Header('Access-Control-Expose-Headers', 'Content-Range')
    @Header('Content-Range', 'bytes : 0-9/*')
    getBooks(): Promise<Book[]> {
        return this.bookService.getBooks();
    }

    @Get(':id')
    getBook(@Param('id') id: string) {
        return this.bookService.getBook(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(
        FileInterceptor('file', {
            limits: { fileSize: 1000000 * 200 },
            storage: diskStorage({
                destination: './public/books/',
                filename: (req, file, callback) =>
                    callback(null, file.originalname),
            }),
        }),
    )
    createBook(@UploadedFile() file: Express.Multer.File, @Body() book: Book) {
        return this.bookService.createBook({
            ...book,
            year: +book.year,
            subjectId: +book.subjectId,
            fileName: file.filename,
        });
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    updateBook(@Param('id') id: string, @Body() book: Book) {
        return this.bookService.updateBook(+id, book);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteBook(@Param('id') id: string) {
        return this.bookService.deleteBook(+id);
    }
}
