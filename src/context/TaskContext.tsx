import {getTasksPromise, type Task} from "../api/taskApi.ts";
import {createContext, type ReactNode, use, useState} from "react";

type TasksContextValue = {
    tasks: Task[];
    addTask(task: Task): void;
}

const TasksContext = createContext<TasksContextValue | null>(null);

type TasksProviderProps = {
    children: ReactNode;
}

export function TasksProvider({ children }: TasksProviderProps) {
    // `use` suspende até a Promisse de tarefas resolver
    const initialTasks = use(getTasksPromise())

    const [tasks, setTasks] = useState<Task[]>(initialTasks)

    function addTask(task: Task) {
        setTasks((prev) => [...prev, task])
    }

    // React 19 permite usar <TasksContext> como provider
    return (
        <TasksContext value={{tasks, addTask}}>
            {children}
        </TasksContext>
    )
}

export default TasksContext