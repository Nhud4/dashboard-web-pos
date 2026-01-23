import ICONS from '@configs/icons'
import { clsx } from '@utils/index'
import { type HTMLAttributes, useEffect, useRef, useState } from 'react'

import PopUpActions from './Actions'

type Props = HTMLAttributes<HTMLDivElement> & {
  actions?: Actions[]
  labelStatus?: string[]
  onDelete?: () => void
  onDetail?: () => void
  onEdit?: () => void
  onStatus?: () => void
  status?: 'active' | 'inactive'
  value: string | React.ReactNode
  variant?: 'success' | 'info'
}

export const PopUp: React.FC<Props> = ({
  value,
  actions,
  onEdit,
  onDetail,
  onDelete,
  onStatus,
  className,
  status,
  labelStatus,
  ...props
}) => {
  const [showModal, setShowModal] = useState(false)
  const Popupref = useRef<HTMLDivElement>(null)
  const openModal = () => {
    setShowModal(!showModal)
  }
  const CloseDot = () => {
    setShowModal(false)
  }
  const ClosePopUp = (event: MouseEvent) => {
    if (Popupref.current && !Popupref.current.contains(event.target as Node)) {
      setShowModal(false)
    }
  }

  useEffect(() => {
    if (showModal) {
      document.addEventListener('click', ClosePopUp)
    } else {
      document.removeEventListener('click', ClosePopUp)
    }

    return () => {
      document.removeEventListener('click', ClosePopUp)
    }
  }, [showModal])

  return (
    <div
      {...props}
      className={clsx(['flex items-center justify-between w-full', className])}
      ref={Popupref}
    >
      <div className="w-[60%]">{value}</div>
      <button
        className="flex items-center justify-center rounded-full shadow-xl w-7 h-7"
        onClick={openModal}
      >
        <ICONS.Dot />
      </button>
      {/* <div ref={Popupref}> */}
      <button onClick={CloseDot}>
        {showModal ? (
          <div className="absolute z-30 flex justify-center bg-white rounded-md shadow-xl right-8 top-12 w-36">
            <div className="grid w-36">
              <PopUpActions
                actions={actions}
                labelStatus={labelStatus}
                onDelete={onDelete}
                onDetail={onDetail}
                onEdit={onEdit}
                onStatus={onStatus}
                status={status}
              />
            </div>
          </div>
        ) : null}
      </button>
    </div>
  )
}
