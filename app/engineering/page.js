import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { engineering } from '../data';
import { PageHero, ContactBanner } from '../components/Sections';
export const metadata={title:'Engineering'};
export default function Engineering(){return <main><PageHero eyebrow="ENGINEERING" title={<>Built with care.<br/><em>Made to move.</em></>} description="Explore the disciplines that bring digital products and experiences to life."/><section className="section listing-section"><div className="wrap"><div className="listing-intro"><p className="eyebrow dark-label"><span className="small-square"/> OUR EXPERTISE</p><h2>Engineering for what’s next.</h2></div><div className="listing-grid">{engineering.map((item,i)=><Link className="listing-card" key={item.slug} href={`/engineering/${item.slug}/`}><span className="listing-number">{String(i+1).padStart(2,'0')} /</span><ArrowUpRight className="listing-arrow" size={22}/><h3>{item.title}</h3><p>{item.description}</p><span className="listing-link">EXPLORE EXPERTISE <ArrowUpRight size={15}/></span></Link>)}</div></div></section><ContactBanner/></main>}
