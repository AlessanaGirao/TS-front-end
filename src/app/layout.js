"use client" 
import { ThemeProvider } from '@/app/contexts/ThemeContext'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children  }) {
  
  return (
    <ThemeProvider>
      <html lang="en">
          <link rel="manifest" href="manifest.json"></link>
          <body className={inter.className}>{children}</body>
      </html>
    </ThemeProvider>
  )
}
