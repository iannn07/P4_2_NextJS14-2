'use client';

import ProfilePage from '@/components/shared/ProfilePage';
import { useEffect, useState } from 'react';

const UserProfile = ({ params: { id } }: { params: { id: string } }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch(`/api/user/${id}`, { cache: 'no-store' });

      if (!res.ok) {
        throw new Error('Failed to fetch projects');
      }

      const data = await res.json();

      setProjects(data);
    };
    if (id) {
      fetchProjects();
    }
  }, [id]);

  return <ProfilePage projects={projects} user={projects[0]} />;
};

export default UserProfile;
