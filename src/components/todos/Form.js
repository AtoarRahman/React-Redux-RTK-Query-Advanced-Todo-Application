import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import noteImage from "../../assets/images/notes.png";
import plusImage from "../../assets/images/plus.png";
import { useAddTodoMutation } from "../../features/api/apiSlice";
import { allTodos } from '../../features/filter/filterSlice';
import Toastify from '../../utils/Toastify';

export default function Form() {
    const [addTodo, { isLoading, isSuccess, isError }] = useAddTodoMutation();
    const [input, setInput] = useState("");

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        addTodo({text:input});
        setInput("");
        dispatch(allTodos())
    };

    // Success or Error Message
    const toastify = useCallback(
      () => {
        if(!isLoading && !isError && isSuccess) Toastify.saveNotify('Todo was added successfully');
        if(!isLoading && isError) Toastify.errorNotify('There was an error adding todo!');
      },
      [isLoading, isError, isSuccess],
    )
    
    useEffect(() => {
        toastify();
    }, [toastify])
    
    return (
        <form onSubmit={submitHandler} className="flex items-center bg-gray-100 px-4 py-4 rounded-md" >
            <img src={noteImage} className="w-6 h-6" alt="Add todo" />
            <input
                type="text"
                placeholder="Type your todo"
                className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
                value={input}
                onChange={(e)=>setInput(e.target.value)}
            />
            <button
                disabled={isLoading}
                type="submit"
                className={`appearance-none w-8 h-8 bg-[url('${plusImage}')] bg-no-repeat bg-contain`}
            ></button>
        </form>
    )
}
