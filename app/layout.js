import './globals.css';
import { Header, Footer } from './components/SiteChrome';
export const metadata = { title: { default: 'Navoja Technolgies | Build what’s next', template: '%s | Navoja Technolgies' }, description: 'Navoja Technolgies is a digital product and engineering partner based in Surat, India.' };
export default function RootLayout({ children }) { return <html lang="en"><body><div id="top"><Header/>{children}<Footer/></div></body></html>; }
