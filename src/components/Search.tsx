import { TextInput } from "flowbite-react"
import { FaSearch } from "react-icons/fa"
import { useState } from "react"

type SearchProps = {
  onEnter: (value: string) => void,
  className?: string
}

export default function Search({ onEnter, className }: SearchProps) {
  const [value, setValue] = useState('')

  return (
    <div className={className}>
      <TextInput 
        placeholder="Пошук" 
        icon={FaSearch}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onEnter(value)
        }}
      />
    </div>
  )
}
