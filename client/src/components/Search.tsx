import { Input } from "antd"
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
      <Input 
        placeholder="Пошук" 
        prefix={<FaSearch/>}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onEnter(value)
        }}
        size="large"
      />
    </div>
  )
}
