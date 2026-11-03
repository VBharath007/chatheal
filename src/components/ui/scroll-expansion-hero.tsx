'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
export function ScrollExpansionHero(){
 const ref=useRef<HTMLElement>(null);const reduce=useReducedMotion();
 const {scrollYProgress}=useScroll({target:ref,offset:['start end','center center']});
 const scale=useTransform(scrollYProgress,[0,1],[.86,1]);
 return <section ref={ref} className="lux-scroll-section"><div className="lux-scroll-heading"><span>THE CHATHEAL PHILOSOPHY</span><h2>Make room for<br/><em>feeling good.</em></h2><p>Simple food. Meaningful movement. Personal support.<br/>A life that feels more balanced, one day at a time.</p></div><motion.div className="lux-scroll-media" style={{scale:reduce?1:scale}}><img src="/images/nature.jpg" alt="Sunlight through a peaceful green forest" loading="lazy"/><div><span>WELLNESS BEYOND THE PLATE</span><h3>A calmer mind.<br/>A fuller life.</h3><Link href="/approach">Explore our approach ↗</Link></div></motion.div></section>
}
