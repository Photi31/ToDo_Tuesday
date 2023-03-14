import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton, List, Typography} from "@mui/material";
import {Delete} from "@mui/icons-material";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title);
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    return <div>
        <Typography variant='h5'
                    fontWeight='bold'>
            <EditableSpan value={props.title}
                          onChange={changeTodolistTitle}/>
            {/*<button onClick={removeTodolist}>x</button>*/}
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </Typography>
        <AddItemForm addItem={addTask}/>
        <List style={{padding: '20px'}}>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id);
                    }


                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        {/*<input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>*/}
                        <Checkbox color='primary'
                                  onChange={onChangeHandler}
                                  checked={t.isDone}
                        />
                        <EditableSpan value={t.title}
                                      onChange={onTitleChangeHandler}
                        />
                        {/*<button onClick={onClickHandler}>x</button>*/}
                        <IconButton onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>
                    </div>
                })
            }
        </List>
        <div>
            {/*<button className={props.filter === 'all' ? "active-filter" : ""}*/}
            {/*        onClick={onAllClickHandler}>All*/}
            {/*</button>*/}
            {/*<button className={props.filter === 'active' ? "active-filter" : ""}*/}
            {/*        onClick={onActiveClickHandler}>Active*/}
            {/*</button>*/}
            {/*<button className={props.filter === 'completed' ? "active-filter" : ""}*/}
            {/*        onClick={onCompletedClickHandler}>Completed*/}
            {/*</button>*/}
            <Button variant={props.filter === 'all' ? 'contained' : 'text'}
                // className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}
                    size='small'
                    color='inherit'
                    style={{margin: '5px'}}>All
            </Button>
            <Button variant={props.filter === 'active' ? 'contained' : 'text'}
                // className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}
                    size='small'
                    color='primary'
                    style={{margin: '5px'}}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'contained' : 'text'}
                // className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}
                    size='small'
                    color='secondary'
                    style={{margin: '5px'}}>Completed
            </Button>
        </div>
    </div>
}


