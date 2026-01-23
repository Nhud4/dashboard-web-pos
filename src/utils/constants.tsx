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
  driver: {
    color: '#405089',
    icon: (
      <ICONS.EmptyWallet height={24} style={{ color: '#fff' }} width={24} />
    ),
    status: 'success',
  },
  merchant: {
    color: '#39A1EA',
    icon: (
      <ICONS.EmptyWallet height={24} style={{ color: '#fff' }} width={24} />
    ),
    status: 'success',
  },
  revenue: {
    color: '#FF7555',
    icon: (
      <ICONS.EmptyWallet height={24} style={{ color: '#fff' }} width={24} />
    ),
    status: 'success',
  },
}

export const MONTH_OPTIONS: SelectOption[] = [
  { label: 'Januari', value: '01', valueAs: 1 },
  { label: 'Februari', value: '02', valueAs: 2 },
  { label: 'Maret', value: '03', valueAs: 3 },
  { label: 'April', value: '04', valueAs: 4 },
  { label: 'Mei', value: '05', valueAs: 5 },
  { label: 'Juni', value: '06', valueAs: 6 },
  { label: 'Juli', value: '07', valueAs: 7 },
  { label: 'Agustus', value: '08', valueAs: 8 },
  { label: 'September', value: '09', valueAs: 9 },
  { label: 'Oktober', value: '10', valueAs: 10 },
  { label: 'November', value: '11', valueAs: 11 },
  { label: 'Desember', value: '12', valueAs: 12 },
]

export const DAY_LIST = [
  'senin',
  'selasa',
  'rabu',
  'kamis',
  'jumat',
  'sabtu',
  'minggu',
]

export const CUSTOMER_TYPE = [
  { label: 'Pengguna Baru', value: false },
  { label: 'Pengguna Lama', value: true },
]

export const CUSTOMER_FILTER_BY = [
  { label: 'Nomor Telepon', value: 'phone' },
  { label: 'Email', value: 'email' },
]

export const OPEN_OPTIONS = [
  { label: 'Buka dengan jam-jam tertentu', value: 'time' },
  { label: 'Selalu buka', value: 'on' },
]

export const STATUS_OPTIONS = [
  { label: 'Aktif', value: true },
  { label: 'Non-Aktif', value: false },
]

export const ACTIVE_OPTIONS = [
  { label: 'Ya', value: true },
  { label: 'Tidak', value: false },
]

export const VOUCHER_FILTER = [
  { label: 'Aktif', value: 'active' },
  { label: 'Non-Aktif', value: 'inactive' },
  { label: 'Redeem', value: 'redeem' },
]

export const DROPDOWN_OPS = [
  { label: 'Pengguna Baru', value: false },
  { label: 'Semua Pengguna', value: true },
]

export const APPROVAL_OPTIONS = [
  { label: 'Publish', value: true },
  { label: 'Arsip', value: false },
]

export const MEDIA_OPTIONS = [
  { label: 'Atas', value: 'top' },
  { label: 'Tangah', value: 'middle' },
  { label: 'Bawah', value: 'bottom' },
]

export const REFERRAL_OPTIONS = [
  { label: 'Referal', value: true },
  { label: 'Non-Referal', value: false },
]

export const MASTER_POSTPAID_OPS = [
  { label: 'Available', value: true },
  { label: 'Not Available', value: false },
]

export const GENERATE_TYPE_OPS = [
  { label: 'Otomatis', value: 'auto' },
  { label: 'Manual', value: 'manual' },
]

export const ALLOCATION_TYPE_OPS = [
  { label: 'Total Pembayaran', value: 'total_fee' },
  { label: 'Subtotal Pembayaran', value: 'sub_total_fee_only' },
  { label: 'Biaya Layanan', value: 'admin_fee_only' },
  { label: 'Ongkos Kirim', value: 'delivery_fee_only' },
  { label: 'Item Gratis', value: 'free_item' },
]

export const REPORT_PERIOD_OPS = [
  { label: 'Bulan Ini', value: 'thisMonth' },
  { label: 'Bulan Kemarin', value: 'lastMonth' },
  { label: 'Tahun Ini', value: 'thisYear' },
  { label: 'Tahun Kemarin', value: 'lastYear' },
]

export const REPORT_CATEGORY_OPS = [
  { label: 'Omset', value: 'revenue' },
  { label: 'Pendapatan Bersih', value: 'income' },
  { label: 'Biaya Jasa Apikasi', value: 'adminFee' },
]

export const INITIAL_DAY = {
  jumat: false,
  kamis: false,
  minggu: false,
  rabu: false,
  sabtu: false,
  selasa: false,
  senin: false,
}

export const STATUS_CODE = {
  failed: [5, 6, 8, 12, 15, 80],
  finish: [4],
  process: [0, 1, 2, 3, 9, 11, 13, 14, 20, 21],
}

export const TEMPLATE_CATEGORY = [
  { label: 'Voucher', value: 'voucher' },
  { label: 'Global', value: 'global' },
  { label: 'Notification', value: 'notification' },
]

export const STATUS_TABLE = {
  false: { label: 'Gagal', style: 'text-danger-500 !bg-danger-50' },
  true: { label: 'Selesai', style: 'text-success-600 !bg-success-60' },
}

export const ROLE_OPTIONS = [
  { label: 'Petugas Redeem Tiket', value: 'ticket_redeem_officer' },
  { label: 'Petugas Check In Tiket', value: 'ticket_check_in_officer' },
]

export const PLATFORM_OPS = [
  { label: 'WEB', value: 'web' },
  { label: 'Android', value: 'android' },
  { label: 'IOS', value: 'ios' },
]

export const MASTER_CREDIT_CATEGORY = [
  { catAs: 'pulsa', label: 'Pulsa', value: 'Pulsa' },
  { catAs: 'data', label: 'Paket Data', value: 'Data' },
  { catAs: 'money', label: 'E-Money', value: 'E_Money' },
]

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
