'use client'

import { ShieldCloseIcon } from 'lucide-react'
import * as React from 'react'
import { createPortal } from 'react-dom'
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast'
import { cn } from '@/lib/utils'

type ToastCustomProps = {
  icon?: React.ReactNode
  children: React.ReactNode
  title?: string
  description?: string
}

const ToastCustom = ({
  icon,
  children,
  title = 'Notification Title',
  description,
}: ToastCustomProps) => {
  const [open, setOpen] = React.useState(false)
  const timerRef = React.useRef(0)

  React.useEffect(() => {
    return () => clearTimeout(timerRef.current)
  }, [])

  return (
    <>
      <button
        className="Button large violet text-white"
        onClick={() => {
          setOpen(false)
          window.clearTimeout(timerRef.current)
          timerRef.current = window.setTimeout(() => {
            setOpen(true)
          }, 100)
        }}
      >
        {children}
      </button>
      {createPortal(
        <ToastProvider swipeDirection="up">
          <Toast
            className="bg-primary-6/5 backdrop-blur-2xl"
            open={open}
            onOpenChange={setOpen}
          >
            <ToastTitle className="ToastTitle">
              <div className="flex items-center justify-between w-full">
                {icon ? <div className="mr-2">{icon}</div> : null}
                <div className="text-neutral-dark-1 text-base not-italic font-bold leading-6 font-inter">
                  {title}
                </div>
              </div>
            </ToastTitle>
            {description ? (
              <ToastDescription asChild>
                <div
                  className={cn(
                    'text-neutral-dark-1 font-normal leading-[22px] font-poppins',
                    icon ? 'ml-[34px]' : 'ml-0',
                  )}
                >
                  {description}
                </div>
              </ToastDescription>
            ) : null}
            <ToastAction
              className="ToastAction"
              asChild
              altText=""
            ></ToastAction>
            <ToastClose className="text-neutral-dark-1">
              <ShieldCloseIcon />
            </ToastClose>
          </Toast>
          <ToastViewport className="ToastViewport" />
        </ToastProvider>,
        document.body,
      )}
    </>
  )
}

export default ToastCustom
