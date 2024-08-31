import {createSlice} from "@reduxjs/toolkit"

const applicationSlice = createSlice({
    name:"application",
    initialState:{
        allApplicants:[],
        allAppliedJob:[]
    },
    reducers:{
        setAllApplicants:(state,action)=>{
           state.allApplicants = action.payload
        },
        setAllAppliedJob:(state,action)=>{
            state.allAppliedJob = action.payload
        }
    }
})

export const {setAllApplicants,setAllAppliedJob} = applicationSlice.actions
export default applicationSlice.reducer