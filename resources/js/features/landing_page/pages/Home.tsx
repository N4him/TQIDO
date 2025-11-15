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
            <Head title="Regulate your mood with our videos - MoodFix" />
            
            {/* Hero Section */}
            <Hero />
            
            {/* Features Section */}
            <Features />
            
            {/* About Section */}
            <About />
            
            {/* Services Section */}
            <Services />
            
            {/* Testimonials Section */}
            <Testimonials />
            
            {/* Pricing Section */}
            <Pricing />
            
            {/* CTA Section */}
            <CTA />
            
            {/* Contact Section */}
            <Contact />
            
            {/* Footer */}
            <Footer />
        </LandingLayout>
    );
}
