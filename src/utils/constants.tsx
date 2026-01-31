import ICONS from '@configs/icons'

export const REVENUE = {
  balance: {
    color: '#405089',
    icon: (
      <ICONS.EmptyWallet height={24} style={{ color: '#fff' }} width={24} />
    ),
    status: 'success',
  },
  customer: {
    color: '#29AB91',
    icon: (
      <ICONS.EmptyWallet height={24} style={{ color: '#fff' }} width={24} />
    ),
    status: 'success',
  },
  revenue: {
    color: '#FEB558',
    icon: (
      <ICONS.EmptyWallet height={24} style={{ color: '#fff' }} width={24} />
    ),
    status: 'success',
  },
}

export const STATUS_OPTIONS = [
  { label: 'Aktif', value: true },
  { label: 'Non-Aktif', value: false },
]

export const PRINTER_OPTIONS = [
  { label: 'Dapur', value: 'kitchen' },
  { label: 'Bar', value: 'bar' },
]

export const ACTIVE_OPTIONS = [
  { label: 'Ya', value: true },
  { label: 'Tidak', value: false },
]

export const STATUS_TABLE = {
  false: { label: 'Non Aktif', style: 'text-danger-500 !bg-danger-50' },
  true: { label: 'Aktif', style: 'text-success-600 !bg-success-60' },
}

export const DASHBOARD_OPTION = {
  Table: [
    { label: 'Bulan ini', value: 'thisMonth' },
    { label: 'Bulan kemarin', value: 'lastMonth' },
    { label: 'Tahun ini', value: 'year' },
  ],
  income: [
    { label: 'Tahun ini', value: 'thisYear' },
    { label: 'Tahun kemarin', value: 'lastYear' },
  ],
  service: [
    { label: 'Tahunan', value: 'year' },
    { label: 'Bulanan', value: 'month' },
    { label: 'Mingguan', value: 'week' },
  ],
}

export const DELIVERY_TYPE_OPS = [
  { label: 'Dine In', value: 'in' },
  { label: 'Take Way', value: 'out' },
  { label: 'Paket', value: 'batch' },
]

export const ROLE_LIST = {
  cashier: 'Kasir',
  inventory: 'Gudang',
  kitchen: 'Dapur',
  manager: 'Manager',
  waiters: 'Waiters',
}

export const ROLE_OPTIONS = Object.entries(ROLE_LIST).map(([key, label]) => ({
  label,
  value: key,
}))
