import { Outlet } from 'react-router-dom';
import Header from '../components/layout-parts/Header';

function PublicLayout() {
    return (
    <>
      <Header />
      <main className="min-h-[80vh]">
        <Outlet />
      </main>
    </>
  );
}

export default PublicLayout