import { Injectable } from '@nestjs/common';
// import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { todo_app } from './entities/todo.entity';
import { CreateTodoParams } from './utils/types';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(todo_app) private todoRepository: Repository<todo_app>,
  ) {}

  create(createTodo: CreateTodoParams) {
    const newTodo = this.todoRepository.create({
      ...createTodo,
    });
    return this.todoRepository.save(newTodo);
  }

  findAll() {
    return this.todoRepository.find();
  }

  findOne(id: number) {
    const options: FindOneOptions<todo_app> = {
      where: { id },
    };
    return this.todoRepository.findOne(options); //#${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return this.todoRepository.update({ id }, { ...updateTodoDto });
  }

  remove(id: number) {
    return this.todoRepository.delete({ id });
  }
}
