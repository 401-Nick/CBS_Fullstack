import './globals.css'
import type { Metadata } from 'next'

import LayoutStyles from '../../styles/LayoutStyles.module.css'

export const metadata: Metadata = {
  title: 'FS Banking',
  description: 'Simple CBS for a bank',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='layoutContainer'>
      {children}
      <footer className={LayoutStyles.footerContainer}>
        <ul>
          <li>
            <a
              href="https://github.com/401-Nick/CBS_Fullstack"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by...
            </a>
          </li>
        </ul>
      </footer>
    </div>
  )
}
