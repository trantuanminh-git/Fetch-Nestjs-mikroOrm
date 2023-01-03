import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';

@Entity({ tableName: 'Users' })
export class User {
  @PrimaryKey()
  @Unique()
  id!: number;

  @Property()
  @Unique()
  email: string;

  @Property()
  password: string;

  constructor(id: number, email: string, password: string) {
    this.id = id;
    this.email = email;
    this.password = password;
  }
}
