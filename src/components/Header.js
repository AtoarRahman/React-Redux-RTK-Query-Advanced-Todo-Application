import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import tickImage from "../assets/images/double-tick.png";
import { useEditTodoMutation, useGetTodosQuery } from '../features/api/apiSlice';
import { todoCompleted } from '../features/filter/filterSlice';
import Toastify from '../utils/Toastify';
import Form from "./todos/Form";

export default function Header() {
    const {data: todos} = useGetTodosQuery();
    const [editTodo, { isLoading, isError, isSuccess }] = useEditTodoMutation();
    
    const dispatch = useDispatch();
    const { incompleted } = useSelector((state) => state.filter);

    const completeHendler = () => {
        todos.map((item)=>{
            return !item.completed && editTodo({
                id: item.id,
                data:{completed:true}
            })
        }); 
    };

    // Success or Error Message
    const toastify = useCallback(
        () => {
            if(!isLoading && !isError && isSuccess) {
                Toastify.successNotify('All todos was updated successfully');
                dispatch(todoCompleted());
            };
            if(!isLoading && isError) Toastify.errorNotify('There was an error updating todo!'); 
        },
        [isLoading, isError, isSuccess, dispatch],
    )
    
    useEffect(() => {
        toastify();
    }, [toastify])

    return (
        <div>
            <Form/>
            {incompleted && 
                <ul className="flex justify-between my-4 text-xs text-gray-500">
                    <li className="flex space-x-1" ><b>All incompleted todo list :-</b></li>
                    <li
                        className="flex space-x-1 cursor-pointer text-blue-500"
                        onClick={completeHendler}
                    >
                        <img className="w-4 h-4" src={tickImage} alt="Complete" />
                        <span>All Move to Completed List</span>
                    </li>
                </ul>
            }
        </div>
    );
}
