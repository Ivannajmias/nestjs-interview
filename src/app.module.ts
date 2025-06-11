import { Module } from '@nestjs/common';
import { TodoListsModule } from './todo_lists/todo_lists.module';
import { TodoItemsModule } from './todo-items/todo-items.module';

@Module({
  imports: [TodoListsModule, TodoItemsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
