import {
  ModalBodyProps,
  ModalContentProps,
  ModalFooterProps,
  ModalHeaderProps,
  ModalProps,
  Modal as NUIModal,
  ModalBody as NUIModalBody,
  ModalContent as NUIModalContent,
  ModalFooter as NUIModalFooter,
  ModalHeader as NUIModalHeader,
} from '@nextui-org/react'

export const Modal = (props: ModalProps) => {
  return (
    <NUIModal
      backdrop="blur"
      hideCloseButton
      {...props}
      classNames={{
        wrapper: 'border-3',
        backdrop: 'bg-opacity-80 bg-black',
        base: 'bg-white p-6',
        ...props.classNames,
      }}
    />
  )
}

export const ModalBody = (props: ModalBodyProps) => {
  return <NUIModalBody {...props} />
}

export const ModalFooter = (props: ModalFooterProps) => {
  return <NUIModalFooter {...props} />
}

export const ModalHeader = (props: ModalHeaderProps) => {
  return <NUIModalHeader {...props} />
}

export const ModalContent = (props: ModalContentProps) => {
  return <NUIModalContent {...props} />
}
