export const serviceOptions = [
  'Web development',
  'App development',
  'AI & intelligent systems',
  'AI automation & workflows',
  'Digital product engineering',
  'Experience & design',
  'Modernization & cloud',
  'Something else',
];

const serviceCategories = {
  'web-development': 'Web development',
  'app-development': 'App development',
  'ai-intelligent-systems': 'AI & intelligent systems',
  'ai-automation': 'AI automation & workflows',
  'digital-product-engineering': 'Digital product engineering',
  'experience-design': 'Experience & design',
  'modernization-cloud': 'Modernization & cloud',
  'ai-engineering': 'AI & intelligent systems',
  'full-stack-engineering': 'Digital product engineering',
  'mobile-engineering': 'App development',
  'web-engineering': 'Web development',
  'backend-engineering': 'Digital product engineering',
  'devops-engineering': 'Modernization & cloud',
  'ui-ux-engineering': 'Experience & design',
  'design-engineering': 'Experience & design',
  'qa-engineering': 'Digital product engineering',
  'iot-engineering': 'Something else',
  'business-analysis': 'Something else',
};

export function contactLink(serviceSlug, topic) {
  const query = new URLSearchParams({ service: serviceCategories[serviceSlug] || 'Something else', topic });
  return `/contact/?${query.toString()}#contact-form`;
}
