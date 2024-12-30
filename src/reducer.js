

const reducer = (state, action) =>{
    switch(action.type){

        //Loading Case
        case "SET_LOADING":
            return{
                ...state,
                isLoading : true,
            };

        //Post Case
        case "GET_STORIES":
            return{
                ...state,
                isLoading : false,
                hits : action.payload.hits,
                nbPages : action.payload.nbPages,
            };

        //Post Remove Case
        case "REMOVE_POST":
            return{
                ...state,
                hits : state.hits.filter(
                    (curElement) => curElement.objectID != action.payload
                )
            }

        //Search Case
        case "SEARCH_QUERY":
            return{
                ...state,
                query : action.payload,
            }

        // Page Navigation cases
        case "NEXT_PAGE":
            let pageNumInc = state.page + 1;

            if (pageNumInc >= state.nbPages){
                pageNumInc = 0
            }
            
            return{
                ...state,
                page : pageNumInc,
            }
        case "PREV_PAGE":
            let pageNum = state.page;

            if (pageNum <= 0){
                pageNum = 0;
            }

            else{
                pageNum = pageNum - 1;
            }

            return{
                ...state,
                page : pageNum,
            }
    }



    return state;
};

export default reducer;