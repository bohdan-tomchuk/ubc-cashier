import { useState } from 'react'
import { Modal, Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'


export default function IconPicker() {
  const [isOpen, setIsOpen] = useState(false)

  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button type="dashed" icon={<EditOutlined />} onClick={() => setIsOpen(true)}/>
      <Modal 
        title="Виберіть іконку" 
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        Test
      </Modal>
    </>
  )
}