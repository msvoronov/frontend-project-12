import React from 'react';
import { useTranslation } from 'react-i18next';
import page404 from '../assets/page404.svg';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img alt={t('notFound.title')} className="img-fluid h-25" src={page404} />
      <h1 className="h4 text-muted">{t('notFound.title')}</h1>
      <p className="text-muted">
        {t('notFound.goTo')}
        <a href="/">{t('notFound.toMainPage')}</a>
      </p>
    </div>
  );
};

export default NotFound;
