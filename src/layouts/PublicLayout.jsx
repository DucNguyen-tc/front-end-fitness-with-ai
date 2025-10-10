import { Outlet } from 'react-router-dom';
import Header from '../components/layout-parts/Header';
import Footer from '../components/layout-parts/Footer';

function PublicLayout() {
    return (
    <>
      <Header />
      <main className="min-h-[80vh]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default PublicLayout