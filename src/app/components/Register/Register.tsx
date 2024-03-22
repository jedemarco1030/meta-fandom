"use client";

import React, { useState, useEffect, useContext } from 'react';
import { Button, Input } from '@nextui-org/react';
import { EyeFilledIcon, EyeSlashFilledIcon } from "@nextui-org/shared-icons";

type FormData = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    dateOfBirth: string;
    username: string;
    emailAddress: string;
    verifyEmail: string;
    password: string;
    verifyPassword: string;
};

type FormErrors = {
    [Property in keyof FormData]?: string | null;
};

const Register = () => {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        dateOfBirth: '',
        username: '',
        emailAddress: '',
        verifyEmail: '',
        password: '',
        verifyPassword: '',
    });

    const [formErrors, setFormErrors] = useState<FormErrors>({
        firstName: null,
        lastName: null,
        phoneNumber: null,
        dateOfBirth: null,
        username: null,
        emailAddress: null,
        verifyEmail: null,
        password: null,
        verifyPassword: null,
    });

    const [touched, setTouched] = useState<Record<keyof FormData, boolean>>({
        firstName: false,
        lastName: false,
        phoneNumber: false,
        dateOfBirth: false,
        username: false,
        emailAddress: false,
        verifyEmail: false,
        password: false,
        verifyPassword: false,
    });

    const validateField = (name: keyof FormData, value: string) => {
        switch (name) {
            case 'firstName':
            case 'lastName':
                return value.length >= 2 ? null : 'Must be at least 2 characters';
            case 'phoneNumber':
                return /^\+?\d{10,15}$/.test(value) ? null : 'Invalid phone number';
            case 'dateOfBirth':
                return /^\d{4}-\d{2}-\d{2}$/.test(value) ? null : 'Invalid date of birth (YYYY-MM-DD)';
            case 'username':
                return /^[a-zA-Z0-9_]+$/.test(value as string) ? null : 'Invalid characters';
            case 'emailAddress':
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string) ? null : 'Invalid email';
            case 'verifyEmail':
                return value === formData.emailAddress ? null : 'Email addresses do not match';
            case 'password':
                return value.length >= 8 ? null : 'Must be at least 8 characters';
            case 'verifyPassword':
                return value === formData.password ? null : 'Passwords do not match';
            default:
                return null;
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name in formData) {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value
            }));
        }
    };


    const showError = (fieldName: keyof FormData) => {
        return touched[fieldName] && !!formErrors[fieldName];
    };


    useEffect(() => {
        const errors: FormErrors = { ...formErrors };
        (Object.keys(formData) as Array<keyof FormData>).forEach((field) => {
            const error = validateField(field, formData[field]);
            if (error) {
            }
            errors[field] = error;
        });
        setFormErrors(errors);

        const allFieldsTouched = Object.keys(touched).every((key) => touched[key as keyof FormData]);
        const noErrors = Object.values(errors).every((error) => error === null || error === undefined);
        const allFieldsFilled = Object.values(formData).every((value) => value.trim() !== '');

        setAllValid(allFieldsTouched && noErrors && allFieldsFilled);
    }, [formData, touched]);

    const [allValid, setAllValid] = useState(false);

    const handleBlur = (e: any) => {
        const { name } = e.target as { name: keyof FormData };
        setTouched((prev) => ({ ...prev, [name]: true }));

        const fieldError = validateField(name, formData[name]);
        setFormErrors((prev) => ({ ...prev, [name]: fieldError }));
    };

    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
      <div className="p-15 flex flex-col items-center gap-5">
        <h1 className="text-center text-2xl">Register for the Site</h1>
        <p className="text-lg">Welcome! Please fill out the form below to create your account.</p>
        <div className="max-w-md w-full shadow-md p-10 rounded-lg flex flex-col gap-5">
          <Input
            label="First Name"
            type="text"
            fullWidth
            size="lg"
            placeholder="Enter your first name"
            name="firstName"
            variant="faded"
            value={formData.firstName}
            onBlur={handleBlur}
            onChange={handleChange}
            isInvalid={showError('firstName')}
            errorMessage={touched.firstName ? formErrors.firstName : ''}
          />
          <Input
            label="Last Name"
            type="text"
            fullWidth
            size="lg"
            placeholder="Enter your last name"
            name="lastName"
            variant="faded"
            value={formData.lastName}
            onBlur={handleBlur}
            onChange={handleChange}
            isInvalid={showError('lastName')}
            errorMessage={touched.lastName ? formErrors.lastName : ''}
          />
          <Input
            label="Phone Number"
            type="tel"
            fullWidth
            size="lg"
            placeholder="Enter your phone number"
            name="phoneNumber"
            variant="faded"
            value={formData.phoneNumber}
            onBlur={handleBlur}
            onChange={handleChange}
            isInvalid={showError('phoneNumber')}
            errorMessage={touched.phoneNumber ? formErrors.phoneNumber : ''}
          />
            <Input
              label="Date of Birth"
              type="date"
              className="text-gray-500"
              fullWidth
              size="lg"
              placeholder="YYYY-MM-DD"
              name="dateOfBirth"
              variant="faded"
              value={formData.dateOfBirth}
              onBlur={handleBlur}
              onChange={handleChange}
              isInvalid={showError('dateOfBirth')}
              errorMessage={touched.dateOfBirth ? formErrors.dateOfBirth : ''}
            />
          <Input
            label="Username"
            type="text"
            fullWidth
            size="lg"
            placeholder="Enter your username"
            name="username"
            variant="faded"
            value={formData.username}
            onBlur={handleBlur}
            onChange={handleChange}
            isInvalid={showError('username')}
            errorMessage={touched.username ? formErrors.username : ''}
          />
          <Input
            label="Email Address"
            type="email"
            fullWidth
            size="lg"
            placeholder="Enter your email address"
            name="emailAddress"
            variant="faded"
            value={formData.emailAddress}
            onBlur={handleBlur}
            onChange={handleChange}
            isInvalid={showError('emailAddress')}
            errorMessage={touched.emailAddress ? formErrors.emailAddress : ''}
          />
          <Input
            label="Verify Email Address"
            type="email"
            fullWidth
            size="lg"
            placeholder="Verify your email address"
            name="verifyEmail"
            variant="faded"
            value={formData.verifyEmail}
            onBlur={handleBlur}
            onChange={handleChange}
            isInvalid={showError('verifyEmail')}
            errorMessage={touched.verifyEmail ? formErrors.verifyEmail : ''}
          />
          <Input
            label="Password"
            type={isVisible ? "text" : "password"}
            fullWidth
            size="lg"
            placeholder="Enter your password"
            name="password"
            variant="faded"
            value={formData.password}
            onBlur={handleBlur}
            onChange={handleChange}
            isInvalid={showError('password')}
            errorMessage={touched.password ? formErrors.password : ''}
            endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
          />
          <Input
            label="Verify Password"
            type={isVisible ? "text" : "password"}
            fullWidth
            size="lg"
            placeholder="Verify your password"
            name="verifyPassword"
            variant="faded"
            value={formData.verifyPassword}
            onBlur={handleBlur}
            onChange={handleChange}
            isInvalid={showError('verifyPassword')}
            errorMessage={touched.verifyPassword ? formErrors.verifyPassword : ''}
            endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
          />
          <Button
            isDisabled={!allValid}
            onClick={() => {
            }}
            color="primary"
            size="lg"
            fullWidth
          >
            Submit
          </Button>
        </div>
      </div>
    );
}

export default Register;
