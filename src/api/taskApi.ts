export type Task = {
    id: number;
    title: string;
    done: boolean;
    createdAt: string;
}

let tasksDb: Task[] = [
    {
        id: 1,
        title: "Estudar React",
        done: false,
        createdAt: new Date().toISOString(),
    },
    {
        id: 2,
        title: "Criar projeto de exemplo",
        done: false,
        createdAt: new Date().toISOString(),
    }
];

let tasksPromise: Promise<Task[]> | null = null;

//Simular chamada a API com delay
function fetchTasksFromServer(): Promise<Task[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([...tasksDb].sort((a, b) => a.id - b.id));
            }, 800)
        })
    }

//Promise cacheada para ser usada com `use(...)`
export function getTasksPromise(): Promise<Task[]> {
    if (!tasksPromise) {
        tasksPromise = fetchTasksFromServer();
    }
    return tasksPromise
}

//Simula criação de tarefas no "servidor"
export async function createTask(title: string): Promise<Task> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            //Somente para ter uma caso de erro
            if (title.toLowerCase().includes("erro")) {
                reject(new Error('O Título não pode conter a palavra "ERRO".'))
                return;
            }

            const newTask: Task = {
                id: Date.now(),
                title,
                done: false,
                createdAt: new Date().toISOString(),
            }

            tasksDb = [newTask, ...tasksDb]
            //Atualiza a promise cacheada
            tasksPromise = Promise.resolve(tasksDb)

            resolve(newTask)
        }, 1200)
    })
}