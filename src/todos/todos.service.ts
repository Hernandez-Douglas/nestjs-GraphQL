import { Injectable, NotFoundException } from '@nestjs/common';
import { StatusArgs } from './dto/args/status.args';
import { UpdateTodoInput, CreateTodoInput } from './dto/inputs';
import { Todo } from './entity/todo.entity';

@Injectable()
export class TodosService {

  private todos: Todo[] = [
    { id: 1, description: 'Priedra del Alma', done: false },
    { id: 2, description: 'Priedra del Poder', done: false },
    { id: 3, description: 'Priedra del Espacio', done: true },
    { id: 4, description: 'Priedra del Espacio', done: false },
    { id: 5, description: 'Priedra del Espacio', done: false },
  ];

  findAll(statusArgs: StatusArgs): Todo[] {
    if (statusArgs) {
      const { status } = statusArgs
      return this.todos.filter( todo => todo.done === status )
    }
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) throw new NotFoundException(`Not found TODO with id: ${id}`);
    return todo;
  }

  create(createTodoInput: CreateTodoInput): Todo {
    const todo = new Todo()
    todo.description = createTodoInput.description
    todo.id = Math.max( ...this.todos.map( todo => todo.id ), 0 ) + 1
    todo.done = false

    this.todos.push(todo)
    return todo
  }

  update(updateTodoInput: UpdateTodoInput): Todo {
    const { id, description, done } = updateTodoInput

    const todoToUpdate = this.findOne( id )
    if (description) todoToUpdate.description = description
    if (done !== undefined) todoToUpdate.done = done

    return todoToUpdate
  }

  delete(id: number): Boolean {
    const todoToDelete = this.findOne(id)

    this.todos = this.todos.filter( todo => todo.id !== id )
    return true
  }

  get totalTodo(): number {
    return this.todos.length
  }

  get doneTodo(): number {
    return this.todos.filter(todo => todo.done === true).length
  }

  get pendingTodo(): number {
    return this.todos.filter(todo => todo.done === false).length
  }
}
