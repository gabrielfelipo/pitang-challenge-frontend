import { ImageProps } from '@nextui-org/react'
import { Image } from './Image'

type IconProps = {
  name: string
} & ImageProps

export const Icon = ({ name, ...props }: IconProps) => {
  return <Image src={'/' + name + '.svg'} {...props} />
}
