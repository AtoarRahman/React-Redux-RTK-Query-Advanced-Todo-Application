import { useState } from "react";
import { useDispatch } from "react-redux";
import { allTodos, todoColorChanged, todoCompleted, todoIncompleted } from '../features/filter/filterSlice';
export default function Footer() {
    const dispatch = useDispatch();

    const [isCompleted, setIsCompleted] = useState('All');
    const [isColor, setIsColor] = useState('');

    const handleAllTodos = () => {
        dispatch(allTodos())
        setIsCompleted('All')
        setIsColor('');
    };

    const handleTodoCompleted = () => {
        dispatch(todoCompleted())
        setIsCompleted('Completed')
    }; 
    
    const handleTodoIncompleted = () => {
        dispatch(todoIncompleted())
        setIsCompleted('Incompleted')
    };

    const handleColorChange = (colorName) => {
        dispatch(todoColorChanged(colorName));
        setIsColor(colorName);
    };

    return (
        <div className="flex justify-center text-xs text-gray-500">

            <ul className="flex space-x-1 items-center text-xs">
                <li
                    className={`cursor-pointer ${
                        isCompleted === 'All' && "font-bold"
                    }`}
                    onClick={() => handleAllTodos('all')}
                >
                    All
                </li>
                
                <li>|</li>
                <li
                    className={`cursor-pointer ${
                        isCompleted === 'Completed' && "font-bold"
                    }`}
                    onClick={() => handleTodoCompleted()}
                >
                    Completed
                </li>

                <li>|</li>
                
                <li
                    className={`cursor-pointer ${
                        isCompleted === 'Incompleted' && "font-bold"
                    }`}
                    onClick={() => handleTodoIncompleted()}
                >
                    Incomplete
                </li>
                <li></li>
                <li></li>
                <li
                    className={`h-3 w-3 border-2 border-green-500 md:hover:bg-green-500 rounded-full cursor-pointer ${
                        isColor ==="green" && "bg-green-500"
                    }`}
                    onClick={() => handleColorChange("green")}
                ></li>
                <li
                    className={`h-3 w-3 border-2 border-red-500 md:hover:bg-red-500 rounded-full cursor-pointer ${
                        isColor ==="red" && "bg-red-500"
                    }`}
                    onClick={() => handleColorChange("red")}
                ></li>
                <li
                    className={`h-3 w-3 border-2 border-yellow-500 md:hover:bg-yellow-500 rounded-full cursor-pointer ${
                        isColor ==="yellow" && "bg-yellow-500"
                    }`}
                    onClick={() => handleColorChange("yellow")}
                ></li>
            </ul>
        </div>
    );
}
