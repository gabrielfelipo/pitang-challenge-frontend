import { Select, SelectItem } from '@nextui-org/react'
import { Chip } from '~/components/Chip'

type EnumData = {
  name: string
  value: string
}

type SelectEnumProps = {
  scheduleId: string
  data: EnumData[]
  defaultValue?: string
}

export const SelectEnum = ({
  scheduleId,
  data,
  defaultValue,
}: SelectEnumProps) => {
  const handleChange = (value: string) => {
    console.log(
      'Send value and schedule id to api to update schedule:',
      value,
      scheduleId
    )
  }

  return (
    <Select
      size="sm"
      items={data}
      variant="bordered"
      placeholder="Select a status"
      aria-label='Select from enum'
      classNames={{
        base: 'max-w-xs',
        trigger: 'h-6',
      }}
      defaultSelectedKeys={defaultValue ? [defaultValue as string] : ''}
      renderValue={(items) => {
        return (
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <Chip key={item.key} size="sm">
                {item.data?.name}
              </Chip>
            ))}
          </div>
        )
      }}
      onChange={(value) => handleChange(value.target.value)}
    >
      {(data) => (
        <SelectItem key={data.value} textValue={data.name}>
          <div className="flex gap-2 items-center">
            <span className="text-small">{data.name}</span>
          </div>
        </SelectItem>
      )}
    </Select>
  )
}
