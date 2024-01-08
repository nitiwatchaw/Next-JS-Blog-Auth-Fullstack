import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: "Next JS Homepage",
    template: "%s | Next.js 14 "
  },
  description: 'Next.js starter app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <head>
        <link rel='icon' href='/favicon.ico' />
      </head>

      <body className={inter.className}>
        <div className=" container">
          <Navbar />
          <div style={{height:"130px"}} />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}