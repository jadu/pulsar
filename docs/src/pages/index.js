import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';


import HeroOne from '@site/static/img/hero_1.svg';
import HeroTwo from '@site/static/img/hero_2.svg';
import HeroThree from '@site/static/img/hero_3.svg';

const features = [
  {
    title: 'About Pulsar',
    HeroImage: HeroOne,
    description: (
      <>
        Pulsar provides a common framework, tools and documentation to help 
        designers and developers build user interfaces within the Jadu platform.
      </>
    ),
  },
  {
    title: 'Designed for Jadu',
    HeroImage: HeroTwo,
    description: (
      <>
        Components are designed with accessibility, usability and 
        responsiveness in mind, providing additional features requiring as 
        little configuration as possible.
      </>
    ),
  },
  {
    title: 'Collaborate',
    HeroImage: HeroThree,
    description: (
      <>
        We welcome any feedback and ideas on how to improve the design system. 
        If you are interested in contributing you can check out our 
        contribution guidelines or report an issue.
      </>
    ),
  },
];

function Feature({HeroImage, title, description}) {
  return (
    <div className={clsx('text--center col col--4', styles.feature)}>
      <HeroImage className={styles.featureImage} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('/docs/guides/getting-started')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
