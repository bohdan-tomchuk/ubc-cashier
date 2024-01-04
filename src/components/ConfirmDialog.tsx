import { FaExclamationCircle } from 'react-icons/fa'
import { Button, Modal } from 'flowbite-react'

interface ConfirmDialogProps {
  confirmType: 'remove' | `edit`,
  isOpen: boolean,
  onClose: () => void,
  onConfirm: () => void,
  onCancel: () => void
}

export default function ConfirmDialog({ confirmType, isOpen, onClose, onConfirm, onCancel }: ConfirmDialogProps) {

  return (
    <Modal show={isOpen} size="sm" onClose={onClose} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <FaExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {
              confirmType === 'remove'
                ? 'Ви впевнені, що хочете видалити цей товар?'
                : 'Ви впевнені, що хочете редагувати цей товар?'
            }
          </h3>
          <div className="flex justify-center gap-4">
            <Button color={confirmType === 'remove' ? 'failure' : 'default'} onClick={onConfirm}>
              {
                confirmType === 'remove'
                  ? 'Видалити'
                  : 'Редагувати'
              }
            </Button>
            <Button color="gray" onClick={onCancel}>
              Відміна
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
