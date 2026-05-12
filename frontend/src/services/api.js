// api.js
const API_BASE_URL = 'http://127.0.0.1:8000'  // Стандартный порт FastAPI. Уточните у подруги, если другой.

// Универсальная функция для запросов
async function request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        },
        ...options
    });
    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Ошибка запроса');
    }
    return response.json();
}

// API методы
export const api = {
    // Проверка доступности бэкенда (GET /)
    getStatus() {
        return request('/');
    },

    // Получить список задач (предполагаемый эндпоинт)
    getTasks() {
        return request('/tasks');
    },

    // Создать задачу (POST /tasks)
    createTask(taskData) {
        return request('/tasks', {
            method: 'POST',
            body: JSON.stringify(taskData)
        });
    },

    // Обновить задачу (PUT /tasks/{id})
    updateTask(id, taskData) {
        return request(`/tasks/${id}`, {
            method: 'PUT',
            body: JSON.stringify(taskData)
        });
    },

    // Удалить задачу (DELETE /tasks/{id})
    deleteTask(id) {
        return request(`/tasks/${id}`, {
            method: 'DELETE'
        });
    }
};