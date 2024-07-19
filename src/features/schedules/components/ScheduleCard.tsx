import dayjs from "dayjs"
import {Card, CardBody} from "@nextui-org/react"

import { Schedule } from "~/types"
import { Conclusion, Status } from "~/constants"
import { arrayOfObjectsFromEnum } from '~/utils/arrayFromEnum'
import { SelectEnum } from "./SelectEnum"

type ScheduleCardProps = {
  schedule: Schedule
}

export const ScheduleCard = ({ schedule }: ScheduleCardProps) => {
  const { id, citizen, conclusion, status } = schedule
  return (
    <Card className="border-1 p-4 min-w-80 max-w-[350px]">
      <CardBody>
        <p className="flex gap-2">
          <p className="font-medium">Status:</p>
          <SelectEnum
            scheduleId={id}
            data={arrayOfObjectsFromEnum(Status)}
            defaultValue={status}
          />
        </p>
        <p className="flex gap-2"><p className="font-medium">Cidadão:</p> {citizen.name}</p>
        <p className="flex gap-2"><p className="font-medium">Data de nascimento:</p> {dayjs(citizen.birthDate).format('DD/MM/YYYY')}</p>
        <p className="flex gap-2">
          <p className="font-medium">Conclusão:</p>
          <SelectEnum
            scheduleId={id}
            data={arrayOfObjectsFromEnum(Conclusion)}
            defaultValue={conclusion}
          />
        </p>
      </CardBody>
    </Card>
  )
}