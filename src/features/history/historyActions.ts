import { createAction } from "@reduxjs/toolkit"
import { Movie } from "../movies/types"

export const addToHistory = createAction<Movie>("history/addToHistory")
export const getHistory = createAction("history/getHistory")
