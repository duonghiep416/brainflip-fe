'use client';

import Form from '@/components/Form/Form';
import Input from '@/components/Input/Input';
import { ModalForm } from '@/components/Modal/ModalForm';
import {
  useLoginMutation,
  useRegisterMutation,
  useRequestResetPasswordMutation,
} from '@/features/auth/authApiSlice';
import {
  LoginCredentials,
  RegisterCredentials,
  RequestResetPasswordCredentials,
} from '@/features/auth/types';
import { parseDuration } from '@/utils/dateTime';
import { emailRegex, passwordRegex } from '@/utils/regex';
import { getLocalTimeZone, today } from '@internationalized/date';
import { Button, DatePicker, Link } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Input as InputNextUI } from '@nextui-org/react';
import { useLoading } from '@/components/Providers/LoadingProvider';

export const FormAuth = ({
  formType,
  handleTabChange,
}: {
  formType: 'login' | 'signup';
  handleTabChange: (key: 'login' | 'signup') => void;
}) => {
  const router = useRouter();
  const formMethods = useForm<Record<string, any>>(); // Use formMethods directly
  const [emailResetPassword, setEmailResetPassword] = useState('');
  const { showLoading, hideLoading } = useLoading();
  const [login, { isLoading: isLoadingLogin, error: errorLogin }] =
    useLoginMutation();

  const [register, { isLoading: isLoadingRegister, error: errorRegister }] =
    useRegisterMutation();

  const [
    requestResetPassword,
    {
      isLoading: isLoadingRequestResetPassword,
      error: errorRequestResetPassword,
    },
  ] = useRequestResetPasswordMutation();

  // Reset form when the form type changes
  useEffect(() => {
    formMethods.reset();
  }, [formType]);

  const handleLogin = async (body: LoginCredentials) => {
    try {
      const userData = await login(body).unwrap();
      document.cookie = `auth-token=${
        userData.accessToken.value
      }; path=/; max-age=${parseDuration(userData.accessToken.expiresIn)};`;
      document.cookie = `auth-refresh-token=${
        userData.refreshToken.value
      }; path=/; max-age=${parseDuration(userData.refreshToken.expiresIn)};`;
      router.push('/');
    } catch (err: any) {
      toast.error(err.data.message);
    }
  };

  const handleRegister = async (body: RegisterCredentials) => {
    try {
      await register(body).unwrap();
      toast.success('Registration successful!');
      handleTabChange('login');
    } catch (err: any) {
      toast.error(err.data.message);
    }
  };

  const handleRequestResetPassword = async (
    body: RequestResetPasswordCredentials,
  ) => {
    try {
      const requestResetPasswordData = await requestResetPassword(
        body,
      ).unwrap();
      toast.success(requestResetPasswordData.message, {
        duration: 20000,
      });
    } catch (err: any) {
      toast.error(err.data.message);
    }
  };

  useEffect(() => {
    if (isLoadingLogin || isLoadingRegister || isLoadingRequestResetPassword) {
      showLoading();
    } else {
      hideLoading();
    }

    return () => {
      hideLoading();
    };
  }, [isLoadingLogin, isLoadingRegister, isLoadingRequestResetPassword]);

  return (
    <Form
      onSubmit={(data: Record<string, any>) => {
        if (formType === 'signup') {
          if (data?.dob) {
            const selectedDate = new Date(data.dob);
            if (selectedDate > new Date()) {
              toast.error('Invalid date of birth');
              return;
            }
            data.dob = selectedDate.toISOString();
          }
          handleRegister(data as RegisterCredentials);
        } else {
          handleLogin(data as LoginCredentials);
        }
      }}
      formMethods={formMethods} // Pass formMethods directly
    >
      {formType === 'signup' && (
        <>
          <Controller
            name="dob"
            control={formMethods.control}
            render={({ field }) => (
              <DatePicker
                {...field}
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
        <div className="text-right mt-2 text-sm flex justify-end">
          Forgot password?{' '}
          <ModalForm
            nodeTrigger={
              <Link
                href="#"
                onClick={e => {
                  e.preventDefault();
                }}
                size="sm"
              >
                Reset it
              </Link>
            }
            onSubmit={() => {
              handleRequestResetPassword({ email: emailResetPassword });
            }}
            actionButtonText="Send"
            header="Reset password"
            backdrop="opaque"
          >
            <InputNextUI
              label="Enter your email to reset password"
              labelPlacement="outside"
              placeholder="Email"
              name="email"
              value={emailResetPassword}
              onChange={e => {
                setEmailResetPassword(e.target.value);
              }}
            />
          </ModalForm>
        </div>
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
