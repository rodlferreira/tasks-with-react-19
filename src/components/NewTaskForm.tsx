import { use, useActionState, useOptimistic } from 'react';
import { useFormStatus } from 'react-dom';
import TasksContext from "../context/TaskContext.tsx";
import {createTask} from "../api/taskApi.ts";

// Botão de design que usa useFormStatus para saber se o form está pendente
function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            style={{
                padding: '0.4rem 0.8rem',
                borderRadius: 4,
                border: '1px solid #444',
                cursor: pending ? 'default' : 'pointer',
            }}
        >
            {pending ? 'A guardar...' : 'Adicionar tarefa'}
        </button>
    );
}

export function NewTaskForm() {
    const ctx = use(TasksContext);
    if (!ctx) {
        throw new Error('NewTaskForm deve ser usado dentro de <TasksProvider>.');
    }

    const { addTask } = ctx;

    // useOptimistic para mostrar o último título enviado de forma otimista
    const [optimisticTitle, addOptimisticTitle] = useOptimistic<string | null, string | null>(
        null,
        (_current, newTitle) => newTitle,
    );

    // useActionState:
    // - estado: string | null => mensagem de erro (ou null se OK)
    // - submitAction: função que será usada pelo <form action={submitAction}>
    // - isPending: indica se a Action está a correr
    const [errorMsg, submitAction, isPending] = useActionState<
        string | null,
        FormData
    >(
        async (_prevState, formData) => {
            const title = formData.get('title')?.toString().trim() ?? '';

            if (!title) {
                return 'O título é obrigatório.';
            }

            // Atualiza preview otimista
            addOptimisticTitle(title);

            try {
                const newTask = await createTask(title);
                // Comita no estado global
                addTask(newTask);
                return null; // Sem erro
            } catch (err) {
                return (err as Error).message ?? 'Erro ao criar tarefa.';
            }
        },
        null,
    );

    return (
        <section
            style={{
                marginTop: '1rem',
                padding: '1rem',
                border: '1px solid #ddd',
                borderRadius: 8,
            }}
        >
            <h2>Nova tarefa (React 19 Actions)</h2>

            <form action={submitAction} style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                    type="text"
                    name="title"
                    placeholder="Ex.: Estudar Actions no React 19"
                    style={{
                        flex: 1,
                        padding: '0.4rem 0.6rem',
                        borderRadius: 4,
                        border: '1px solid #aaa',
                    }}
                />

                <SubmitButton />
            </form>

            {errorMsg && (
                <p style={{ color: 'crimson', marginTop: '0.5rem' }}>
                    {errorMsg}
                </p>
            )}

            {optimisticTitle && (
                <p style={{ marginTop: '0.5rem', fontStyle: 'italic' }}>
                    Pré-visualização otimista:&nbsp;
                    <strong>{optimisticTitle}</strong>
                    {isPending && ' (a guardar...)'}
                </p>
            )}

            <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#555' }}>
                Dica: tente criar uma tarefa com a palavra <code>erro</code> no título
                para ver o tratamento de erro da Action.
            </p>
        </section>
    );
}
