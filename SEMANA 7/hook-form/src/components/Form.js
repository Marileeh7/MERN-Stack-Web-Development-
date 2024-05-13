import React, { useState } from 'react'

const Form = (props) => {
    
    //  We destructure props into "inputs" and "setInputs" variables
    const {inputs, setInputs} = props;

    // We create and event handler for updating the fields when data is put into the form
    const onChange = (e) => {
        setInputs({...inputs,
            [e.target.name]: e.target.value}
        );  
    };
    
    return (
        
        <div className="text-left my-5 p-3 border border-dark">
            <h2>Register Form</h2>
            <div className="form-group">
                <label htmlFor="firstName">First Name: </label> 
                <input type="text" className="form-control" onChange={ onChange } name="firstName"/>
            </div>
            <div className="form-group">
                <label htmlFor="lastName">Last Name: </label> 
                <input type="text" className="form-control" onChange={ onChange } name="lastName"/>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email: </label> 
                <input type="email" className="form-control" onChange={ onChange } name="email"/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password: </label> 
                <input type="password" className="form-control" onChange={ onChange } name="password"/>
            </div>
            <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password: </label> 
                <input type="password" className="form-control" onChange={ onChange } name="confirmPassword"/>
            </div>
        </div>
    )
}

export default Form