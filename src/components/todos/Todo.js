import { useCallback, useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import cancelImage from "../../assets/images/cancel.png";
import editImage from "../../assets/images/edit.png";
import { useDeleteTodoMutation, useEditTodoMutation } from "../../features/api/apiSlice";
import { addToCompleted, addToIncompleted } from "../../features/filter/filterSlice";
import Toastify from '../../utils/Toastify';

export default function Todo({ todo }) {
    const dispatch = useDispatch();
    const { text, id, completed, color } = todo;
    
    const [editTodo, { data: editedData, isLoading, isSuccess, isError }] = useEditTodoMutation();
    const [deleteTodo, { isLoading: isDeleteLoading, isSuccess:isDeleteSuccess, isError: isDeleteError }] = useDeleteTodoMutation();
    
    const [input, setInput] = useState();
    const [isEdit, setIsEdit] = useState(false);
    
    const statusChangeHendler = () => {
        editTodo({
            id,
            data:{completed:!completed}
        })
    };
    
    const colorChangeHendler = (colorName) => {
        editTodo({
            id,
            data:{color:colorName}
        })
    };
    
    const editDataHandler = () => {setIsEdit(!isEdit)};

    const editSubmitHandler = (e) => {
        e.preventDefault();
        editTodo({
            id,
            data:{text:input}
        })
        setIsEdit(false);
    };

    const handleDelete = () => {if (id) deleteTodo(id)};

    // Success or Error Message
    const toastify = useCallback(
        () => {
            if(!isLoading && !isError && isSuccess) {
                Toastify.updateNotify('Todo was updated successfully');
                editedData.completed ? dispatch(addToCompleted()) : dispatch(addToIncompleted())
            };
            if(!isLoading && isError) Toastify.errorNotify('There was an error updating todo!'); 
        
            if(!isDeleteLoading && !isDeleteError && isDeleteSuccess) Toastify.successNotify('Todo was deleted successfully');
            if(!isDeleteLoading && isDeleteError) Toastify.errorNotify('There was an error deleting todo!');
        },
        [isLoading, isError, isSuccess, isDeleteLoading, isDeleteError, isDeleteSuccess, dispatch, editedData],
    )
    
    useEffect(() => {
        toastify();
    }, [toastify])

    return (
        <>
            <div className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0">
                <div
                    className={`relative rounded-full bg-white border-2 border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 ${
                        completed &&
                        "border-green-500 focus-within:border-green-500"
                    }`}
                >
                    <input
                        type="checkbox"
                        checked={completed}
                        onChange={() => statusChangeHendler(id)}
                        className="opacity-0 absolute rounded-full cursor-pointer"
                    />
                    {completed && (
                        <svg
                            className="fill-current w-3 h-3 text-green-500 pointer-events-none"
                            viewBox="0 0 20 20"
                        >
                            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                        </svg>
                    )}
                </div>

                {isEdit ? (
                    <div className="select-none flex-1">
                        <form className="flex items-center bg-gray-100 rounded-md" onSubmit={editSubmitHandler} >
                            <input type="text"  className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                                invalid:border-pink-500 invalid:text-pink-600
                                focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                                "
                                defaultValue={text}
                                onChange={(e)=>setInput(e.target.value)}
                            />
                            <button disabled={isLoading} type="submit"></button>
                        </form>
                    </div>
                ) : (
                    <div className={`select-none flex-1`} >
                        {text}
                    </div>
                )}

                <img
                    src={editImage}
                    className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
                    alt="Edit"
                    onClick={() => editDataHandler(id)}
                />

                <div
                    className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-green-500 border-green-500 ${
                        color === "green" && "bg-green-500"
                    }`}
                    onClick={() => colorChangeHendler("green")}
                ></div>

                <div
                    className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-yellow-500 border-yellow-500 ${
                        color === "yellow" && "bg-yellow-500"
                    }`}
                    onClick={() => colorChangeHendler("yellow")}
                ></div>

                <div
                    className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-red-500 border-red-500 ${
                        color === "red" && "bg-red-500"
                    }`}
                    onClick={() => colorChangeHendler("red")}
                ></div>

                <img
                    src={cancelImage}
                    className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
                    alt="Cancel"
                    onClick={() => handleDelete()}
                />
            </div>
        </>
    );
}
