import { Unique } from '@mikro-orm/core';

export class UserDto {
  @Unique()
  id!: number;
  @Unique()
  email: string;
  password: string;
}
