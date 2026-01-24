import Layout from '@components/layout'
import ICONS from '@configs/icons'
import TableUser from '@features/TableUser'
import type React from 'react'

export const Settings: React.FC = () => {
  return (
    <Layout title="Pengaturan">
      <section className="page layout">
        <div className="grid grid-cols-3 gap-6">
          <ul className="bg-white rounded-lg shadow-card">
            <li className="flex items-center gap-2 px-4 py-6 bg-orange text-white rounded-t-lg cursor-pointer">
              <ICONS.User height={30} width={30} />
              <div>
                <h1 className="font-semibold">Manage Akun</h1>
                <p className="text-xs">
                  Mengatur akun pengguna dan akses sistem
                </p>
              </div>
            </li>
          </ul>

          <div className="col-span-2">
            <TableUser />
          </div>
        </div>
      </section>
    </Layout>
  )
}
