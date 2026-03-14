// resources/js/features/landing_page/pages/Home.tsx
import { Head } from '@inertiajs/react';
import LandingLayout from '@/features/landing_page/layouts/LandingLayout';
import Hero from '@/features/landing_page/components/Hero';
import Features from '@/features/landing_page/components/Features';
import About from '@/features/landing_page/components/About';
import Services from '@/features/landing_page/components/Services';
import Testimonials from '@/features/landing_page/components/Testimonials';
import Pricing from '@/features/landing_page/components/Pricing';
import CTA from '@/features/landing_page/components/CTA';
import Contact from '@/features/landing_page/components/Contact';
import Footer from '@/features/landing_page/components/Footer';
import FAQS from '@/features/landing_page/components/FAQs';


interface HomeProps {
    canRegister?: boolean;
}

export default function Home({ canRegister = true }: HomeProps) {
    return (
        <LandingLayout>
            <Head title="TQido" />
            <Hero />
                        <About />
            <Features />

            <Services />
            <Testimonials />
                        <FAQS />
                                                <CTA />


            <Footer />
        </LandingLayout>
    );
}