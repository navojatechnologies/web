import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles } from '../../../articles';
import { PageHero, ContactBanner } from '../../../components/Sections';
export function generateStaticParams(){return articles.map(({slug})=>({slug}))}
export async function generateMetadata({params}){const {slug}=await params;const article=articles.find(x=>x.slug===slug);return {title:article?.title,description:article?.summary}}
export default async function Article({params}){const {slug}=await params;const article=articles.find(x=>x.slug===slug);if(!article)notFound();return <main><PageHero eyebrow={`INSIGHTS / ${article.category.toUpperCase()}`} title={<>{article.title}<em>.</em></>} description={article.summary}/><article className="section article-body"><div className="wrap article-layout"><aside><p className="eyebrow dark-label"><span className="small-square"/> IN THIS ARTICLE</p>{article.sections.map(([title],i)=><a key={title} href={`#section-${i+1}`}>{title}</a>)}</aside><div>{article.sections.map(([title,text],i)=><section id={`section-${i+1}`} key={title}><span>0{i+1} /</span><h2>{title}</h2><p>{text}</p></section>)}<Link href="/insights/" className="back-link">← ALL INSIGHTS</Link></div></div></article><ContactBanner/></main>}
