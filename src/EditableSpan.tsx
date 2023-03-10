import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    value: string
    onChange: (newTitle: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {

    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState(props.value)

    const activateEditeMode = () => {
        setEditMode(true)
        setTitle(props.value)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    return editMode
        ? <input value={title}
                 onChange={onChangeHandler}
                 onBlur={activateViewMode}
                 autoFocus/>
        : <span onDoubleClick={activateEditeMode}>{props.value}</span>

}