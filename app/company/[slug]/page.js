import Link from 'next/link';
import { notFound } from 'next/navigation';
import { companyPages } from '../../data';
import { PageHero, ContactBanner } from '../../components/Sections';
export function generateStaticParams(){return companyPages.map(({slug})=>({slug}))}
export async function generateMetadata({params}){const {slug}=await params;const item=companyPages.find(x=>x.slug===slug);return {title:item?.title,description:item?.description}}
export default async function CompanyDetail({params}){const {slug}=await params;const item=companyPages.find(x=>x.slug===slug);if(!item)notFound();return <main><PageHero eyebrow="ABOUT NAVOJA" title={<>{item.title}<em>.</em></>} description={item.description}/><section className="section detail-section"><div className="wrap detail-grid"><div><p className="eyebrow dark-label"><span className="small-square"/> NAVOJA TECHNOLGIES</p><h2>People. Ideas.<br/><span>Possibility.</span></h2></div><div><p className="detail-lead">{item.body}</p><Link className="text-link" href="/contact/">GET IN TOUCH ↗</Link></div></div><div className="wrap"><Link href="/about/" className="back-link">← ABOUT US</Link></div></section><ContactBanner/></main>}
