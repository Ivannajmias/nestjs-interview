import { Test, TestingModule } from '@nestjs/testing';
import { TodoItemsController } from './todo-items.controller';

describe('TodoItemsController', () => {
  let controller: TodoItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoItemsController],
    }).compile();

    controller = module.get<TodoItemsController>(TodoItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
