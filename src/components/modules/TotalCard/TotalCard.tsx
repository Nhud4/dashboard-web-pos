import ICONS from '@configs/icons'
import { clsx, getStatusColor } from '@utils/index'
import { type HTMLAttributes } from 'react'

import LoadingText from '../LoadingText'
import styles from './styles.module.css'

type Props = Revenue &
  HTMLAttributes<HTMLDivElement> & {
    color?: string
    customName?: string
    icon?: React.ReactNode
    loading?: boolean
    name?: string
    shadow?: boolean
    status: 'success' | 'danger'
    value?: string
    percentage?: string
  }

export const TotalCard: React.FC<Props> = ({
  value,
  name,
  percentage,
  status = 'success',
  color = 'cyan',
  icon = '',
  className,
  style,
  loading,
  customName,
  shadow = true,
  ...props
}): React.ReactElement => {
  const statusColor = getStatusColor(status)

  return (
    <div
      {...props}
      className={clsx([styles.main, className, shadow ? 'shadow-card' : ''])}
      style={{ ...style, '--color': color } as React.CSSProperties}
    >
      <div className={styles.icon}>{icon}</div>
      <div className="space-y-1">
        <strong className="font-semibold text-black 2xl:text-lg">
          <LoadingText data={value} loading={loading} />
        </strong>
        <p className="text-xs font-semibold 2xl:text-sm">
          <LoadingText
            data={customName || `Jumlah ${name}`}
            loading={loading}
          />
        </p>
        {percentage ? (
          <LoadingText
            data={
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <div
                    className={
                      status === 'danger'
                        ? 'transform rotate-180 scale-x-[-1]'
                        : ''
                    }
                  >
                    <ICONS.Trending color={statusColor} />
                  </div>
                  <span
                    className="text-xs 2xl:text-sm"
                    style={{ color: statusColor }}
                  >
                    {percentage}
                  </span>
                </div>
                <p className="text-xs 2xl:text-sm text-gray-60">Bulan lalu</p>
              </div>
            }
            loading={loading}
          />
        ) : null}
      </div>
    </div>
  )
}
