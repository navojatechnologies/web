import Link from 'next/link';
import { notFound } from 'next/navigation';
import { insights } from '../../data';
import { PageHero, ContactBanner } from '../../components/Sections';
export function generateStaticParams(){return insights.map(({slug})=>({slug}))}
export async function generateMetadata({params}){const {slug}=await params;const item=insights.find(x=>x.slug===slug);return {title:item?.title,description:item?.description}}
export default async function InsightDetail({params}){const {slug}=await params;const item=insights.find(x=>x.slug===slug);if(!item)notFound();return <main><PageHero eyebrow="INSIGHTS" title={<>{item.title}<em>.</em></>} description={item.description}/><section className="section detail-section"><div className="wrap detail-grid"><div><p className="eyebrow dark-label"><span className="small-square"/> NAVOJA PERSPECTIVES</p><h2>Let’s keep<br/><span>thinking forward.</span></h2></div><div><p className="detail-lead">{item.body}</p><p className="detail-copy">Have a topic or a challenge you would like to discuss? We would love to hear from you.</p><Link className="text-link" href="/contact/">GET IN TOUCH ↗</Link></div></div><div className="wrap"><Link href="/insights/" className="back-link">← ALL INSIGHTS</Link></div></section><ContactBanner/></main>}
