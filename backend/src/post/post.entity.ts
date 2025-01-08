import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Comment } from '../comment/comment.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  detail: string;

  @Column()
  communityType: string;

  @ManyToMany(() => User, (user) => user.posts)
  users: User[];

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
