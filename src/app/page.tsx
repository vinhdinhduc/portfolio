import { Navbar }        from '@/components/Navbar'
import { Hero }           from '@/components/sections/Hero'
import { About }          from '@/components/sections/About'
import { Services }       from '@/components/sections/Services'
import { Portfolio }      from '@/components/sections/Portfolio'
import { BlogPreview }    from '@/components/sections/BlogPreview'
import { Contact }        from '@/components/sections/Contact'
import { Footer }         from '@/components/Footer'
import { FloatingContact } from '@/components/FloatingContact'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <BlogPreview />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
    </>
  )
}
