import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import { NOTIFICATION_TYPE } from "../../constants";
import createAPI from "../../api";

export const getMovies = createAsyncThunk('movies/getMovies', async (accessToken) => {
    try {
        const { data } = await createAPI(accessToken).get('/movies')
        notification[NOTIFICATION_TYPE.success]({
            message: 'Get movies successfully '
        })
        return data.data
    } catch (error) {
        notification[NOTIFICATION_TYPE.error]({
            message: error.response.data.message
        })
    }
})



export const getMovieDetail = createAsyncThunk('movies/getMovieDetail', async ({ accessToken, id }) => {
    try {
        const { data } = await createAPI(accessToken).get(`/movies/${id}`)
        notification[NOTIFICATION_TYPE.success]({
            message: 'Get movie detail successfully'
        })
        return data.data

    } catch (error) {
        notification[NOTIFICATION_TYPE.error]({
            message: error.response.data.message
        })
    }
})

export const createNewMovie = createAsyncThunk('movies/createNewMovie', async ({ accessToken, newMovie }) => {
    try {
        await createAPI(accessToken).post('/movies', { ...newMovie })
        notification[NOTIFICATION_TYPE.success]({
            message: "Create new movie successfully"
        })
    } catch (error) {
        notification[NOTIFICATION_TYPE.error]({
            message: error.response.data.message
        })
    }
})

export const updateMovie = createAsyncThunk('movies/updateMovie', async ({ accessToken, id, updateMovie }) => {
    try {
        await createAPI(accessToken).put(`/movie/${id}`, { ...updateData })
        notification[NOTIFICATION_TYPE.success]({
            message: 'Update movie successfully'
        })

    } catch (error) {
        notification[NOTIFICATION_TYPE.error]({
            message: error.response.data.message
        })
    }
})

export const deleteMovie = createAsyncThunk('movies/deleteMovie', async ({ accessToken, id }) => {
    try {
        await createAPI(accessToken).delete(`/movies/${id}`)
        notification[NOTIFICATION_TYPE.success]({
            message: 'Delete movie successfully'
        })
    } catch (error) {
        notification[NOTIFICATION_TYPE.error]({
            message: error.response.data.message
        })
    }
})

const initialState = {
    movies: [],
    movie: {}
}

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        removeSelectedMovie: (state, action) => {
            state.movie = {}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMovies.fulfilled, (state, action) => {
            state.movies = action.payload
        })
        builder.addCase(getMovieDetail.fulfilled, (state, action) => {
            state.movie = action.payload
        })
    }
})
export const { removeSelectedMovie } = movieSlice.actions;

export const getMoviesFromStore = state => state.movie.movies
export const getMovieFromStore = state => state.movie.movie

export default movieSlice.reducer;