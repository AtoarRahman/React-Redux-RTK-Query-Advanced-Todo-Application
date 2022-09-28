import { useSelector } from "react-redux";
import Filter from "./components/Filter";
import Footer from "./components/Footer";
import Header from "./components/Header";
import IncompleteFooter from "./components/IncompleteFooter";
import Navbar from "./components/Navbar";
import IncompleteTodos from "./components/todos/IncompleteTodos";
import Todos from "./components/todos/Todos";

function App() {
    const { completed, incompleted } = useSelector((state) => state.filter);

    return (
        <>
            <div className="grid place-items-center mt-6 bg-blue-100 px-6 font-sans">
                <Navbar />

                <div className="w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white mt-5">
                    <Filter/>
                </div>

                <div className="w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white mt-4">
                    <Header />
                    {incompleted && 
                        <>
                            <hr className="mt-4" />
                            <IncompleteTodos/>
                            <hr className="mt-4" />
                            <IncompleteFooter />
                        </>
                    }
                </div>
                {completed && 
                    <div className="w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white mt-4">
                        <Todos />
                        <hr className="mt-4" />
                        <Footer/> 
                    </div>
                }
            </div>
        </>
    );
}

export default App;
