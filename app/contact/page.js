'use client';
import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { serviceOptions } from '../contact-links';
export default function ContactPage() {
 const [prepared, setPrepared] = useState(false);
 const [service, setService] = useState('');
 const [topic, setTopic] = useState('');
 useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const requestedService = params.get('service');
  if (requestedService && serviceOptions.includes(requestedService)) setService(requestedService);
  setTopic((params.get('topic') || '').trim().slice(0, 160));
 }, []);
 function submit(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const subject = `Project enquiry: ${topic || form.get('service') || 'Let’s talk'}`;
  const body = `Name: ${form.get('name')}\nEmail: ${form.get('email')}\nCompany: ${form.get('company') || 'Not provided'}\nService: ${form.get('service') || 'Not selected'}${topic ? `\nTopic: ${topic}` : ''}\n\nProject details:\n${form.get('message')}`;
  window.location.href = `mailto:info@navojatech.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  setPrepared(true);
 }
 return <main><section className="contact-page"><div className="wrap contact-page-grid"><div className="contact-intro"><p className="eyebrow"><span className="small-square purple"/> LET’S TALK</p><h1>Good things<br/>start with a <em>hello.</em></h1><p>Tell us what you’re thinking about. Whether it’s a new idea or a challenge you’re ready to solve, we’d love to hear from you.</p><div className="contact-info"><span>EMAIL US</span><a href="mailto:info@navojatech.com">info@navojatech.com <ArrowUpRight size={19}/></a><span>FIND US</span><p>Surat, Gujarat<br/>India</p></div></div><div className="form-card" id="contact-form"><h2>Tell us about your project.</h2><p>Fill in the details below and we’ll prepare an email for you to send.</p>{topic && <p className="enquiry-context">Enquiry about: <strong>{topic}</strong></p>}<form onSubmit={submit}><div className="form-row"><label>Your name *<input name="name" required autoComplete="name" placeholder="Your name"/></label><label>Email address *<input name="email" type="email" required autoComplete="email" placeholder="you@company.com"/></label></div><label>Company<input name="company" autoComplete="organization" placeholder="Company name (optional)"/></label><label>What can we help with?<select name="service" value={service} onChange={event => setService(event.target.value)}><option value="">Select a service</option>{serviceOptions.map(option=><option key={option} value={option}>{option}</option>)}</select></label><label>Tell us more *<textarea name="message" required rows="5" placeholder="A little about your idea, goals, or challenge..."></textarea></label><button className="contact-button" type="submit">PREPARE YOUR EMAIL <ArrowUpRight size={19}/></button><p className="form-note" role="status">{prepared ? 'Your email app should open with your message. Please review and send it there. If it did not open, email us directly at info@navojatech.com.' : 'This opens your email app so you can review and send your message. You can also email us directly at info@navojatech.com.'}</p></form></div></div></section><section className="section contact-next"><div className="wrap"><div className="listing-intro"><p className="eyebrow dark-label"><span className="small-square"/> WORK WITH NAVOJA</p><h2>What happens next?</h2></div><div className="values-grid"><article><span>01 / SHARE</span><h3>Tell us the context.</h3><p>Share the problem, the people you want to help, and any timing or budget you have in mind.</p></article><article><span>02 / DISCUSS</span><h3>Explore the possibilities.</h3><p>We can discuss your priorities, relevant constraints, and the questions that need answers.</p></article><article><span>03 / PLAN</span><h3>Define a way forward.</h3><p>Agree the next steps and scope around the needs of your project.</p></article></div></div></section></main>;
}
