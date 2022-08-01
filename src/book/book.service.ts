import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Book } from 'src/types/types';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}

  async getBooks() {
    this.prisma.book.findMany()
  }

  async getBook(id: number) {
    this.prisma.book.findUnique({
      where: {
        id
      }
    })
  }

  async createBook({ title, fileName }: Book) {
    return this.prisma.book.create({
      data: {
        title,
        fileName
      }
    })
  }

  async updateBook(id: number, { title, fileName }: Book) {
    return this.prisma.book.update({
      where: {
        id
      },
      data: {
        title,
        fileName
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
