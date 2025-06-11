import { Injectable } from '@nestjs/common';
import { TodoItem } from '../entities/todo-item.entity';



@Injectable()
export class TodoItemsService {
  private items: TodoItem[] = [];
  private idCounter = 1;

  create(listId: number, description: string): TodoItem {
    const newItem: TodoItem = {
      id: this.idCounter++,
      listId,
      description,
      completed: false,
    };
    this.items.push(newItem);
    return newItem;
  }

  update(id: number, description: string): TodoItem | undefined {
    const item = this.items.find(i => i.id === id);
    if (item) item.description = description;
    return item;
  }

  complete(id: number): TodoItem | undefined {
    const item = this.items.find(i => i.id === id);
    if (item) item.completed = true;
    return item;
  }

  delete(id: number): boolean {
    const index = this.items.findIndex(i => i.id === id);
    if (index !== -1) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }
}
