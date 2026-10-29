'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { services } from '../data';

const visuals = [
  { image: '/images/practices/web.jpg', label: 'WEB / DIGITAL EXPERIENCES' },
  { image: '/images/practices/mobile.jpg', label: 'MOBILE / CONNECTED EXPERIENCES' },
  { image: '/images/practices/ai.jpg', label: 'AI / INTELLIGENT SYSTEMS' },
  { image: '/images/practices/product.jpg', label: 'PRODUCT / FROM IDEA TO IMPACT' },
  { image: '/images/practices/design.jpg', label: 'DESIGN / HUMAN-CENTRED THINKING' },
  { image: '/images/practices/cloud.jpg', label: 'CLOUD / BUILT TO EVOLVE' },
  { image: '/images/hero-factory.jpg', label: 'AUTOMATION / CONNECTED WORKFLOWS' },
];
export default function PracticeCarousel() {
  const section = useRef(null);
  const panel = useRef(null);
  const touchStart = useRef(null);
  const [active, setActive] = useState(0);
  const geometry = useCallback(() => {
    if (!section.current || !panel.current) return null;
    const top = section.current.getBoundingClientRect().top + window.scrollY;
    const offset = Math.min(0, window.innerHeight - panel.current.offsetHeight);
    section.current.style.setProperty('--practice-offset', `${offset}px`);
    return { start: top - offset, travel: Math.max(0, section.current.offsetHeight - panel.current.offsetHeight) };
  }, []);
  const sync = useCallback(() => {
    const position = geometry();
    if (!position || position.travel <= 0) return;
    const progress = Math.max(0, Math.min(0.9999, (window.scrollY - position.start) / position.travel));
    setActive(Math.min(services.length - 1, Math.floor(progress * services.length)));
  }, [geometry]);
  useEffect(() => {
    let frame = 0;
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(sync); };
    // ResizeObserver is optional: scroll, resize and orientation events still keep
    // the carousel in sync on older mobile browsers.
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(schedule) : null;
    if (section.current) observer?.observe(section.current);
    if (panel.current) observer?.observe(panel.current);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('orientationchange', schedule);
    window.visualViewport?.addEventListener('resize', schedule);
    schedule();
    return () => { window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); window.removeEventListener('orientationchange', schedule); window.visualViewport?.removeEventListener('resize', schedule); observer?.disconnect(); cancelAnimationFrame(frame); };
  }, [sync]);
  function select(index) {
    const next = Math.max(0, Math.min(services.length - 1, index));
    setActive(next);
    const position = geometry();
    if (position && position.travel > 0) window.scrollTo({ top: position.start + position.travel * (next + 0.5) / services.length, behavior: 'auto' });
  }
  function startTouch(event) {
    const touch = event.touches[0];
    touchStart.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
  }
  function endTouch(event) {
    const start = touchStart.current; const touch = event.changedTouches[0];
    touchStart.current = null;
    if (!start || !touch) return;
    const dx = touch.clientX - start.x; const dy = touch.clientY - start.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) select(active + (dx < 0 ? 1 : -1));
  }
  const service = services[active];
  return <section className="practices-scroll" id="services" ref={section} aria-label="Our practices"><div className="practices-panel" ref={panel}><div className="wrap practices-wrap"><div className="practice-heading"><p className="eyebrow dark-label"><span className="small-square"/> WHAT WE DO</p><h2>One team. Many possibilities.</h2><p>Strategy, design, and hands-on engineering come together to make ambitious ideas real.</p></div><div className="practice-card" onTouchStart={startTouch} onTouchEnd={endTouch}><div className="practice-copy"><span className="practice-number">{service.number} / OUR PRACTICES</span><h3>{service.title}</h3><p>{service.text}</p><div className="tags">{service.tags.map(tag=><span key={tag}>{tag}</span>)}</div><Link href={`/services/${service.slug}/`}>Explore {service.title} <ArrowUpRight size={18}/></Link></div><div className="practice-visual" aria-hidden="true">{visuals.map((visual,index)=><div key={visual.image} className={`practice-image ${index===active?'is-active':''}`} style={{backgroundImage:`linear-gradient(0deg,rgba(0,0,0,.7),transparent 65%),url(${visual.image})`}}><span>{visual.label}</span></div>)}</div></div><div className="practice-navigation"><button className="practice-arrow" onClick={()=>select(active-1)} disabled={active===0} aria-label="Previous practice"><ArrowLeft size={17}/></button><div className="practice-controls" role="group" aria-label="Choose a practice">{services.map((item,index)=><button key={item.slug} onClick={()=>select(index)} aria-label={`Show ${item.title}`} aria-pressed={active===index} className={active===index?'selected':''}/>)}</div><button className="practice-arrow" onClick={()=>select(active+1)} disabled={active===services.length-1} aria-label="Next practice"><ArrowRight size={17}/></button></div><p className="practice-hint">SCROLL OR SWIPE TO EXPLORE <span aria-hidden="true">↓</span></p></div></div></section>;
}
