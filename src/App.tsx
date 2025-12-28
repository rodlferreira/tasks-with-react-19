// src/App.tsx
import { Suspense } from 'react';
import { NewTaskForm } from './components/NewTaskForm';
import { FocusInputDemo } from './components/FocusInputDemo';
import TaskList from "./components/TaskList.tsx";
import { TasksProvider } from "./context/TaskContext.tsx";

export default function App() {
    return (
        <Suspense fallback={<p style={{ padding: '2rem' }}>A carregar tarefas...</p>}>
            <TasksProvider>
                <main
                    style={{
                        maxWidth: 720,
                        margin: '2rem auto',
                        padding: '0 1rem',
                        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
                    }}
                >
                    <h1>React 19 Task Board</h1>
                    <p style={{ color: '#555', marginBottom: '1rem' }}>
                        Exemplo prático dos novos recursos do React 19:
                        Actions, useActionState, useFormStatus, useOptimistic, use,
                        Context como &lt;Context&gt; e ref como prop.
                    </p>

                    <NewTaskForm />
                    <TaskList />
                    <hr style={{ margin: '2rem 0' }} />
                    <FocusInputDemo />
                </main>
            </TasksProvider>
        </Suspense>
    );
}
