import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

export default function Select({ name, label, children, ...rest }) {
    const selectRef = useRef(null)
  
    const { fieldName, defaultValue, registerField, error } = useField(name)
  
    useEffect(() => {
      registerField({
        ref: selectRef,
        name: fieldName,
        getValue: ref => {
          return ref.current?.value
        },
        setValue: (ref, newValue) => {
          ref.current.value = newValue
        },
        clearValue: ref => {
          ref.current.value = ''
        },
      })
    }, [fieldName, registerField])
  
    return (
      <div>
        <label htmlFor={fieldName}>{label}</label>
  
        <select
          id={fieldName}
          ref={selectRef}
          defaultValue={defaultValue}
          {...rest}
        >
          {children}
        </select>
  
        {  error && <span style={{ color: '#f00'}}>{error}</span> }
      </div>
    )
  }