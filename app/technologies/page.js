import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageHero, ContactBanner } from '../components/Sections';
import { contactLink } from '../contact-links';

export const metadata = {
  title: 'Technologies',
  description: 'Explore web, mobile, AI, automation, data, and cloud technologies for digital products and workflows.',
};

const groups = [
  { title: 'AI & language models', description: 'Build AI-assisted experiences around the right model, context, and review process.', service: 'ai-intelligent-systems', items: ['OpenAI', 'Anthropic Claude', 'Google Gemini', 'Hugging Face', 'LangChain', 'Retrieval-augmented generation'] },
  { title: 'Automation & integrations', description: 'Connect apps, data, and workflows to reduce repetitive manual work.', service: 'ai-automation', items: ['n8n', 'Zapier', 'Make', 'Webhooks', 'API integrations', 'Workflow orchestration'] },
  { title: 'Web & interfaces', description: 'Create responsive websites, storefronts, and applications for modern browsers.', service: 'web-development', items: ['React', 'Next.js', 'Vue.js', 'Angular', 'TypeScript', 'JavaScript', 'HTML & CSS'] },
  { title: 'Mobile applications', description: 'Shape useful experiences for iOS, Android, and cross-platform products.', service: 'app-development', items: ['React Native', 'Flutter', 'iOS', 'Android', 'Swift', 'Kotlin'] },
  { title: 'Back end & APIs', description: 'Build services and interfaces that connect product experiences and business logic.', service: 'digital-product-engineering', items: ['Node.js', 'Python', 'Java', '.NET', 'PHP', 'REST APIs', 'GraphQL'] },
  { title: 'Data & databases', description: 'Organise, store, and connect the information digital products depend on.', service: 'digital-product-engineering', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Firebase', 'Vector databases'] },
  { title: 'Machine learning & data', description: 'Explore models and data workflows for prediction, analysis, and intelligent features.', service: 'ai-intelligent-systems', items: ['Python', 'PyTorch', 'TensorFlow', 'scikit-learn', 'Data pipelines', 'Model evaluation'] },
  { title: 'Cloud & DevOps', description: 'Plan environments, deployment workflows, and operational visibility for applications.', service: 'modernization-cloud', items: ['AWS', 'Microsoft Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'CI/CD', 'Monitoring'] },
  { title: 'Design & quality', description: 'Bring thoughtful design, accessible interactions, and testing into product delivery.', service: 'experience-design', items: ['Figma', 'Design systems', 'Accessibility', 'Prototyping', 'Automated testing', 'Cross-device testing'] },
  { title: 'Commerce & content', description: 'Connect customer experiences with the platforms that support products and content.', service: 'web-development', items: ['Shopify', 'WooCommerce', 'Headless CMS', 'Payment integrations', 'Content APIs'] },
];

export default function Technologies() {
  return <main><PageHero eyebrow="TECHNOLOGIES" title={<>The right tools.<br/><em>For the right problem.</em></>} description="Technology choices should serve the product, the people using it, and the team that will maintain it."/><section className="section detail-section"><div className="wrap"><div className="listing-intro"><p className="eyebrow dark-label"><span className="small-square"/> TECHNOLOGY LANDSCAPE</p><h2>Consider the whole picture.</h2></div><p className="technology-intro">Explore technologies and approaches we can discuss for your project. The right selection depends on your goals, existing systems, and delivery needs.</p><div className="technology-grid">{groups.map(group=><article key={group.title}><h3>{group.title}</h3><p className="technology-description">{group.description}</p><div>{group.items.map(item=><span key={item}>{item}</span>)}</div><Link className="technology-discuss" href={contactLink(group.service, group.title)}>Discuss {group.title.toLowerCase()} <ArrowUpRight size={16}/></Link></article>)}</div><Link className="text-link" href="/contact/">DISCUSS YOUR TECHNOLOGY NEEDS <ArrowUpRight size={19}/></Link></div></section><ContactBanner/></main>;
}
