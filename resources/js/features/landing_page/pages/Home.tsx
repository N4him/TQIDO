import { Head } from '@inertiajs/react';
import LandingLayout from '../layouts/LandingLayout';
import Hero from '../components/Hero';
import Features from '../components/Features';
import About from '../components/About';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import CTA from '../components/CTA';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

interface HomeProps {
    canRegister?: boolean;
}

export default function Home({ canRegister = true }: HomeProps) {
    return (
        <LandingLayout>
            <Head title="TQido" />
            
            <div id="hero">
                <Hero />
            </div>
            
            <div id="features">
                <Features />
            </div>
            
            <div id="about">
                <About />
            </div>
            
            <div id="services">
                <Services />
            </div>
            
            <div id="testimonials">
                <Testimonials />
            </div>
            
            <div id="pricing">
                <Pricing />
            </div>
            
            <div id="cta">
                <CTA />
            </div>
            
            <div id="contact">
                <Contact />
            </div>
            
            <Footer />
        </LandingLayout>
    );
}