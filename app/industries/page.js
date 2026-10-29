import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { industries } from '../data';
import { PageHero, ContactBanner } from '../components/Sections';
export const metadata = { title: 'Industries' };
export default function IndustriesPage() { return <main><PageHero eyebrow="INDUSTRIES" title={<>Different worlds.<br/><em>Shared ambition.</em></>} description="Every industry has its own challenges. We bring fresh thinking and deep curiosity to each one."/><section className="section listing-section"><div className="wrap"><div className="listing-intro"><p className="eyebrow dark-label"><span className="small-square"/> WHERE WE FOCUS</p><h2>Technology with a point of view.</h2></div><div className="listing-grid">{industries.map((item,i)=><Link className="listing-card industry-list-card" href={`/industries/${item.slug}/`} key={item.slug}><span className="listing-number">0{i+1} /</span><ArrowUpRight className="listing-arrow" size={22}/><h3>{item.title}</h3><p>{item.description}</p><span className="listing-link">EXPLORE INDUSTRY <ArrowUpRight size={15}/></span></Link>)}</div></div></section><ContactBanner/></main>; }
