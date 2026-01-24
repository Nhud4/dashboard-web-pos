import Layout from '@components/layout'
import BaseCard from '@components/modules/BaseCard'
import LoadingText from '@components/modules/LoadingText'
import TotalCard from '@components/modules/TotalCard'
import ICONS from '@configs/icons'
import IMAGES from '@configs/images'
import TableProductHistory from '@features/TableProdukHistory'
import { useQuerySlice } from '@redux/hooks'
import { clearProducts } from '@redux/slices/products'
import { fetchDetailProducts } from '@redux/slices/products/action'
import { formatIDR } from '@utils/index'
import type React from 'react'
import { useParams } from 'react-router-dom'

import styles from './styles.module.css'

export const ProductDetail: React.FC = () => {
  const { id = '' } = useParams()

  const { data, loading } = useQuerySlice<ProductDetail | null, { id: string }>(
    {
      clearSlice: clearProducts('detail'),
      initial: id,
      key: 'detail',
      slice: 'products',
      thunk: fetchDetailProducts(id),
    }
  )

  const percentageFormat = (number: number) => {
    if (number > 100) {
      const fix = number.toString().substring(0, 2)
      return `${fix} %`
    }
    return `${number} %`
  }

  const isLoading = loading

  return (
    <Layout title="Detail Produk">
      <section className="page layout overflow-y-auto">
        <div className="space-y-6">
          <BaseCard className="space-y-4" title="Informasi Produk">
            <div className="grid grid-cols-2 gap-6">
              <div className="flex gap-6">
                <img
                  alt="foto"
                  className="object-cover h-36- w-36 rounded-lg"
                  src={IMAGES.Food}
                />

                <table>
                  <tbody className={styles.tableData}>
                    <tr>
                      <th>ID Menu</th>
                      <td>
                        <LoadingText data={data?.code} loading={isLoading} />
                      </td>
                    </tr>
                    <tr>
                      <th>Nama Menu</th>
                      <td>
                        <LoadingText data={data?.name} loading={isLoading} />
                      </td>
                    </tr>
                    <tr>
                      <th>Kategori Menu</th>
                      <td>
                        <LoadingText
                          data={data?.category?.name}
                          loading={isLoading}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Stock Menu</th>
                      <td>
                        <LoadingText data={data?.stock} loading={isLoading} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <table>
                  <tbody className={styles.tableData}>
                    <tr>
                      <th>HPP</th>
                      <td>
                        <LoadingText
                          data={formatIDR(data?.hpp || 0)}
                          loading={isLoading}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Harga Jual</th>
                      <td>
                        <LoadingText
                          data={formatIDR(data?.normalPrice || 0)}
                          loading={isLoading}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Diskon</th>
                      <td>
                        <LoadingText
                          data={`${data?.discount}%`}
                          loading={isLoading}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </BaseCard>

          <ul className="grid grid-cols-2 gap-6">
            <li>
              <TotalCard
                color="#3297FF"
                icon={<ICONS.EmptyWallet color="#fff" height={24} width={24} />}
                loading={false}
                name="Pendapatan"
                percentage={percentageFormat(Math.abs(0))}
                status="success"
                value={formatIDR(0)}
              />
            </li>
            <li>
              <TotalCard
                color="#237B9F"
                icon={<ICONS.EmptyWallet color="#fff" height={24} width={24} />}
                loading={false}
                name="Transaksi"
                percentage={percentageFormat(Math.abs(0))}
                status="success"
                value={formatIDR(0)}
              />
            </li>
          </ul>

          <TableProductHistory />
        </div>
      </section>
    </Layout>
  )
}
