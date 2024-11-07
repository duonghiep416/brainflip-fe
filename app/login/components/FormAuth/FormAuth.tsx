'use client';
import Form from '@/components/Form/Form';
import Input from '@/components/Input/Input';
import { ModalForm } from '@/components/Modal/ModalForm';
import {
  useLoginMutation,
  useRegisterMutation,
} from '@/features/auth/authApiSlice';
import { LoginCredentials, RegisterCredentials } from '@/features/auth/types';
import { parseDuration } from '@/utils/dateTime';
import { emailRegex, passwordRegex } from '@/utils/regex';
import { getLocalTimeZone, today } from '@internationalized/date';
import { Button, DatePicker } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import { Input as InputNextUI } from '@nextui-org/react';
export const FormAuth = ({
  formType,
  setTabSelected,
}: {
  formType: 'login' | 'signup';
  setTabSelected: Dispatch<SetStateAction<'login' | 'signup'>>;
}) => {
  const router = useRouter();
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
  const handleLogin = async (body: LoginCredentials) => {
    try {
      const userData = await login(body).unwrap();
      console.log('Login successful:', userData);
      toast.success('Login successful!'); // Display a success toast
      document.cookie = `auth-token=${
        userData.accessToken.value
      }; path=/; max-age=${parseDuration(userData.accessToken.expiresIn)};`;
      document.cookie = `auth-refresh-token=${
        userData.refreshToken.value
      }; path=/; max-age=${parseDuration(userData.refreshToken.expiresIn)};`;
      router.push('/');
    } catch (err: any) {
      toast.error(err.data.message);
      console.error('Failed to login:', err);
    }
  };
  const handleRegister = async (body: RegisterCredentials) => {
    try {
      const userData = await register(body).unwrap();
      console.log('Registration successful:', userData);
      // Optionally, you can redirect the user or update the UI to indicate successful registration
      toast.success('Registration successful!'); // Display a success toast
      setTabSelected('login');
    } catch (err: any) {
      toast.error(err.data.message);
      console.error('Failed to register:', err);
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
          handleRegister(e as RegisterCredentials);
        } else if (formType === 'login') {
          handleLogin(e as LoginCredentials);
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
          <Input
            name="name"
            label="Full name"
            placeholder="Enter your full name"
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
      {formType === 'login' && (
        <p className="text-right mt-2 dark:text-white text-sm flex justify-end">
          Forgot password?{' '}
          <ModalForm
            nodeTrigger="Reset it"
            onSubmit={() => {
              console.log(1111);
            }}
            actionButtonText="Send"
            header="Reset password"
            backdrop="opaque"
          >
            <InputNextUI
              label="Enter your email to reset password"
              labelPlacement="outside"
              placeholder="Email"
            />
          </ModalForm>
        </p>
      )}
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
