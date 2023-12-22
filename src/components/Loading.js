import React, { Suspense } from "react";
import SpendTable from "./SpendTable";

const Loading = () => {
    return (
    <Suspense fallback={<h1>Loading...</h1>}>
        <SpendTable />
    </Suspense>)
}
export default Loading;
