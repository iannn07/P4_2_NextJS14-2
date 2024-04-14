'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react';
import FormField from './FormField';
import CustomMenu from './CustomMenu';
import { categoryFilters } from '@/constants';
import Button from './Button';
import { ProjectInterface } from '@/utils/common.types';
import { Session, User } from 'next-auth';

type Props = {
  type: string;
  session: Session;
  project?: ProjectInterface;
};

const ProjectForm = ({ type, session, project }: Props) => {
  const user = session?.user as User | undefined;
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState(() => ({
    title: '',
    description: '',
    image: '',
    liveSiteUrl: '',
    githubUrl: '',
    category: '',
    creator: '',
  }));

  // Performance Issue Fix
  useEffect(() => {
    if (type === 'edit' && project) {
      setForm({
        title: project.title,
        description: project.description,
        image: project.image,
        liveSiteUrl: project.liveSiteUrl,
        githubUrl: project.githubUrl,
        category: project.category,
        creator: project.creator._id,
      });
    }
  }, [project, type]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      if (type === 'create') {
        const res = await fetch('/api/project/new', {
          method: 'POST',
          body: JSON.stringify({
            title: form.title,
            description: form.description,
            image: form.image,
            liveSiteUrl: form.liveSiteUrl,
            githubUrl: form.githubUrl,
            category: form.category,
            creator: user?.id,
          }),
          cache: 'no-store',
        });

        if (res.ok) {
          router.push('/');
        }
      } else if (type === 'edit') {
        const res = await fetch(`/api/project/${project?._id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            title: form.title,
            description: form.description,
            image: form.image,
            liveSiteUrl: form.liveSiteUrl,
            githubUrl: form.githubUrl,
            category: form.category,
          }),
          cache: 'no-store',
        });
        if (res.ok) {
          router.push('/');
        }
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong, please try again');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes('image')) {
      alert('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      handleStateChange('image', reader.result as string);
    };
  };

  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prevState) => ({ ...prevState, [fieldName]: value }));
  };

  return (
    <form onSubmit={handleFormSubmit} className='flexStart form'>
      {/* Form image */}
      <div className='flexStart form_image-container'>
        <label htmlFor='poster' className='form_image-label flexCenter'>
          {!form.image && 'Choose a poster for your project'}
        </label>
        <input
          id='image'
          type='file'
          accept='image/*'
          required={type === 'create'}
          className='form_image-input'
          onChange={handleChangeImage}
          placeholder='Choose a poster for your project'
        />

        {form.image && (
          <Image
            src={form.image}
            alt='Project poster'
            fill
            className='sm:p-10 object-contain z-20'
          />
        )}
      </div>

      {/* Form fields */}
      <FormField
        title='Title'
        state={form.title}
        placeholder='Gaussible'
        setState={(value) => handleStateChange('title', value)}
      />
      <FormField
        title='Description'
        state={form.description}
        placeholder='Describe your project'
        setState={(value) => handleStateChange('description', value)}
      />
      <FormField
        type='url'
        title='Website URL'
        state={form.liveSiteUrl}
        placeholder='https://www.gaussible.com'
        setState={(value) => handleStateChange('liveSiteUrl', value)}
      />
      <FormField
        type='url'
        title='Github URL'
        state={form.githubUrl}
        placeholder='https://github.com/gaussible'
        setState={(value) => handleStateChange('githubUrl', value)}
      />

      {/* Custom Category */}
      <CustomMenu
        title='Category'
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange('category', value)}
      />

      {/* Submit button */}
      <div className='flexStart w-full'>
        <Button
          title={
            isSubmitting
              ? `${type == 'create' ? 'Creating' : 'Editing'}`
              : `${type == 'create' ? 'Create' : 'Edit'}`
          }
          type='submit'
          leftIcon={isSubmitting ? '' : '/plus.svg'}
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  );
};

export default ProjectForm;
