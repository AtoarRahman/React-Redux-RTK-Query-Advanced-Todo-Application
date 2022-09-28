import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import minusImage from '../../assets/images/minus.png';
import { useEditTodoMutation, useGetTodosQuery } from '../../features/api/apiSlice';
import { todoIncompleted } from '../../features/filter/filterSlice';
import Toastify from '../../utils/Toastify';
import Error from "../ui/Error";
import TodoLoader from "../ui/loaders/TodoLoader";
import Todo from "./Todo";

export default function Todos() {
    const {data: todos, isLoading, isError} = useGetTodosQuery();
    const [editTodo, { isLoading: editLoading, isSuccess: editSuccess, isError: editError }] = useEditTodoMutation();
    
    const dispatch = useDispatch();
    const { completed, color } = useSelector((state) => state.filter);

    // decide what to render
    let content = null;
    if (isLoading) {
        content = (
            <>
                <TodoLoader />
                <TodoLoader />
                <TodoLoader />
                <TodoLoader />
                <TodoLoader />
            </>
        );
    }

    if (!isLoading && isError) {
        content = <Error message="There was an error" />;
    }

    if (!isLoading && !isError && todos?.length === 0 && !completed) {
        content = <Error message="No todos found!" />;
    }

    if (!isLoading && !isError && todos?.length > 0 && completed) {
        if(color){
            content = todos.map((todo) => todo.completed && todo.color === color && <Todo todo={todo} key={todo.id} />);
        }else{
            content = todos.map((todo) => todo.completed && <Todo todo={todo} key={todo.id} />);
        }
    }

    const clearCompleteHendler = () => {
        todos.map((item)=>{
            return item.completed && editTodo({
                id: item.id,
                data:{completed:false}
            })
        }); 
    };

    // Success or Error Message
    const toastify = useCallback(
        () => {
            if(!editLoading && !editError && editSuccess) {
                Toastify.successNotify('All todos was updated successfully');
                dispatch(todoIncompleted())
            };
            if(!editLoading && editError) Toastify.errorNotify('There was an error updating todo!'); 
        },
        [editLoading, editError, editSuccess, dispatch],
    )
    
    useEffect(() => {
        toastify();
    }, [toastify])

    return (
        <>
            <ul className="flex justify-between my-4 text-xs text-gray-500">
                <li className="flex space-x-1" ><b>All completed todo list :-</b></li>
                <li className="flex space-x-1 cursor-pointer text-blue-500" onClick={clearCompleteHendler}>
                    <img className="w-4 h-4" src={minusImage} alt="Incomplete" />
                    <span>All Move to Incompleted List</span>
                </li>
            </ul>
            <hr className="mt-4" />
            <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
                {content}
            </div>
        </>
    );
}
