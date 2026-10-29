import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { insights } from '../data';
import { PageHero, ContactBanner } from '../components/Sections';
export const metadata={title:'Insights'};
export default function Insights(){return <main><PageHero eyebrow="INSIGHTS" title={<>Ideas worth<br/><em>exploring.</em></>} description="Perspectives and conversations about technology, design, and building digital products."/><section className="section listing-section"><div className="wrap"><div className="listing-grid">{insights.map((item,i)=><Link className="listing-card" href={`/insights/${item.slug}/`} key={item.slug}><span className="listing-number">0{i+1} /</span><ArrowUpRight className="listing-arrow" size={22}/><h3>{item.title}</h3><p>{item.description}</p><span className="listing-link">EXPLORE <ArrowUpRight size={15}/></span></Link>)}</div></div></section><ContactBanner/></main>}
