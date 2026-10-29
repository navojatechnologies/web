import './globals.css';

export const metadata = {
  title: 'Navoja Technolgies | Build what’s next',
  description: 'Navoja Technolgies is a digital product and engineering partner based in Surat, India.',
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
