import React, { useRef, useState } from 'react'
interface ITask {
  name: string
  done: boolean
}
type FormElement = React.FormEvent<HTMLFormElement>

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>('')
  const [taskList, setTaskList] = useState<ITask[]>([])

  const taskInput = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: FormElement) => {
    e.preventDefault()
    addTask(newTask)
    setNewTask('')
    taskInput.current?.focus()
  }

  const toggleDoneTask = (i: number) => {
    const newTask: ITask[] = [...taskList]
    newTask[i].done = !newTask[i].done
    setTaskList(newTask)
  }

  const removeTask = (i: number) => {
    const newTask: ITask[] = [...taskList]
    newTask.splice(i, 1)
    setTaskList(newTask)
  }

  const addTask = (name: string) => {
    const newTasks: ITask[] = [...taskList, { name, done: false }]
    setTaskList(newTasks)
  }
  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6  offset-md-3">
          <div className="card card-body">
            <form onSubmit={handleSubmit}>
              <input
                autoFocus
                className="form-control"
                value={newTask}
                type="text"
                onChange={(e) => setNewTask(e.target.value)}
                ref={taskInput}
              />
              <button className="btn btn-success w-100 mt-2">Save </button>
            </form>
          </div>
          {taskList.map((task: ITask, i: number) => (
            <div key={i} className="card card-body mt-2">
              <h2 style={{ textDecoration: task.done ? 'line-through' : '' }}>
                {task.name}
              </h2>
              <div>
                <button
                  className="btn btn-secondary"
                  onClick={() => toggleDoneTask(i)}
                >
                  {task.done ? '✘' : '✓'}
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => removeTask(i)}
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
