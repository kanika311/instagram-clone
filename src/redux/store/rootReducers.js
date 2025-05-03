import {combineReducers} from '@reduxjs/toolkit'
import {reducer as authReducer} from '../slices/auth'
import {reducer as postReducer} from '../slices/post'
import {reducer as followReducer} from '../slices/follow'
import {reducer as messageReducer} from '../slices/message'

export const rootReducer = combineReducers({
      auth:authReducer,
  post:postReducer,
follow:followReducer,
message:messageReducer,
});