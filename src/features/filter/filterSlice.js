const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    completed: true,
    incompleted: true,
    color:'',
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        allTodos: (state) => {
            state.completed = true;
            state.incompleted = true;
            state.color = '';
        },

        todoCompleted: (state) => {
            state.completed = true;
            state.incompleted = false;
        },

        todoIncompleted: (state) => {
            state.completed = false;
            state.incompleted = true;
        },

        todoColorChanged: (state, action) => {
            state.color = action.payload;
        },
        
        addToCompleted: (state) => {
            state.completed = true;
        },
        
        addToIncompleted: (state) => {
            state.incompleted = true;
        }
    },
});

export default filterSlice.reducer;
export const { allTodos, todoCompleted, todoIncompleted, todoColorChanged, addToCompleted, addToIncompleted } = filterSlice.actions;