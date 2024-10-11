'use client';
import Text from '@/components/Text';
import clsx from 'clsx';
import React, { forwardRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export interface FormInterface {
  children: React.ReactNode;
  onSubmit: (data: Record<string, any>) => void;
  formMethodsRef?: (methods: ReturnType<typeof useForm>) => void; // New prop to pass form methods
  [key: string]: any;
}
const Form = (
  { children, onSubmit, formMethodsRef, ...props }: FormInterface,
  ref: React.Ref<HTMLFormElement>,
) => {
  const formMethods = useForm<Record<string, any>>();
  {
    mode: 'onTouched';
  }

  // Pass form methods back to parent via callback
  if (formMethodsRef) formMethodsRef(formMethods);

  return (
    <div className={clsx('w-full', props.className)}>
      {props?.title && (
        <Text as={'h2'} className={clsx(props.description ? 'mb-2' : 'mb-10')}>
          {props.title}
        </Text>
      )}
      {props?.description && (
        <Text
          as={'p'}
          className="mb-10 font-normal text-[#00000066] text-center text-sm"
        >
          {props.description}
        </Text>
      )}
      <FormProvider {...formMethods}>
        <form
          noValidate
          onSubmit={e => {
            e.preventDefault();
            formMethods.handleSubmit(onSubmit)(e);
          }}
          className={clsx('w-full', props.classNameForm)}
          ref={ref}
        >
          {children}
        </form>
      </FormProvider>
    </div>
  );
};

export default forwardRef<HTMLFormElement, FormInterface>(Form);
