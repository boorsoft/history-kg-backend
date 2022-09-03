import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Book } from 'src/types/types';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}

  async getBooks(limit?: number) {
    return this.prisma.book.findMany(limit && {take: limit})
  }

  async getBook(id: number) {
    return this.prisma.book.findUnique({
      where: {
        id
      }
    })
  }

  async createBook({ title, fileName, author, city, year, subjectId }: Book) {
    return this.prisma.book.create({
      data: {
        title,
        fileName,
        author,
        city,
        year,
        subjectId
      }
    })
  }

  async updateBook(id: number, { title, fileName, author, city, year, subjectId }: Book) {
    return this.prisma.book.update({
      where: {
        id
      },
      data: {
        title,
        fileName,
        author,
        city,
        year,
        subjectId
      }
    })
  }

  async deleteBook(id:number) {
    return this.prisma.book.delete({
      where: {
        id
      }
    })
  }
}
