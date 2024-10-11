'use client';
import Form from '@/components/Form/Form';
import Input from '@/components/Input/Input';
import {
  useLoginMutation,
  useRegisterMutation,
} from '@/features/auth/authApiSlice';
import { emailRegex, passwordRegex } from '@/utils/regex';
import { getLocalTimeZone, today } from '@internationalized/date';
import { Button, DatePicker } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Controller, useFormContext, UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

export const FormAuth = ({ formType }: { formType: 'login' | 'signup' }) => {
  const [formMethods, setFormMethods] = React.useState<UseFormReturn | null>(
    null,
  ); // State to hold form methods
  const [login, { isLoading: isLoadingLogin, error: errorLogin }] =
    useLoginMutation();
  const [register, { isLoading: isLoadingRegister, error: errorRegister }] =
    useRegisterMutation();
  useEffect(() => {
    if (formMethods) {
      formMethods.reset(); // Reset form when formType changes
    }
  }, [formType, formMethods]);
  // const router = useRouter();
  const handleLogin = async (body: Record<string, any>) => {
    try {
      const userData = await login(body).unwrap();
      localStorage.setItem('token', userData.token); // Lưu token vào localStorage
      // router.push('/dashboard'); // Điều hướng đến trang dashboard sau khi đăng nhập thành công
    } catch (err: any) {
      toast.error(err.data.message);
      console.error('Failed to login:', err);
    }
  };
  const handleRegister = async (body: Record<string, any>) => {
    try {
      const userData = await register(body).unwrap();

      // Optionally, you can redirect the user or update the UI to indicate successful registration
      console.log('Registration successful:', userData);
      // You might want to automatically log the user in after successful registration
      // Or you could redirect them to a login page or dashboard
      // router.push('/dashboard');
    } catch (err) {
      console.error('Failed to register:', err);
      // Handle registration error (e.g., display error message to the user)
    }
  };
  return (
    <Form
      onSubmit={(e: Record<string, any>) => {
        if (formType === 'signup') {
          if (e?.dob) {
            const selectedDate = new Date(e.dob);
            const currentDate = new Date();

            // Validate DOB (ensure it's not in the future)
            if (selectedDate > currentDate) {
              return; // Stop form submission
            }
            e.dob = selectedDate.toISOString();
          }
          handleRegister(e);
        } else if (formType === 'login') {
          handleLogin(e);
        }
      }}
      formMethodsRef={setFormMethods}
    >
      {formType === 'signup' && (
        <>
          <Controller
            name="dob" // Name for the date field
            control={formMethods?.control} // Pass control from form methods
            render={({ field }) => (
              <DatePicker
                {...field} // Spread the field props: value and onChange
                label={
                  <p className="text-neutral-800 dark:text-neutral-200 text-sm font-semibold flex mt-3 mb-1">
                    Birth Date (optional)
                  </p>
                }
                variant="bordered"
                showMonthAndYearPickers
                radius="full"
                labelPlacement="outside"
                maxValue={today(getLocalTimeZone())}
              />
            )}
          />
          <Input
            name="username"
            label="Username"
            placeholder="Enter the username"
            rules={{
              required: 'Username is required',
            }}
            isRequireMark={false}
            variant="underlined"
            color="primary"
            radius="lg"
          />
        </>
      )}
      <Input
        name="email"
        label="Email"
        placeholder="Enter the email"
        rules={{
          required: 'Email is required',
          pattern: {
            value: emailRegex,
            message: 'Please enter a valid email address',
          },
        }}
        isRequireMark={false}
        variant="underlined"
        color="primary"
        radius="lg"
      />
      <Input
        name="password"
        label="Password"
        placeholder="Enter the password"
        rules={{
          required: 'Password is required',
          pattern: {
            value: passwordRegex,
            message:
              'Password must contain at least 8 characters, including uppercase, lowercase letters and numbers',
          },
        }}
        isRequireMark={false}
        variant="underlined"
        color="primary"
        radius="lg"
        type="password"
      />
      <Button
        type="submit"
        color="primary"
        radius="full"
        className="w-full mt-7 min-h-12"
      >
        {formType === 'signup' ? 'Sign up' : 'Login'}
      </Button>
    </Form>
  );
};
