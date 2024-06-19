
import { useRouter } from 'next/router';
import Layout from '@/components/Dashboard/Layout/Layout';
import { UserDetailsProps } from '@/components/utils/types';
import Loader from '@/components/ui/reusables/Loader/Loader';

const UserDetailsPage = ({user}: UserDetailsProps) => {
  const router = useRouter();
  const { username } = router.query;

  if (!username || typeof username !== 'string') {
    return <Loader/>;
  }

  return (
    <Layout>
      <h1>User Details Page for {username}</h1>
    </Layout>
  );
};

export default UserDetailsPage;
