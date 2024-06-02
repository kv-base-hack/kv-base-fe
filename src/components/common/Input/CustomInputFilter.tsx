export const CustomInputFilter = ({
  icon,
  placeholder,
  onChange,
  value,
  type = 'text',
  step,
  ...props
}: {
  placeholder: string
  value: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  icon?: React.ReactNode
  type?: any
  step?: any
}) => {
  return (
    <div className="flex items-center py-2 px-3">
      <input
        type={type}
        step={step}
        onChange={onChange}
        value={value.toString()}
        placeholder={placeholder}
        className="flex flex-1 w-full bg-transparent border-none outline-none text-white"
        {...props}
      />
      <div className="ml-1">{icon}</div>
    </div>
  )
}
