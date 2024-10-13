import { createApp, createRouter, eventHandler } from 'h3';

const app = createApp();
const router = createRouter();

app.use(router);

type Todo = {
  id: number;
  name: string;
};

const todos: Todo[] = [];

router.get('/', eventHandler(() => "OK"));

router.get('/todos', eventHandler(() => todos));

router.post('/todos', eventHandler((req) => {
  console.log(req);
}));

router.get('/todos/:id', eventHandler(() => todos));

router.patch('/todos/:id', eventHandler((req) => {
  console.log(req);
}));

router.delete('/todos/:id', eventHandler((req) => {
  console.log(req);
}));

export { app };
