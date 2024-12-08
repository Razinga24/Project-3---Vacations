import { useEffect } from "react";

function useTitle( title:string ){
    useEffect(()=>{
        document.title = "Vacations - " + title;
    },[])
}

export default useTitle;