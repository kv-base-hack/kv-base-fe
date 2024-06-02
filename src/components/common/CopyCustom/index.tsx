import SuccessNotiIcon from '@/components/shared/icons/SuccessNotiIcon'
import dynamic from 'next/dynamic'
import CopyToClipboard from 'react-copy-to-clipboard'

const ToastCustom = dynamic(() => import('@/components/common/Toast'), {
  ssr: false,
})

export const CopyCustom = ({
  value,
  icon,
}: {
  value: string
  icon?: React.ReactNode
}) => {
  return (
    // @ts-ignore
    <CopyToClipboard text={value}>
      <button onClick={() => null}>
        <ToastCustom title="Copy Successful!" icon={<SuccessNotiIcon />}>
          {icon}
        </ToastCustom>
      </button>
    </CopyToClipboard>
  )
}
