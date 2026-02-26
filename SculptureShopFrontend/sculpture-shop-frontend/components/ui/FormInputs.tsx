"use client";

// ============================================
// Form Input Components for Formik
// ============================================

import React from "react";
import { useField } from "formik";

// Text Input
interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  helpText?: string;
}

export const TextInput: React.FC<TextInputProps> = ({ label, helpText, ...props }) => {
  const [field, meta] = useField(props.name);
  const hasError = meta.touched && meta.error;

  return (
    <div className="mb-4">
      <label htmlFor={props.name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {props.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        {...field}
        {...props}
        id={props.name}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
          hasError ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-amber-200 focus:border-amber-500"
        }`}
      />
      {helpText && !hasError && <p className="mt-1 text-sm text-gray-500">{helpText}</p>}
      {hasError && <p className="mt-1 text-sm text-red-500">{meta.error}</p>}
    </div>
  );
};

// Textarea
interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  helpText?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, helpText, ...props }) => {
  const [field, meta] = useField(props.name);
  const hasError = meta.touched && meta.error;

  return (
    <div className="mb-4">
      <label htmlFor={props.name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {props.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        {...field}
        {...props}
        id={props.name}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors resize-vertical ${
          hasError ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-amber-200 focus:border-amber-500"
        }`}
      />
      {helpText && !hasError && <p className="mt-1 text-sm text-gray-500">{helpText}</p>}
      {hasError && <p className="mt-1 text-sm text-red-500">{meta.error}</p>}
    </div>
  );
};

// Select
interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: SelectOption[];
  placeholder?: string;
  helpText?: string;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  label,
  options,
  placeholder = "Select an option",
  helpText,
  ...props
}) => {
  const [field, meta] = useField(props.name);
  const hasError = meta.touched && meta.error;

  return (
    <div className="mb-4">
      <label htmlFor={props.name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {props.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        {...field}
        {...props}
        id={props.name}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
          hasError ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-amber-200 focus:border-amber-500"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helpText && !hasError && <p className="mt-1 text-sm text-gray-500">{helpText}</p>}
      {hasError && <p className="mt-1 text-sm text-red-500">{meta.error}</p>}
    </div>
  );
};

// Checkbox
interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  name: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  const hasError = meta.touched && meta.error;

  return (
    <div className="mb-4">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          {...field}
          {...props}
          className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
        />
        <span className="text-sm text-gray-700">{label}</span>
      </label>
      {hasError && <p className="mt-1 text-sm text-red-500">{meta.error}</p>}
    </div>
  );
};

// Number Input
interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  name: string;
  prefix?: string;
  suffix?: string;
  helpText?: string;
}

export const NumberInput: React.FC<NumberInputProps> = ({ label, prefix, suffix, helpText, ...props }) => {
  const [field, meta] = useField(props.name);
  const hasError = meta.touched && meta.error;

  return (
    <div className="mb-4">
      <label htmlFor={props.name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {props.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{prefix}</span>}
        <input
          type="number"
          {...field}
          {...props}
          id={props.name}
          className={`w-full py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
            prefix ? "pl-8" : "pl-4"
          } ${suffix ? "pr-12" : "pr-4"} ${
            hasError
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-amber-200 focus:border-amber-500"
          }`}
        />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">{suffix}</span>}
      </div>
      {helpText && !hasError && <p className="mt-1 text-sm text-gray-500">{helpText}</p>}
      {hasError && <p className="mt-1 text-sm text-red-500">{meta.error}</p>}
    </div>
  );
};
