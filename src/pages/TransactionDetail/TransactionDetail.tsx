import Layout from '@components/layout'
import BaseCard from '@components/modules/BaseCard'
import LoadingText from '@components/modules/LoadingText'
import IMAGES from '@configs/images'
import { useQuerySlice } from '@redux/hooks'
import { clearTransaction } from '@redux/slices/transaction'
import { fetchDetailTransaction } from '@redux/slices/transaction/action'
import { clsx, formatIDR } from '@utils/index'
import type React from 'react'
import { useParams } from 'react-router-dom'

import styles from './styles.module.css'

export const TransactionDetail: React.FC = () => {
  const { id = '' } = useParams()

  const { data, loading } = useQuerySlice<
    TransactionDetail | null,
    { id: string }
  >({
    clearSlice: clearTransaction('detail'),
    initial: id,
    key: 'detail',
    slice: 'transaction',
    thunk: fetchDetailTransaction(id),
  })

  return (
    <Layout title="Detail Transaksi">
      <section className="page layout overflow-y-auto">
        <div className={styles.container}>
          <BaseCard className="lg:col-span-2 h-fit">
            {/* header */}
            <div className={styles.header}>
              <div className={styles.info}>
                <h2>No Transaksi</h2>
                <LoadingText data={data?.code} loading={loading} />
              </div>

              <div className={styles.info}>
                <h2>Tanggal</h2>
                <LoadingText data={data?.transactionDate} loading={loading} />
              </div>

              <div className={styles.info}>
                <h2>Kasir</h2>
                <LoadingText data={data?.createdBy} loading={loading} />
              </div>
            </div>

            {/* order info */}
            <div className="py-4">
              <h1 className="font-semibold">Informasi Pesanan</h1>
              <div className="pt-4 grid grid-cols-3 gap-4">
                <div className={styles.info}>
                  <h2>Pelanggan</h2>
                  <LoadingText data={data?.customerName} loading={loading} />
                </div>
                <div className={styles.info}>
                  <h2>No Meja</h2>
                  <LoadingText data={data?.tableNumber} loading={loading} />
                </div>
                <div className={styles.info}>
                  <h2>Jenis Transaksi</h2>
                  <LoadingText data={data?.deliveryType} loading={loading} />
                </div>
              </div>
            </div>

            {/* product info */}
            <div>
              <h1 className="font-semibold">Informasi Menu</h1>
              {data?.items?.map((item, index) => (
                <div
                  className={clsx([
                    'space-y-4 pt-4',
                    index !== 0 ? 'border-t pt-4' : '',
                  ])}
                >
                  <div className="flex items-center gap-4" key={index}>
                    <img
                      alt="product"
                      className="object-cover h-20 w-20 rounded-lg bg-primary-3"
                      src={IMAGES.Food}
                    />
                    <div className="space-y-2">
                      <h1 className="capitalize font-semibold">{item.name}</h1>
                      <h2 className="text-sm text-neutral-5">
                        Qty: {item.qty}
                      </h2>

                      {item.discount > 0 ? (
                        <div className="flex items-center gap-4">
                          <p className="text-sm font-semibold text-neutral-3 line-through">
                            {formatIDR(item.subtotal)}
                          </p>
                          <p className="text-sm font-semibold text-orange">
                            {formatIDR(item.subtotal)}
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm font-semibold text-orange">
                          {formatIDR(item.subtotal)}
                        </p>
                      )}
                    </div>
                  </div>
                  {item.note ? (
                    <div className="p-4 border border-border rounded-lg">
                      {item.note}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </BaseCard>

          <BaseCard className="space-y-2 h-fit">
            <h1 className="font-semibold">Ringkasan Pembayaran</h1>
            <div className={styles.paymentInfo}>
              <h2>Metode Pembayaran</h2>
              <LoadingText data={data?.paymentMethod} loading={loading} />
            </div>
            <div className={styles.paymentInfo}>
              <h2>Statsu Pembayaran</h2>
              <LoadingText data={data?.paymentStatus} loading={loading} />
            </div>
            <div className={styles.paymentInfo}>
              <h2>Subtotal</h2>
              <LoadingText
                data={formatIDR(data?.subtotal || 0)}
                loading={loading}
              />
            </div>
            <div className={styles.paymentInfo}>
              <h2>PPN</h2>
              <LoadingText data={formatIDR(data?.ppn || 0)} loading={loading} />
            </div>
            <div className={styles.paymentInfo}>
              <h2>Total Bayar</h2>
              <LoadingText
                data={formatIDR(data?.payment || 0)}
                loading={loading}
              />
            </div>
            <div className={styles.paymentInfo}>
              <h2>Kembalian</h2>
              <LoadingText
                data={formatIDR((data?.payment || 0) - (data?.bill || 0))}
                loading={loading}
              />
            </div>
            <div className={clsx([styles.paymentInfo, 'pt-4 border-t'])}>
              <h3>Total tagihan</h3>
              <LoadingText
                className="!text-orange"
                data={formatIDR(data?.bill || 0)}
                loading={loading}
              />
            </div>
          </BaseCard>
        </div>
      </section>
    </Layout>
  )
}
