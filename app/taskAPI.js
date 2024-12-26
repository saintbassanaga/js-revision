export const api = {
    saveTasks: async (tasks) => {
        return new Promise(resolve => {
            setTimeout(() => {
                localStorage.setItem('tasks', JSON.stringify(tasks));
                resolve('Tasks saved');
            }, 500);
        });
    },

    loadTasks: async () => {
        return new Promise(resolve => {
            setTimeout(() => {
                const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
                resolve(tasks);
            }, 500);
        });
    }
};
