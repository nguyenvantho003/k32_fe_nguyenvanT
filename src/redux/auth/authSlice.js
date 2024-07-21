import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ACCESS_TOKEN, NOTIFICATION_TYPE } from "../../constants";
import { notification } from "antd";
import createAPI from "../../api";


export const register = createAsyncThunk('auth/register', async (dataRegister) => {
    try {
        const { data } = await createAPI().post('/auth/register', { ...dataRegister })
        notification[NOTIFICATION_TYPE.success]({
            message: 'Register successfully'
        })
        return data?.data
    } catch (error) {
        notification[NOTIFICATION_TYPE.error]({
            message: error.response.data.message
        })
    }
})


export const login = createAsyncThunk('auth/login', async (dataLogin) => {
    try {
        const { data } = await createAPI().post('/auth/login', { ...dataLogin })
        localStorage.setItem(ACCESS_TOKEN, data.data.accessToken)
        notification[NOTIFICATION_TYPE.success]({
            message: 'Login successfully'
        })

        return data.data
    } catch (error) {
        notification[NOTIFICATION_TYPE.error]({
            message: error.response.data.message
        })
    }
})

export const logout = createAsyncThunk('auth/logout', async (accessToken) => {
    try {
        await createAPI(accessToken).post('/auth/logout')
        localStorage.clear
    } catch (error) {
        notification[NOTIFICATION_TYPE.error]({
            message: error.response.data.message
        })
    }
})
const initialState = {
    user: {}
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload
        })
        builder.addCase(logout.fulfilled, (state, action) => {
            state.user = {}
        })
    }
})

export const getLoggedInUser = state => state.auth.user

export default authSlice.reducer