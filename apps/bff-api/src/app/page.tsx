import { auth } from "@/auth";
import { Todo } from "@repo/todos";

import AuthButton from "@/components/AuthButton.server";

import TodoList from "./TodoList";

import { callTodoService } from "@/todo-api";

export default async function Home() {
  const session = await auth();

  const priorities: string[] = await callTodoService("/priorities");

  const todos: Todo[] = session?.user?.id
    ? ((await callTodoService("/todos")) as Todo[])
    : [];

  return (
    <main>
      <AuthButton />
      {session?.user && <TodoList todos={todos} priorities={priorities} />}
    </main>
  );
}
