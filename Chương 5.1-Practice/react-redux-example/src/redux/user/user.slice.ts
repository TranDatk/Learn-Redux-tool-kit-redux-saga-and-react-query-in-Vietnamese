import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchListUser = createAsyncThunk(
    'users/fetchListUser',
    async (userId, thunkAPI) => {
        const res = await fetch("http://localhost:8000/users");
        const data = await res.json();
        return data;
    },
)

// Define the initial state using that type
const initialState = {
    listUser: 6
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchListUser.fulfilled, (state, action) => {
            // Add user to the state array
            // state.entities.push(action.payload)
            console.log(action.payload)
        })
    },
})

// export const { } = userSlice.actions

export default userSlice.reducer