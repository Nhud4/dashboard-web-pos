import BaseTable from '@components/modules/BaseTable'

import { columns } from './column'

export const TableProductHistory = () => {
  return (
    <div>
      <BaseTable columns={columns(false)} data={[]} title="Riwayat Transaksi" />
    </div>
  )
}
