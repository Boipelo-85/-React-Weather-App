type ButtonProp = {
        label : string,
        className?: string,
        onClick?: () => void
}
export const Button = ({label,className, onClick}: ButtonProp) => {
  return (
    <button 
        className={`${className || ''}`}
        onClick={onClick}
    >
        {label}
    </button>
  )
}
