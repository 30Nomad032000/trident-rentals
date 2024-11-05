import { About } from '@/components/custom/about';
import { Choose } from '@/components/custom/choose';
import { Header } from '@/components/custom/header';
import { Hero } from '@/components/custom/hero';
import { Mission } from '@/components/custom/mission';
import { Contact } from '@/components/custom/contact';
import { Services } from '@/components/custom/services';
import { ContactForm } from '@/components/custom/contactForm';
import { Footer } from '@/components/custom/footer';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Mission />
      <Choose />
      <Contact />
      <Services />
      <ContactForm />
      <Footer />
    </>
  );
}
