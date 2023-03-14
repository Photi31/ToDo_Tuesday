import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div>
        {/*<input value={title}*/}
        {/*       onChange={onChangeHandler}*/}
        {/*       onKeyPress={onKeyPressHandler}*/}
        {/*       className={error ? "error" : ""}*/}
        {/*/>*/}
        <TextField variant='outlined'
                   size='small'
                   margin='normal'
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   // className={error ? "error" : ""}
                   error={!!error}
                   label='Title'
                   helperText={error}
        />
        {/*<button onClick={addItem}>+</button>*/}
        {/*<Button variant='contained'*/}
        {/*        color='primary'*/}
        {/*        onClick={addItem}*/}
        {/*        style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}>+</Button>*/}
        <IconButton
                color='primary' style={{marginTop: '15px'}}
                onClick={addItem}>
            <AddBox />
        </IconButton>
        {/*{error && <div className="error-message">{error}</div>}*/}
    </div>
}
