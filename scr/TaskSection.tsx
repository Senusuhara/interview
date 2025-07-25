import {FC, useEffect} from "react";
import './TaskSection.css'
import {TaskDataModel, TaskStatus} from "./TaskManagerParent";

interface TaskSectionProps {
    title?: string,
    taskDetails?: TaskDataModel[],
    onUpdateStatus: (taskId: number, newStatus: TaskStatus) => void,
    removeAddButton: (taskId: number) => void,
    onAddTag: (taskId: number, tagValue: string) => void,
    removeTag: (taskId: number, tagId: number) => void
}

const TaskSection: FC<TaskSectionProps> = ({title, taskDetails,removeAddButton, onUpdateStatus,onAddTag,removeTag}) => {
    useEffect(() => {
        console.log('taskDetails', taskDetails)
    }, []);

    const getTaskOptions = (taskStatus: string) => {
        switch (taskStatus) {
            case TaskStatus.Todo:
                return ['Todo', 'Ongoing'];
            case TaskStatus.Ongoing:
                return ['Ongoing', 'Completed'];
            case TaskStatus.Completed:
                return ['Completed']
            default:
                return []
        }
    }

    const handleTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, id: number) => {
        const inputValue = e.currentTarget;
        if (e.key === 'Enter') {
            const tagName = inputValue.value;
            if (tagName) {
                onAddTag(id, tagName)
                inputValue.value = ''
            }

        }
    }

    return (
        <div className={'section'}>
            <h3>{title}</h3>
            { taskDetails && taskDetails.map((item)=> (
                <div style={{border: '1px solid #ddd', margin: 2, padding: 5}}>
                    <div style={{display: 'flex', placeContent: 'space-between'}}>
                        <div>{item.name}</div>
                        <button
                            style={{background: 'none', color: 'black', border: 'none', padding: 5}}
                            onClick={() => removeAddButton(item.id)}
                        >x
                        </button>
                    </div>
                    <select
                        value={item.status}
                        disabled={item.status === 'Completed'}
                        style={{width: 180}}
                        onChange={(e) => onUpdateStatus(item.id, e.target.value as TaskStatus)}
                    >
                        {getTaskOptions(item.status).map((status) => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                    <div>
                        {item.tag.length < 3 && (
                            <input
                                style={{padding: 2, marginTop: 10}}
                                type={'text'}
                                placeholder={"Add tags"}
                                onKeyPress={(e) => handleTagKeyPress(e, item.id)}
                            />
                        )}
                        <div style={{display: 'flex', padding: 4}}>
                            {item.tag.map((tag, index) => (
                                <div style={{
                                    padding: 4,
                                    display: 'flex',
                                    marginRight: 5,
                                    justifyContent: 'space-between',
                                    border: '1px solid #ddd',
                                    borderRadius: '16px',
                                    width: '50px'
                                }}>
                                    <div style={{fontSize: '12px'}}>{tag}</div>
                                    <button style={{
                                        background: 'none',
                                        color: 'black',
                                        border: 'none',
                                        padding: 0
                                    }}
                                            onClick={() => removeTag(item.id, index)}>x
                                    </button>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))
            }


        </div>
    )

}

export default TaskSection;