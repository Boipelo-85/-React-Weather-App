import React from 'react'



type ButtonProp = {



  label: string,

  className?: string

}

export const Button: React.FC<ButtonProp> = ({ label, className }) => {

  return (



    <button

      className={`${className || ''}`}

    >

      {label}

    </button>

  )

}

