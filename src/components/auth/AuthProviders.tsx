'use client';

import { getProviders, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Button from '../shared/Button';

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | undefined;
};

type Providers = Record<string, Provider>;

const AuthProviders = () => {
  const [providers, setProviders] = useState<Providers | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  if (providers) {
    return (
      <div>
        {Object.values(providers).map((provider: Provider, index) => (
          <Button
            key={index}
            title='Sign in with Google'
            handleClick={() => signIn(provider?.id)}
          />
        ))}
      </div>
    );
  }
};

export default AuthProviders;
