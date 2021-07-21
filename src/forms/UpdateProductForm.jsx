import React, {useEffect, useState} from "react";
import {Row, Col} from "react-flexbox-grid";
import {useDispatch} from "react-redux";
import {updateProduct} from "../redux/actions/products";
import {numberValidation} from "../constants";

export default function UpdateProductForm(props) {

    const dispatch = useDispatch();
    const {submit} = props;
    const {id, ...item} = props?.item || {};

    const initialFields = {
        quantity: 0,
        period: 0
    }

    const actualYear = new Date().getFullYear();
    const selectedYear = actualYear + item?.period;

    const initItem = {
        ...item,
        period: selectedYear
    }

    const [formValues, setFormValues] = useState(initItem || initialFields);
    const [touchedFields, setTouchedFields] = useState([]);
    const formFields = ["quantity, period"];
    const val = (name) => formValues?.[name] || "";

    const validForm = formValues?.quantity > 0 && formValues?.period > 0;

    function touchField({target: {name}}) {
        const newTouchedFields = [...touchedFields];
        if (!newTouchedFields.includes(name)) {
            newTouchedFields.push(name);
        }
        setTouchedFields(newTouchedFields);
    }

    function touchAll() {
        const newTouchedFields = [];
        formFields.forEach(name => {
            newTouchedFields.push(name);
        })
        setTouchedFields(newTouchedFields);
    }

    const handleChange = ({target: {type, name, value}}) => {
        setFormValues({
            ...formValues,
            [name]: type === "number" ? parseInt(value) : value
        });
    }

    useEffect(() => {
        const exactValues = {
            ...formValues,
            period: formValues?.period - actualYear
        }

        if (JSON.stringify(item) !== JSON.stringify(exactValues)) {
            if (validForm) {
                dispatch(updateProduct(id, exactValues));
            } else {
                touchAll();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [submit])

    return (
            <Row>
                <Col lg={5} md={12} sm={12} xs={12} className="form-group">
                    <label>Total devices</label>
                    <input
                        type="number"
                        name="quantity"
                        value={val("quantity")}
                        onChange={handleChange}
                        onBlur={touchField} />
                    {touchedFields?.includes("quantity") && numberValidation(formValues?.quantity) &&
                    <span className="form-error">Must be greater than 0</span>}
                </Col>
                <Col lg={5} md={12} sm={12} xs={12} className="form-group">
                    <label>Valid until</label>
                    <input
                        type="number"
                        name="period"
                        value={val("period")}
                        onChange={handleChange}
                        onBlur={touchField}
                        min={actualYear + 1}
                    />
                    {touchedFields?.includes("period") && numberValidation(formValues?.period) &&
                    <span className="form-error">Must be greater than 0</span>}
                </Col>
            </Row>
    )
}
