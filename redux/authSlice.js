import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  salutations: [],
  status: 'idle',
  error: null,
}

export const getSalutations = createAsyncThunk(
  'posts/getSalutations',
  async () => {
    const response = await fetch('http://localhost:4000/salutations/')
    const salutations = await response.json()

    return salutations
  }
)

export const register = createAsyncThunk('posts/register', async (payload) => {
  const response = await fetch('http://localhost:4000/auth/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  return response.json()
})

export const authSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setIdle: (state, action) => {
      state.status = 'idle'
    },
  },
  extraReducers: {
    [getSalutations.fulfilled]: (state, action) => {
      state.salutations = action.payload.salutations
      state.salutations.unshift(' ')
    },
    [getSalutations.rejected]: (state, action) => {
      state.status = 'failed'
      state.salutations = []
    },
    [register.pending]: (state, action) => {
      state.status = 'loading'
    },
    [register.fulfilled]: (state, action) => {
      if (action.payload.error) {
        state.error = action.payload.error.message
        state.status = 'error'
      } else {
        state.status = 'succeeded'
      }
    },
    [register.rejected]: (state, action) => {
      state.status = 'rejected'
      if (action.payload.error) {
        error = action.payload.error.message
      } else {
        error = 'Something went wrong'
      }
    },
  },
})

export const { setIdle } = authSlice.actions

export default authSlice.reducer
