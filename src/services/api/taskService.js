import tasksData from '../mockData/tasks.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class TaskService {
  constructor() {
    this.storageKey = 'taskflow_tasks'
    this.initializeData()
  }

  initializeData() {
    const existingData = localStorage.getItem(this.storageKey)
    if (!existingData) {
      localStorage.setItem(this.storageKey, JSON.stringify(tasksData))
    }
  }

  getTasks() {
    const data = localStorage.getItem(this.storageKey)
    return data ? JSON.parse(data) : []
  }

  saveTasks(tasks) {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks))
  }

  async getAll() {
    await delay(300)
    const tasks = this.getTasks()
    return [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  async getById(id) {
    await delay(200)
    const tasks = this.getTasks()
    const task = tasks.find(t => t.id === id)
    return task ? { ...task } : null
  }

  async create(taskData) {
    await delay(300)
    const tasks = this.getTasks()
    const newTask = {
      id: Date.now().toString(),
      ...taskData,
      createdAt: new Date().toISOString()
    }
    
    const updatedTasks = [newTask, ...tasks]
    this.saveTasks(updatedTasks)
    return { ...newTask }
  }

  async update(id, updates) {
    await delay(250)
    const tasks = this.getTasks()
    const taskIndex = tasks.findIndex(t => t.id === id)
    
    if (taskIndex === -1) {
      throw new Error('Task not found')
    }

    const updatedTask = {
      ...tasks[taskIndex],
      ...updates
    }

    tasks[taskIndex] = updatedTask
    this.saveTasks(tasks)
    return { ...updatedTask }
  }

  async delete(id) {
    await delay(200)
    const tasks = this.getTasks()
    const filteredTasks = tasks.filter(t => t.id !== id)
    
    if (filteredTasks.length === tasks.length) {
      throw new Error('Task not found')
    }

    this.saveTasks(filteredTasks)
    return true
  }

  async getByStatus(completed) {
    await delay(300)
    const tasks = this.getTasks()
    return tasks.filter(task => task.completed === completed)
  }

  async search(query) {
    await delay(300)
    const tasks = this.getTasks()
    const searchTerm = query.toLowerCase()
    
    return tasks.filter(task => 
      task.title.toLowerCase().includes(searchTerm) ||
      task.description.toLowerCase().includes(searchTerm)
    )
  }
}

export const taskService = new TaskService()