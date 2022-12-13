import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TodosService } from './todos.service';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput, UpdateTodoInput, StatusArgs } from './dto';
import { AggregationsType } from './types/aggregations.type';

@Resolver( () => Todo)
export class TodosResolver {
  constructor(private readonly todoService: TodosService) {}

  @Query(() => [Todo], { name: 'todos' })
  findAll(@Args() status: StatusArgs): Todo[] {
    return this.todoService.findAll( status );
  }

  @Query(() => Todo, { name: 'todo' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.findOne(id);
  }

  @Mutation( () => Todo, { name: 'createTodo'})
  createTodo( @Args('createTodoInput') createTodoInput: CreateTodoInput ) {
    return this.todoService.create( createTodoInput );
  }

  @Mutation( () => Todo, { name: 'updateTodo' })
  updateTodo( @Args('updateTodo') updateTodoInput: UpdateTodoInput) {
    return this.todoService.update( updateTodoInput );
  }

  @Mutation( () => Boolean, { name: 'deleteTodo'})
  delete( @Args('id', { type: () => Int }) id: number ) {
    return this.todoService.delete( id )
  }

  @Query( () => Int, { name: 'totalTodo'})
  totalTodo(): number {
    return this.todoService.totalTodo
  }

  @Query( () => Int, { name: 'doneTodo'})
  doneTodo(): number {
    return this.todoService.doneTodo
  }

  @Query( () => Int, { name: 'pendingTodo'})
  pendingTodo(): number {
    return this.todoService.pendingTodo
  }

  @Query( () => AggregationsType )
  aggregations(): AggregationsType {
    return {
      completed: this.todoService.doneTodo,
      pending: this.todoService.pendingTodo,
      total: this.todoService.totalTodo,
      totalTodosCompleted: this.todoService.totalTodo

    }
  }

}
