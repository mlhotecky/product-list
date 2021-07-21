import React, {useEffect, useState} from "react";
import {Grid, Row, Col} from "react-flexbox-grid";
import {useDispatch} from "react-redux";
import {updateProduct} from "../redux/actions/products";

export default function UpdateProductForm(props) {

    const dispatch = useDispatch();

    // props from higher component
    const {submit} = props;
    const {id, ...item} = props?.item || {};

    // initial attributes and values of form
    const initialFields = {
        quantity: 0,
        period: 0
    }

    // definition of form object - initial when update || initialFields when create new one
    const [formValues, setFormValues] = useState(item || initialFields);

    // array of touched fields for showing validation messages
    const [touchedFields, setTouchedFields] = useState([]);

    // all field names of form - only text in this case
    const formFields = ["quantity, period"];

    // const for return value by name or initial value
    // can be made with typeof validation but it is´nt necessary in this case
    const val = (name) => formValues?.[name] || "";

    // very simplified for two inputs
    // can be solved with foreach by Object.entries(value) with typeof validation and counter for exceptions
    const validForm = formValues?.quantity > 0 && formValues?.period > 0;

    // function for touch field after onBlur input event
    function touchField({target: {name}}) {
        const newTouchedFields = [...touchedFields];
        if (!newTouchedFields.includes(name)) {
            newTouchedFields.push(name);
        }
        setTouchedFields(newTouchedFields);
    }

    // function for touch all fields after form has invalid values
    function touchAll() {
        const newTouchedFields = [];
        formFields.forEach(name => {
            newTouchedFields.push(name);
        })
        setTouchedFields(newTouchedFields);
    }

    // set value to form object by name of input
    const handleChange = ({target: {type, name, value}}) => {
        setFormValues({
            ...formValues,
            [name]: type === "number" ? parseInt(value) : value
        });
    }

    // submit form - if validation is ok, do callback by modal prop
    // or touch all fields for displaying error messages
    useEffect(() => {
        if (JSON.stringify(item) !== JSON.stringify(formValues)) {
            if (validForm) {
                dispatch(updateProduct(id, formValues));
            } else {
                touchAll();
            }
        }
        // if i want call this action according to one prop
        // but if i dont define all props it throw warning
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [submit])

    return (
        <Grid>
            <Row>
                <Col sm={6} className="form-group">
                    <label>Total devices</label>
                    <input
                        type="number"
                        name="quantity"
                        value={val("quantity")}
                        onChange={handleChange}
                        onBlur={touchField} />
                    {touchedFields?.includes("quantity") && formValues?.quantity <= 0 &&
                    <span className="form-error">Must be greater than 0</span>}
                </Col>
                <Col sm={6} className="form-group">
                    <label>Valid until</label>
                    <input
                        type="number"
                        name="period"
                        value={val("period")}
                        onChange={handleChange}
                        onBlur={touchField}
                    />
                    {touchedFields?.includes("period") && formValues?.period <= 0 &&
                    <span className="form-error">Must be greater than 0</span>}
                </Col>
            </Row>
        </Grid>
    )
}
