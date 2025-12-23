import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { Home } from '@/pages/Home'
import { About } from '@/pages/About'
import { Services } from '@/pages/Services'
import { ServiceDetail } from '@/pages/ServiceDetail'
import { Portfolio } from '@/pages/Portfolio'
import { PortfolioDetail } from '@/pages/PortfolioDetail'
import { Blog } from '@/pages/Blog'
import { BlogPost } from '@/pages/BlogPost'
import { Contact } from '@/pages/Contact'

// Admin pages
import { Dashboard } from '@/pages/admin/Dashboard'
import { AdminServices } from '@/pages/admin/AdminServices'
import { ServiceForm } from '@/pages/admin/ServiceForm'
import { AdminPortfolio } from '@/pages/admin/AdminPortfolio'
import { AdminBlog } from '@/pages/admin/AdminBlog'
import { AdminMessages } from '@/pages/admin/AdminMessages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:slug" element={<ServiceDetail />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="portfolio/:slug" element={<PortfolioDetail />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="services/new" element={<ServiceForm />} />
          <Route path="services/:id/edit" element={<ServiceForm />} />
          <Route path="portfolio" element={<AdminPortfolio />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="messages" element={<AdminMessages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
