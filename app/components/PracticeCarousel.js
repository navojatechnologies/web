'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { services } from '../data';

const visuals = [
  { image: '/images/practices/web.jpg', label: 'WEB / DIGITAL EXPERIENCES' },
  { image: '/images/practices/mobile.jpg', label: 'MOBILE / CONNECTED EXPERIENCES' },
  { image: '/images/practices/ai.jpg', label: 'AI / INTELLIGENT SYSTEMS' },
  { image: '/images/practices/product.jpg', label: 'PRODUCT / FROM IDEA TO IMPACT' },
  { image: '/images/practices/design.jpg', label: 'DESIGN / HUMAN-CENTRED THINKING' },
  { image: '/images/practices/cloud.jpg', label: 'CLOUD / BUILT TO EVOLVE' },
];
export default function PracticeCarousel() {
  const section = useRef(null);
  const [active, setActive] = useState(0);
  const scrollEnabled = useRef(false);
  const sync = useCallback(() => {
    const node = section.current;
    if (!node || !scrollEnabled.current) return;
    const top = node.getBoundingClientRect().top + window.scrollY;
    const travel = node.offsetHeight - window.innerHeight;
    if (travel <= 0) return;
    const progress = Math.max(0, Math.min(0.9999, (window.scrollY - top) / travel));
    setActive(Math.min(services.length - 1, Math.floor(progress * services.length)));
  }, []);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce), (max-height: 500px)');
    let frame = 0;
    const updateMode = () => { scrollEnabled.current = !media.matches; sync(); };
    const onScroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(sync); };
    updateMode();
    media.addEventListener('change', updateMode);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { media.removeEventListener('change', updateMode); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(frame); };
  }, [sync]);
  function select(index) {
    setActive(index);
    const node = section.current;
    if (!node || !scrollEnabled.current) return;
    const top = node.getBoundingClientRect().top + window.scrollY;
    const travel = Math.max(0, node.offsetHeight - window.innerHeight);
    window.scrollTo({ top: top + travel * (index + 0.5) / services.length, behavior: 'auto' });
  }
  const service = services[active];
  return <section className="practices-scroll" id="services" ref={section} aria-label="Our practices"><div className="practices-panel"><div className="wrap practices-wrap"><div className="practice-heading"><p className="eyebrow dark-label"><span className="small-square"/> WHAT WE DO</p><h2>One team. Many possibilities.</h2><p>Strategy, design, and hands-on engineering come together to make ambitious ideas real.</p></div><div className="practice-card"><div className="practice-copy"><span className="practice-number">{service.number} / OUR PRACTICES</span><h3>{service.title}</h3><p>{service.text}</p><div className="tags">{service.tags.map(tag=><span key={tag}>{tag}</span>)}</div><Link href={`/services/${service.slug}/`}>Explore {service.title} <ArrowUpRight size={18}/></Link></div><div className="practice-visual" aria-hidden="true">{visuals.map((visual,index)=><div key={visual.image} className={`practice-image ${index===active?'is-active':''}`} style={{backgroundImage:`linear-gradient(0deg,rgba(0,0,0,.7),transparent 65%),url(${visual.image})`}}><span>{visual.label}</span></div>)}</div></div><div className="practice-controls" role="group" aria-label="Choose a practice">{services.map((item,index)=><button key={item.slug} onClick={()=>select(index)} aria-label={`Show ${item.title}`} aria-pressed={active===index} className={active===index?'selected':''}/>)}</div><p className="practice-hint">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></p></div></div></section>;
}
