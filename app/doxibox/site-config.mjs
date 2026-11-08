// Set only to real, published HTTPS destinations when the product is available.
// An empty value deliberately renders a clearly explained unavailable state.
export const siteConfig = {
  origin: 'https://doxibox.navojatech.com',
  companyUrl: 'https://navojatech.com',
  appUrl: '',
  termsUrl: '',
  privacyEmail: 'info@navojatech.com',
  supportEmail: 'support@navojatech.com',
};

export const pages = {
  home: { path: '/', title: 'Doxibox – Cloud Storage & File Sharing Platform', description: 'Discover Doxibox by Navoja Technologies, a cloud-based platform for storing, organizing, accessing and sharing your digital files.' },
  features: { path: '/features', title: 'Cloud Storage & Sharing Features | Doxibox', description: 'Explore Doxibox cloud storage, file organization, supported media access, sharing links and public channels where available.' },
  about: { path: '/about', title: 'About Doxibox | A Product of Navoja Technologies', description: 'Meet Doxibox, the cloud storage and file-sharing platform developed and operated by Navoja Technologies.' },
  faq: { path: '/faq', title: 'Frequently Asked Questions | Doxibox', description: 'Find answers about Doxibox storage, file formats, privacy, sharing, account deletion and support.' },
  contact: { path: '/contact', title: 'Contact & Support | Doxibox', description: 'Contact Doxibox by Navoja Technologies for technical support, privacy questions and general inquiries.' },
};
