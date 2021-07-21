import {
    ERROR,
    PENDING,
    REJECTED,
    SUCCEEDED,
    API_PREFIX,
    GET_PRODUCTS,
    UPDATE_PRODUCT,
    PRODUCT_UPDATED,
    GET_PRODUCT_STATUS
} from "../../constants";

const getProductStatus = (type, status, message) => ({
    type: GET_PRODUCT_STATUS,
    payload: {
        type,
        status,
        message: message || ""
    }
});

const storeProducts = products => ({
    type: GET_PRODUCTS,
    payload: products
});

const updateProductData = product => ({
    type: UPDATE_PRODUCT,
    payload: product
})

export const getAllProducts = () => dispatch => {
    dispatch(getProductStatus(GET_PRODUCTS, PENDING));
    fetch(`${API_PREFIX}/`)
        .then(async response => {
            const data = await response.json();

            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                dispatch(getProductStatus(GET_PRODUCTS, REJECTED, `${ERROR} ${error || ""}`));
                return;
            }

            dispatch(getProductStatus(GET_PRODUCTS, SUCCEEDED));
            dispatch(storeProducts(data?.products || []));
        })
        .catch(error => {
            dispatch(getProductStatus(GET_PRODUCTS, REJECTED, error?.toString() || ""));
        });

}

export const updateProduct = (id, formValues) => dispatch => {
    const options = {
        method: "patch",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formValues)
    }

    dispatch(getProductStatus(UPDATE_PRODUCT, PENDING));
    fetch(`${API_PREFIX}/${id}`, options)
        .then(async response => {
            const data = await response.json();

            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                dispatch(getProductStatus(UPDATE_PRODUCT, REJECTED, error || ""));
                return;
            }

            dispatch(getProductStatus(UPDATE_PRODUCT, SUCCEEDED, PRODUCT_UPDATED));
            dispatch(updateProductData(data?.product || {}));
        })
        .catch(error => {
            dispatch(getProductStatus(UPDATE_PRODUCT, REJECTED, error?.toString() || ""));
        });
}

