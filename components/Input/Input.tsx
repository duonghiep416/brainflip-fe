'use client';

import Text from '@/components/Text';
import clsx from 'clsx';
import React, {
  ForwardedRef,
  forwardRef,
  ReactNode,
  useEffect,
  useId,
} from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

function getNestedError(errors: any, name: string): string | undefined {
  return name.split('.').reduce((acc, part) => acc && acc[part], errors)
    ?.message;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  icons?: React.ReactNode;
  containerStyles?: string;
  error?: string;
  labelStyles?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  styleIcon?: string;
  rules?: any;
  isEndIcon?: boolean;
  isRemoveVietNameseTone?: boolean;
  isCurrency?: boolean;
  groupsRequired?: string[];
}

const Input = (
  {
    name,
    label,
    onChange,
    icons,
    value,
    error = '',
    rules = {},
    containerStyles,
    labelStyles,
    styleIcon,
    className,
    defaultValue,
    isEndIcon,
    isCurrency = false,
    isRemoveVietNameseTone = false,
    disabled,
    groupsRequired,
    ...props
  }: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  const formMethods = useFormContext();
  const generateId = useId();
  const id = props?.id || generateId;
  const inputsGroup = formMethods?.watch(groupsRequired || []);
  const validateGroup = () => {
    const filledInputs = inputsGroup.filter(
      input => input && input.trim() !== '',
    );
    if (filledInputs.length > 0) {
      return filledInputs.length === inputsGroup?.length;
    }
    return true;
  };
  if (!formMethods) {
    throw new Error('Input component must be used within a Form Component');
  }
  const {
    unregister,
    register,
    setValue,
    formState: { errors },
  } = formMethods;
  useEffect(() => {
    setValue(name, value);
    return () => {
      unregister(name);
    };
  }, [value]);
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    if (isCurrency) {
      const value = e.target.value.replace(/[^0-9.]/g, '');
      e.target.value = value;
    }

    await register(
      name,
      groupsRequired
        ? {
            ...rules,
            validate:
              validateGroup || 'Vui lòng nhập tất cả các trường trong nhóm',
          }
        : rules,
    ).onChange(e);
    if (onChange) {
      onChange(e);
    }
  };

  const errorMessage = getNestedError(errors, name) || error;
  const { ref: registerRef, ...rest } = register(
    name,
    groupsRequired
      ? {
          ...rules,
          validate:
            validateGroup || 'Vui lòng nhập tất cả các trường trong nhóm',
        }
      : rules,
  );
  return (
    <>
      <div className={clsx(containerStyles)}>
        {label && (
          <label htmlFor={id} className={labelStyles}>
            <Text>{label}</Text>
            {rules?.required && (
              <span className="text-error-500 w-2 h-2 flex items-center justify-center">
                *
              </span>
            )}
          </label>
        )}
        <div className="relative w-full">
          <input
            className={clsx(
              icons && !isEndIcon ? 'pl-9' : 'pl-2',
              'border w-full pr-3 py-2 rounded-md focus:outline-none',
              errors[name] || errorMessage
                ? 'border-error-500'
                : 'border-slate-300',
              disabled ? 'bg-neutral-200' : '',
              className,
            )}
            id={props?.id || id}
            {...rest}
            onChange={handleChange}
            autoComplete="off"
            autoCorrect="off"
            defaultValue={defaultValue}
            ref={e => {
              registerRef(e);
              if (ref && 'current' in ref) {
                ref.current = e;
              }
            }}
            {...props}
            disabled={disabled}
          />
          {icons && <div className={clsx('absolute', styleIcon)}>{icons}</div>}
        </div>
        {errorMessage && (
          <p className="text-error-500 text-sm mt-1">
            {errorMessage as ReactNode}
          </p>
        )}
      </div>
    </>
  );
};

export default forwardRef<HTMLInputElement, InputProps>(Input);
