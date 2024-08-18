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
    <div className="flex items-center rounded-lg bg-neutral-03 px-3 py-2">
      <input
        type={type}
        step={step}
        onChange={onChange}
        value={value.toString()}
        placeholder={placeholder}
        className="flex w-full flex-1 border-none bg-transparent text-neutral-07 outline-none"
        {...props}
      />
      <div className="ml-1">{icon}</div>
    </div>
  )
}
