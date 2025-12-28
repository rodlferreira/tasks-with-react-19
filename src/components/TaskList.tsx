import TasksContext from "../context/TaskContext.tsx";
import {use} from "react";

export default function TaskList() {

    const ctx = use(TasksContext)

    if (!ctx) {
        throw new Error("TaskList deve ser usado dentro do <TaskProvider>.")
    }

    const { tasks } = ctx

    if (!tasks.length) {
        return <p>Nenhuma tarefa ainda. Adicione a primeira! 😊</p>
    }

    return (
        <section style={{ marginTop: '2rem' }}>
            <h2>Tarefas</h2>
            <ul style={{ paddingLeft: '1.2rem' }}>
                {tasks.map((task) => (
                    <li key={task.id} style={{ marginBottom: '0.5rem' }}>
                        <strong>{task.title}</strong>{""}
                        <small>
                            ({new Date(task.createdAt).toLocaleDateString()})
                        </small>
                    </li>
                ))}
            </ul>
        </section>
    )
}