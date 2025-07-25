import {FC, useState} from "react";
import './TaskManagerParent.css'
import TaskSection from "./TaskSection";

export interface TaskDataModel {
    id: number,
    name: string,
    status: string,
    tag: string[]
}

export enum TaskStatus {
    Todo ='Todo',
    Ongoing = 'Ongoing' ,
    Completed = 'Completed'
}


const TaskManagerParent:FC = () => {
    const [taskName, setTaskName] = useState<string>('')
    const [tasks, setTasks] = useState<TaskDataModel[]>([])

    const handleAddButton = ()=> {
        console.log('value',taskName)
        const newTask: TaskDataModel = {
            id: Date.now(),
            name: taskName,
            status: TaskStatus.Todo,
            tag: []
        }
        setTasks(prevState => [...prevState,newTask])
        console.log('task',tasks);
        setTaskName('')
    }

    const removeAddButton = (taskId: number) => {
        setTasks(prevState => prevState.filter(item => item.id !== taskId))
    }

    const onUpdateStatus = (taskId: number , newStatus : TaskStatus) => {
        setTasks(prevState => prevState.map((task)=> task.id === taskId ? {...task, status: newStatus} : task))
    }

    const addTag = (taskId: number, tagValue: string): void => {
        if(tagValue){
            setTasks(prevState => prevState.map(task => {
                if(task.id === taskId){
                    return {...task,tag:[...task.tag, tagValue]}
                }
                return task;
            }))
        }
    }

    const removeTag = (taskId: number, tagId: number) => {
        setTasks(prevState => prevState.map(task => {
            if(task.id === taskId) {
                return {...task, tag: task.tag.filter((tag,index)=> index !== tagId)};
            }
            return task;
        }))
    }


    const TodoTask = tasks.filter((task)=>(task.status === 'Todo'))
    const OngoingTasks = tasks.filter(task => task.status === 'Ongoing');
    const CompletedTasks = tasks.filter(task => task.status === 'Completed')
    return (
        <div>
            <h1>Task Manager</h1>
            <div>
                <input
                    value={taskName}
                    onChange={(e) =>setTaskName(e.target.value)}
                    placeholder={'Task Name'}
                />
                <button className={'button-color'} onClick={handleAddButton}> Add
                </button>
            </div>
            <div style={{display:'flex', justifyContent:'center'}}>
                <TaskSection title={'Todo'} taskDetails={TodoTask} onUpdateStatus={onUpdateStatus} removeAddButton={removeAddButton} onAddTag={addTag} removeTag={removeTag}></TaskSection>
                <TaskSection title={'Ongoing'} taskDetails={OngoingTasks} onUpdateStatus={onUpdateStatus} removeAddButton={removeAddButton} onAddTag={addTag} removeTag={removeTag}></TaskSection>
                <TaskSection title={'Completed'} taskDetails={CompletedTasks} onUpdateStatus={onUpdateStatus} removeAddButton={removeAddButton} onAddTag={addTag} removeTag={removeTag}></TaskSection>
            </div>
        </div>
    )

}

export default TaskManagerParent;