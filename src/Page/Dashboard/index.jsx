import { lazy,Suspense } from "react";
const LazyDashboard =lazy(()=>{
import("./Dashboard")
})

export const Dashboard =(props)=>{
<Suspense fallback={<>Loading...</>}>

    <LazyDashboard {...props}/>
</Suspense>
}
