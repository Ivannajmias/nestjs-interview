import { Controller, Post, Body, Param, Put, Patch, Delete } from '@nestjs/common';
import { TodoItemsService } from './todo-items.service';

@Controller('api/todoitems')
export class TodoItemsController {
  constructor(private readonly todoItemsService: TodoItemsService) {}

  @Post(':listId')
  create(@Param('listId') listId: string, @Body('description') description: string) {
    return this.todoItemsService.create(Number(listId), description);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body('description') description: string) {
    return this.todoItemsService.update(Number(id), description);
  }

  @Patch(':id/complete')
  complete(@Param('id') id: string) {
    return this.todoItemsService.complete(Number(id));
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.todoItemsService.delete(Number(id));
  }
}
