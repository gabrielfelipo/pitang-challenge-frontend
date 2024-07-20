import NiceModal, { useModal } from '@ebay/nice-modal-react'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from './Modal'
import { Button } from './Button'
import { Icon } from './Icon'

type DialogProps = {
  title: string
  subtitle: string
  firstButton: {
    label: string
    onClick: () => void
  }
  secondButton?: {
    label: string
    onClick: () => void
  }
  type?: 'success' | 'fail'
  icon?: string
}

export const Dialog = NiceModal.create(
  ({ type, icon, title, subtitle, firstButton, secondButton }: DialogProps) => {
    const modal = useModal()

    return (
      <Modal isDismissable={false} isOpen={modal.visible} onClose={modal.hide}>
        <ModalContent>
          {(type || icon) && (
            <ModalHeader className="w-full items-center flex justify-center">
              <Icon
                name={(type || icon) as string}
                alt="icon"
                className="w-[4.5rem] h-[4.5rem]"
              />
            </ModalHeader>
          )}

          <ModalBody className="flex items-center my-2 justify-center">
            <h1 className="text-2xl my-2 font-bold text-center">{title}</h1>

            <p className="text-base text-center">{subtitle}</p>
          </ModalBody>

          <ModalFooter className="flex flex-col items-center justify-center w-full">
            {firstButton && (
              <Button className="w-60" onClick={firstButton.onClick}>
                {firstButton.label}
              </Button>
            )}

            {secondButton && (
              <Button
                className="w-60"
                variant="bordered"
                onClick={secondButton.onClick}
              >
                {secondButton.label}
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  }
)

export const useDialog = () => useModal(Dialog)
