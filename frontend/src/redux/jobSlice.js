import {createSlice} from "@reduxjs/toolkit"
const jobSlice = createSlice({
    name: 'job',
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        singleJob: null,
        searchTextJob: '',
        searchQuery:'',
        saveJob:[]
        // Change the property name here
    },
    reducers: {
        setAllJob: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchTextJob: (state, action) => {
            state.searchTextJob = action.payload;
        },
        setSearchQuery:(state,action)=>{
            state.searchQuery = action.payload
        },
        setSaveJob:(state,action)=>{
            const newJob = action.payload
            if (newJob === null) {
                state.saveJob = [];
                return; // Exit early after clearing the state
            }
            if (!Array.isArray(state.saveJob)) {
                state.saveJob = [];
            }
            const jobExist = state.saveJob.some((job)=>job._id == newJob._id)
            if(!jobExist){
                state.saveJob.push(newJob)
            }
        }
        
    }
});

export const { setAllJob, setSingleJob, setAllAdminJobs, setSearchTextJob,setSearchQuery,setSaveJob  } = jobSlice.actions;
export default jobSlice.reducer;
