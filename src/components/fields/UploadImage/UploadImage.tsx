import Button from '@components/elements/Button'
import ICONS from '@configs/icons'
import IMAGES from '@configs/images'
import { useWindowWidth } from '@utils/hooks'
import { clsx } from '@utils/index'
import {
  type HTMLAttributes,
  type InputHTMLAttributes,
  useRef,
  useState,
} from 'react'
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
  type UseControllerProps,
} from 'react-hook-form'
import Skeleton from 'react-loading-skeleton'

type Props<T extends FieldValues> = {
  control?: Control<T, unknown>
  error?: string | FieldError
  isDisabled?: boolean
  isLoading?: boolean
  label?: string
  name: Path<T>
  onUpload?: (image?: File) => void
  readonly required?: boolean
  success?: boolean
} & InputHTMLAttributes<HTMLInputElement> &
  HTMLAttributes<HTMLDivElement> &
  UseControllerProps<T>

export function UploadImage<T extends FieldValues>({
  className,
  control,
  name,
  error,
  onUpload,
  isDisabled,
  isLoading,
  label,
  ...props
}: Props<T>) {
  const ref = useRef<HTMLInputElement>(null)
  const [image, setImage] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState(error)

  const windowWidth = useWindowWidth()
  const isMobile = windowWidth <= 640

  return (
    <div {...props} className={className}>
      <div className="flex items-center">
        {control ? (
          <Controller
            {...props}
            control={control}
            name={name}
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error: hookError },
            }) => {
              if (!image) {
                setErrorMessage(errorMessage || hookError?.message)
              }
              if (!value?.name) {
                setImageUrl(value)
              }
              return (
                <>
                  <input
                    {...props}
                    accept="image/png, image/jpg, image/jpeg"
                    className="w-0 transform scale-0 opacity-0"
                    name={name}
                    onBlur={onBlur}
                    onChange={(event) => {
                      const { files } = event.target

                      if (!files?.length) return
                      const size = Number(
                        (files[0].size / 1024 / 1024).toFixed(2)
                      )
                      const format = files[0].type
                      if (size > Number(2)) {
                        setErrorMessage('Ukuran file gambar terlalu besar')
                        setImage(null)
                        onChange('')
                        setImageUrl(null)
                        return
                      }
                      if (
                        !['image/png', 'image/jpg', 'image/jpeg'].includes(
                          format
                        )
                      ) {
                        setErrorMessage('Format file gambar tidak didukung')
                        setImage(null)
                        onChange('')
                        setImageUrl(null)
                        return
                      }
                      const file = files[0] as unknown as File
                      setImage(file)
                      onChange(file)
                      setErrorMessage('')
                      setImageUrl(null)
                    }}
                    ref={ref}
                    type="file"
                  />
                  {value ? (
                    <Button
                      className="max-h-[2.35rem] order-3 self-end -ml-64"
                      disabled={isDisabled}
                      leftIcon={<ICONS.Trash />}
                      onClick={() => {
                        ref.current!.files = null
                        ref.current!.value = ''
                        setImage(null)
                        onChange('')
                        setImageUrl(null)
                      }}
                    >
                      Hapus
                    </Button>
                  ) : null}
                </>
              )
            }}
          />
        ) : (
          <input
            {...props}
            accept="image/png, image/jpg, image/jpeg"
            className="w-0 transform scale-0 opacity-0"
            name={name}
            onChange={(event) => {
              const { files } = event.target

              if (!files?.length) return
              const size = Number((files[0].size / 1024 / 1024).toFixed(2))
              const format = files[0].type
              if (size > Number(2)) {
                setErrorMessage('Ukuran file gambar terlalu besar')
                return
              }
              if (!['image/png', 'image/jpg', 'image/jpeg'].includes(format)) {
                setErrorMessage('Format file gambar tidak didukung')
                return
              }
              const file = files[0] as unknown as File
              setImage(file)
              if (props.onChange) props.onChange(event)
              setErrorMessage('')
            }}
            ref={ref}
            type="file"
          />
        )}
        {isLoading ? (
          <Skeleton height={100} width={130} />
        ) : (
          <img
            alt="Icon"
            className={clsx([
              'h-[100px] w-[100px] rounded-md',
              image || imageUrl ? 'object-contain' : 'object-cover',
            ])}
            src={
              imageUrl ||
              (image ? URL.createObjectURL(image) : IMAGES.NullImage)
            }
          />
        )}
        <div className="flex flex-col justify-between h-[100px] ml-6">
          <h6
            className={clsx([
              'font-semibold text-primary-3',
              isMobile ? 'text-base' : 'text-lg',
            ])}
          >
            {label || 'Gambar'}
          </h6>
          <p className="text-sm text-neutral-600">
            Format yang didukung .jpg .jpeg dan .png (Maks. 2MB)
          </p>
          <div className="flex space-x-4 item-center">
            <Button
              className="self-start"
              disabled={isDisabled}
              leftIcon={<ICONS.Upload />}
              onClick={() => {
                if (image && onUpload) {
                  onUpload(image)
                  return
                }
                ref.current?.click()
              }}
              type="button"
              variant="outline"
            >
              {image || imageUrl ? 'Unggah' : 'Pilih Gambar'}
            </Button>
            {image && !control ? (
              <Button
                className="self-start max-h-[2.35rem]"
                disabled={isDisabled}
                leftIcon={<ICONS.Trash />}
                onClick={() => {
                  ref.current!.files = null
                  ref.current!.value = ''
                  setImage(null)
                }}
              >
                Hapus
              </Button>
            ) : null}
          </div>
        </div>
      </div>
      {typeof errorMessage === 'string' ? (
        <p className="mt-2 text-sm text-danger-500">{errorMessage}</p>
      ) : null}
    </div>
  )
}
