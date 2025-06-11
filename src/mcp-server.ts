// src/mcp-server.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { TodoItemsService } from "./todo-items/todo-items.service";
import { TodoItem } from "./entities/todo-item.entity";

const server = new McpServer({
  name: "todo-server",
  version: "1.0.0",
  capabilities: {
    tools: {},
    resources: {},
  },
});

const todoItemsService = new TodoItemsService();

server.tool(
  "create-todo-item",
  "Crear una nueva tarea en una lista",
  {
    listId: z.number().describe("El ID de la lista a la que se agregará la tarea"),
    description: z.string().describe("La descripción de la tarea"),
  },
  async ({ listId, description }) => {
    const item: TodoItem = todoItemsService.create(listId, description);
    return {
      content: [
        {
          type: "text",
          text: `Tarea creada con ID ${item.id} en la lista ${item.listId}: ${item.description}`,
        },
      ],
    };
  }
);

server.tool(
  "complete-todo-item",
  "Marcar una tarea como completada",
  {
    id: z.number().describe("ID de la tarea a completar"),
  },
  async ({ id }) => {
    const item = todoItemsService.complete(id);
    if (!item) {
      return {
        content: [{ type: "text", text: `No se encontro la tarea con ID ${id}.` }],
      };
    }
    return {
      content: [{ type: "text", text: `La tarea '${item.description}' fue marcada como completada.` }],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP server running via stdio");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

