'use client';
import Form from '@/components/Form/Form';
import Input from '@/components/Input/Input';
import { emailRegex, passwordRegex } from '@/utils/regex';
import { Button } from '@nextui-org/react';
import React from 'react';

export const FormAuth = () => {
  return (
    <Form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        console.log('e', e);
      }}
    >
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
        className="w-full mt-5"
      >
        Login
      </Button>
    </Form>
  );
};
