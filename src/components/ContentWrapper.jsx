import React from "react";
import {ERROR_FETCHING, PENDING, REJECTED} from "../constants";
import ApiLoader from "./ApiLoader";

export default function ContentWrapper(props) {

    const {statusObject, forType} = props;
    const {status, type} = statusObject || {};

    // function for dynamic content according to api call phases

    if (type === forType) {
        switch (status) {
            case PENDING:
                return <div className="api-loader">
                    <ApiLoader/>
                </div>
            case REJECTED:
                return <p>{ERROR_FETCHING}</p>
            default:
                return props?.children;
        }
    } else return props?.children;
}