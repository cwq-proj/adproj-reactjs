import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import api from '../../api/AxiosConfig';
import { Container, Card } from '@mui/material';
import ShowAllTable from '../../staff/components/ShowAllTable';

const Input = ({ label, registerInput, onChange }) => (
    <div>
        <label>{label}</label>
        <input {...registerInput} onChange={onChange} />
    </div>
);

const HealthRecordForm = (props) => {
    // prop drilling from the parent
    const { columns, userId, firstName, lastName } = props;

    // to handle submission of data to api endpoint
    const { register, handleSubmit, formState: { errors } } = useForm();

    // enabled submission button only when nric string is valid
    const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);
    const nricPattern = /^[A-Za-z]\d{7}[A-Za-z]$/; // form field validation
    // hook to track the records returned from api endpoint
    const [healthRecords, setHealthRecords] = useState([]);

    // hide form if link is successful
    const [hideForm, setHideForm] = useState(false);

    // Introduce a new state variable to track form submission
    const [submitted, setSubmitted] = useState(false);

    // post request to api endpoint
    const onSubmit = async (formData) => {
        formData.userId = userId;
        formData.firstName = firstName;
        formData.lastName = lastName;

        try {
            const response = await api.post("/health-records/link", formData);
            setHealthRecords(response.data);
            setSubmitted(true);
        } catch (err) {
            if (err.response) {
                console.log("This is an error:", err.response);
            }
        }
    };

    useEffect(() => {
        if (healthRecords.length) {
            console.log("Health records updated:", healthRecords);
            setHideForm(true); // Update the state to hide the form
        }
    }, [healthRecords]);

    const handleNricChange = (event) => {
        const isValid = nricPattern.test(event.target.value);
        setIsSubmitButtonDisabled(!isValid);
    };

    const tableName = "Health Records Successfully Linked!";

    return (
        <div>
            <Container>
                <Card>
                    {!hideForm && (
                        <div>
                            <h2>Welcome to the Health Record System</h2>
                            <p>Your health records are currently not linked. Please provide your NRIC to securely link to your health records.</p>
                            {/* <h2>You are currently not registered in the system. Please enter your NRIC below to link to your health records</h2> */}
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Input
                                    label="NRIC: "
                                    registerInput={register("nric", { required: true })}
                                    onChange={handleNricChange}
                                />
                                {errors.nric && <p className="error">Invalid NRIC format!</p>}
                                <br />
                                <button type="submit" disabled={isSubmitButtonDisabled}>
                                    Submit
                                </button>
                            </form>
                            {submitted && !healthRecords.length && (
                                          <p style={{ color: 'red'}}>
                                          Linking was unsuccessful. Please verify the accuracy of your NRIC or ensure that you have registered health records.
                                        </p>
                                )}
                        </div>
                    )}
                    <div>
                        {healthRecords.length ? (
                            <div>
                                <ShowAllTable tableName={tableName} data={healthRecords} columns={columns} />
                            </div>
                        ) : (
                            null
                        )}
                    </div>
                </Card>
            </Container>
        </div>
    );

};

export default HealthRecordForm;