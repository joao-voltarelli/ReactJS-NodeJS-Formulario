import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

export default function Checkbox({ name, value, label, ...rest }) {
    const inputRef = useRef()
    const { fieldName, defaultValue, registerField, error } = useField(name)
  
    const defaultChecked = defaultValue === value
  
    useEffect(() => {
      registerField({
        name: fieldName,
        ref: inputRef,
        getValue: ref => {
          return ref.current.checked
        },
        clearValue: ref => {
          ref.current.checked = defaultChecked
        },
        setValue: (ref, value) => {
          ref.current.checked = value
        },
      })
    }, [defaultValue, fieldName, registerField, defaultChecked])
  
    return (
      <div>
        <input
          defaultChecked={defaultChecked}
          ref={inputRef}
          value={value}
          type="checkbox"
          id={fieldName}
          {...rest}
        />
  
        <label htmlFor={fieldName} key={fieldName}>
          {label}
        </label>
  
        {error && <span>{error}</span>}
      </div>
    )
  }