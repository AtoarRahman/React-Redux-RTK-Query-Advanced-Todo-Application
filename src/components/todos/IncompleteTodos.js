import { useSelector } from "react-redux";
import { useGetTodosQuery } from '../../features/api/apiSlice';
import Error from "../ui/Error";
import TodoLoader from "../ui/loaders/TodoLoader";
import Todo from "./Todo";

export default function IncompleteTodos() {
    const {data: todos, isLoading, isError} = useGetTodosQuery()
    const { incompleted, color } = useSelector((state) => state.filter);

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

    if (!isLoading && !isError && todos?.length === 0 && !incompleted) {
        content = <Error message="No todos found!" />;
    }

    if (!isLoading && !isError && todos?.length > 0 && incompleted) {
        if(color){
            content = todos.map((todo) => !todo.completed && todo.color === color && <Todo todo={todo} key={todo.id} />);
        }else{
            content = todos.map((todo) => !todo.completed && <Todo todo={todo} key={todo.id} />);
        }
    }

    return (
        <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
            {content}
        </div>
    );
}
