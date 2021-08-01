import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  private readonly select: Prisma.UserSelect = {
    id: true,
    username: true,
    email: true,
    createdAt: true,
    updatedAt: true,
  };

  constructor(private readonly prismaService: PrismaService) {}

  create(createUserDto: Prisma.UserCreateInput) {
    return this.prismaService.user.create({
      data: createUserDto,
      select: this.select,
    });
  }

  findAll() {
    return this.prismaService.user.findMany({
      select: this.select,
    });
  }

  findOne(where: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findUnique({
      where,
      select: this.select,
    });
  }

  update(params: {
    data: Prisma.UserUpdateInput;
    where: Prisma.UserWhereUniqueInput;
  }) {
    const { data, where } = params;

    return this.prismaService.user.update({
      data,
      where,
      select: this.select,
    });
  }

  remove(where: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.delete({
      where,
      select: this.select,
    });
  }
}
