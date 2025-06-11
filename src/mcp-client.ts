import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function main() {
  console.log("Iniciando cliente MCP...");

  try {
    const transport = new StdioClientTransport({
      command: "node",
      args: ["dist/mcp-server.js"],
    });

    const client = new Client({
      name: "nestjs-todo-client",
      version: "1.0.0",
    }, {
      capabilities: {}
    });

    console.log("Conectando al servidor...");
    await client.connect(transport);
    console.log("Conectado exitosamente");

    const toolsResponse = await client.listTools();
    console.log("Herramientas disponibles:");
    toolsResponse.tools.forEach((tool, index) => {
      console.log(`  ${index + 1}. ${tool.name}: ${tool.description}`);
      if (tool.inputSchema && 'properties' in tool.inputSchema) {
        console.log(`     Parámetros: ${Object.keys(tool.inputSchema.properties).join(', ')}`);
      }
    });

    const hasCreateList = toolsResponse.tools.some(tool => tool.name.includes('create') && tool.name.includes('list'));
    if (hasCreateList) {
      console.log("Creando lista de prueba...");
      try {
        const createListResult = await client.callTool({
          name: "create-todo-list",
          arguments: {
            name: "Lista de prueba MCP",
            description: "Lista creada desde el cliente MCP"
          }
        });
        console.log("Lista creada:", JSON.stringify(createListResult.content, null, 2));
      } catch (error) {
        console.log("No se pudo crear la lista (quizás no existe la herramienta)");
      }
    }

    console.log("Creando todo item...");
    const createResult = await client.callTool({
      name: "create-todo-item",
      arguments: {
        listId: 1,
        title: "Tarea de prueba desde cliente MCP",
        description: "Esta es una tarea creada desde el cliente MCP para probar la conexión",
        completed: false
      }
    });
    console.log("Resultado de crear todo item:", JSON.stringify(createResult.content, null, 2));

    console.log("Completando todo item...");
    const completeResult = await client.callTool({
      name: "complete-todo-item",
      arguments: {
        id: 1
      }
    });
    console.log("Resultado de completar todo item:", JSON.stringify(completeResult.content, null, 2));

    console.log("Creando segundo todo item...");
    const createResult2 = await client.callTool({
      name: "create-todo-item",
      arguments: {
        listId: 1,
        description: "Segunda tarea de prueba - esta quedará pendiente"
      }
    });
    console.log("Segundo item creado:", JSON.stringify(createResult2.content, null, 2));

    console.log("Pruebas completadas correctamente");

    await client.close();

  } catch (error) {
    console.error("Error en el cliente MCP:", error);
    process.exit(1);
  }
}

process.on('SIGINT', () => {
  console.log('Deteniendo cliente MCP...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Deteniendo cliente MCP...');
  process.exit(0);
});

if (require.main === module) {
  main().catch(console.error);
}

export { main };
