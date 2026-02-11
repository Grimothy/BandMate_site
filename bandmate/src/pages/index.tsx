import type {ReactNode} from 'react';
import {useState, useEffect} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';
import {useLatestRelease} from '@site/src/hooks/useReleases';

function HomepageHero(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const latestRelease = useLatestRelease();
  
  // Use GitHub release data or fallback to package.json version
  const versionTag = latestRelease?.tagName || 'v1.4.0';
  const releaseDate = latestRelease?.date || 'Feb 2026';
  return (
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <Heading as="h1" className={styles.heroTitle}>
            Your Band's <span className={styles.heroAccent}>Digital Studio</span>
          </Heading>
          <p className={styles.heroSubtitle}>
            {siteConfig.tagline}
          </p>
          <p className={styles.heroDescription}>
            BandMate is a self-hosted platform where bands organize projects, share audio files
            and stems, leave timestamped feedback, and collaborate in real-time &mdash; all
            from a single dashboard.
          </p>
           <div className={styles.heroButtons}>
            <Link
              className={clsx('button button--lg', styles.heroPrimary)}
              to="/docs/intro">
              Get Started
            </Link>
            <Link
              className={clsx('button button--lg', styles.heroSecondary)}
              href="https://github.com/Grimothy/BandMate">
              View on GitHub
            </Link>
            <Link
              className={clsx('button button--lg', styles.heroAccentBtn)}
              to="/docs/roadmap">
              🚦 Project Roadmap
            </Link>
            <Link
              className={clsx('button button--lg', styles.heroSupport)}
              href="https://ko-fi.com/mrgrimothy">
              ☕ Support This Project
            </Link>
          </div>
          <div className={styles.heroVersion}>
            <span className={styles.versionBadge}>{versionTag}</span>
            <span className={styles.versionText}>Latest Release &middot; {releaseDate}</span>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.terminalWindow}>
            <div className={styles.terminalHeader}>
              <span className={styles.terminalDot} data-color="red" />
              <span className={styles.terminalDot} data-color="yellow" />
              <span className={styles.terminalDot} data-color="green" />
              <span className={styles.terminalTitle}>terminal</span>
            </div>
            <div className={styles.terminalBody}>
              <code>
                <span className={styles.terminalPrompt}>$</span>{' '}
                <span className={styles.terminalCmd}>docker run</span> -d \<br />
                {'  '}--name bandmate \<br />
                {'  '}-p <span className={styles.terminalNum}>3000</span>:3000 \<br />
                {'  '}-v $(pwd)/data:/app/data \<br />
                {'  '}-v $(pwd)/uploads:/app/uploads \<br />
                {'  '}grimothy/bandmate:latest<br />
                <br />
                <span className={styles.terminalSuccess}>&#10003; Container started</span><br />
                <span className={styles.terminalMuted}>Open http://localhost:3000</span>
              </code>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function Screenshots(): ReactNode {
  const screenshots = [
    {
      img: useBaseUrl('/img/screenshots/bandmate_dashboard_view.png'),
      title: 'Dashboard Overview',
      description: 'See all your projects, recent activity, and notifications at a glance. Stay updated with real-time collaboration updates.'
    },
    {
      img: useBaseUrl('/img/screenshots/bandmate_projects_dashboard_view.png'),
      title: 'Projects Dashboard',
      description: 'Organize all your band\'s projects in one place. Create, manage, and navigate between multiple projects effortlessly.'
    },
    {
      img: useBaseUrl('/img/screenshots/bandmate_project_view.png'),
      title: 'Project Vibes',
      description: 'Break down your projects into "vibes" - collections of related tracks. Perfect for organizing different versions, moods, or song ideas.'
    },
    {
      img: useBaseUrl('/img/screenshots/bandmate_cut_view.png'),
      title: 'Audio Playback & Comments',
      description: 'Listen to tracks with visual waveforms. Leave timestamped comments that link directly to specific moments in the song.'
    },
    {
      img: useBaseUrl('/img/screenshots/bandmate_file_explorer_view.png'),
      title: 'File Explorer',
      description: 'Browse and manage all your audio files and stems. Upload, organize, and share files with your bandmates securely.'
    },
    {
      img: useBaseUrl('/img/screenshots/bandmate_user_mgmt_view.png'),
      title: 'User Management',
      description: 'Invite bandmates, manage permissions, and control who has access to your projects. Simple and secure collaboration.'
    },
    {
      img: useBaseUrl('/img/screenshots/bandmate_mobile_dashboard_view.png'),
      title: 'Mobile Ready',
      description: 'Full mobile support means you can review tracks and leave feedback from anywhere, on any device.'
    },
    {
      img: useBaseUrl('/img/screenshots/Easy-Mobile-and-desktop-actions.png'),
      title: 'Touch-Friendly Actions',
      description: 'Context menus optimized for both mobile and desktop. Quick actions are always just a tap or click away.'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showAllScreenshots, setShowAllScreenshots] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying || showAllScreenshots || lightboxOpen) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % screenshots.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, showAllScreenshots, lightboxOpen, screenshots.length]);

  const goToSlide = (index: number): void => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const nextSlide = (): void => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = (): void => {
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
    setIsAutoPlaying(false);
  };

  const openLightbox = (index: number): void => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = (): void => {
    setLightboxOpen(false);
  };

  const nextLightboxImage = (): void => {
    setLightboxIndex((prev) => (prev + 1) % screenshots.length);
  };

  const prevLightboxImage = (): void => {
    setLightboxIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  // Handle keyboard navigation in lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightboxImage();
      if (e.key === 'ArrowLeft') prevLightboxImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, screenshots.length]);

  if (showAllScreenshots) {
    return (
      <section className={styles.screenshots}>
        <div className="container">
          <Heading as="h2" className={styles.sectionTitle}>
            All Screenshots
          </Heading>
          <button 
            className={styles.backToCarouselBtn}
            onClick={() => setShowAllScreenshots(false)}>
            ← Back to Carousel
          </button>

          <div className={styles.screenshotGrid}>
            {screenshots.map((screenshot, idx) => (
              <div 
                key={idx} 
                className={styles.screenshotCard}
                onClick={() => openLightbox(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(idx);
                  }
                }}>
                <div className={styles.screenshotImageWrapper}>
                  <img 
                    src={screenshot.img}
                    alt={screenshot.title}
                    className={styles.screenshotImage}
                  />
                  <div className={styles.screenshotOverlay}>
                    <span className={styles.screenshotZoomIcon}>🔍</span>
                  </div>
                </div>
                <div className={styles.screenshotContent}>
                  <h3>{screenshot.title}</h3>
                  <p>{screenshot.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {lightboxOpen && (
          <div className={styles.lightbox} onClick={closeLightbox}>
            <button 
              className={styles.lightboxClose}
              onClick={closeLightbox}
              aria-label="Close lightbox">
              ✕
            </button>
            
            <button 
              className={clsx(styles.lightboxArrow, styles.lightboxArrowLeft)}
              onClick={(e) => {
                e.stopPropagation();
                prevLightboxImage();
              }}
              aria-label="Previous image">
              ‹
            </button>

            <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
              <img 
                src={screenshots[lightboxIndex].img}
                alt={screenshots[lightboxIndex].title}
                className={styles.lightboxImage}
              />
              <div className={styles.lightboxCaption}>
                <h3>{screenshots[lightboxIndex].title}</h3>
                <p>{screenshots[lightboxIndex].description}</p>
              </div>
            </div>

            <button 
              className={clsx(styles.lightboxArrow, styles.lightboxArrowRight)}
              onClick={(e) => {
                e.stopPropagation();
                nextLightboxImage();
              }}
              aria-label="Next image">
              ›
            </button>
          </div>
        )}
      </section>
    );
  }

  return (
    <section className={styles.screenshots}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          See BandMate in Action
        </Heading>
        <p className={styles.sectionSubtitle}>
          Explore the intuitive interface designed for musicians and bands
        </p>

        <div className={styles.carouselContainer}>
          <button 
            className={clsx(styles.carouselArrow, styles.carouselArrowLeft)}
            onClick={prevSlide}
            aria-label="Previous screenshot">
            ‹
          </button>

          <div className={styles.carouselContent}>
            <div 
              className={styles.carouselImageWrapper}
              onClick={() => openLightbox(currentIndex)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openLightbox(currentIndex);
                }
              }}>
              <img 
                src={screenshots[currentIndex].img}
                alt={screenshots[currentIndex].title}
                className={styles.carouselImage}
              />
              <div className={styles.carouselOverlay}>
                <span className={styles.carouselZoomIcon}>🔍 Click to enlarge</span>
              </div>
            </div>
            <div className={styles.carouselTextContent}>
              <h3>{screenshots[currentIndex].title}</h3>
              <p>{screenshots[currentIndex].description}</p>
            </div>
          </div>

          <button 
            className={clsx(styles.carouselArrow, styles.carouselArrowRight)}
            onClick={nextSlide}
            aria-label="Next screenshot">
            ›
          </button>
        </div>

        <div className={styles.carouselDots}>
          {screenshots.map((_, idx) => (
            <button
              key={idx}
              className={clsx(styles.carouselDot, {
                [styles.carouselDotActive]: idx === currentIndex
              })}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to screenshot ${idx + 1}`}
            />
          ))}
        </div>

        <div className={styles.carouselActions}>
          <button 
            className={styles.viewAllBtn}
            onClick={() => setShowAllScreenshots(true)}>
            View All Screenshots ({screenshots.length})
          </button>
        </div>
      </div>

      {lightboxOpen && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button 
            className={styles.lightboxClose}
            onClick={closeLightbox}
            aria-label="Close lightbox">
            ✕
          </button>
          
          <button 
            className={clsx(styles.lightboxArrow, styles.lightboxArrowLeft)}
            onClick={(e) => {
              e.stopPropagation();
              prevLightboxImage();
            }}
            aria-label="Previous image">
            ‹
          </button>

          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <img 
              src={screenshots[lightboxIndex].img}
              alt={screenshots[lightboxIndex].title}
              className={styles.lightboxImage}
            />
            <div className={styles.lightboxCaption}>
              <h3>{screenshots[lightboxIndex].title}</h3>
              <p>{screenshots[lightboxIndex].description}</p>
            </div>
          </div>

          <button 
            className={clsx(styles.lightboxArrow, styles.lightboxArrowRight)}
            onClick={(e) => {
              e.stopPropagation();
              nextLightboxImage();
            }}
            aria-label="Next image">
            ›
          </button>
        </div>
      )}
    </section>
  );
}

function QuickStart(): ReactNode {
  return (
    <section className={styles.quickStart}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Up and Running in 60 Seconds
        </Heading>
        <div className={styles.quickStartGrid}>
          <div className={styles.quickStartStep}>
            <div className={styles.stepNumber}>1</div>
            <h3>Pull & Run</h3>
            <p>
              A single Docker command gets BandMate running with SQLite, ready to use out of the box.
            </p>
          </div>
          <div className={styles.quickStartStep}>
            <div className={styles.stepNumber}>2</div>
            <h3>Login</h3>
            <p>
              Sign in with the default admin account, then create users or enable Google OAuth for your team.
            </p>
          </div>
          <div className={styles.quickStartStep}>
            <div className={styles.stepNumber}>3</div>
            <h3>Create & Collaborate</h3>
            <p>
              Create a project, invite your bandmates, upload tracks, and start collaborating in real-time.
            </p>
          </div>
        </div>
        <div className={styles.quickStartCta}>
          <Link
            className={clsx('button button--lg', styles.heroPrimary)}
            to="/docs/installation">
            Read the Installation Guide
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Your Band's Digital Studio"
      description="BandMate is a self-hosted collaborative music production platform. Organize projects, share audio, leave timestamped feedback, and collaborate in real-time.">
      <HomepageHero />
      <main>
        <HomepageFeatures />
        <Screenshots />
        <QuickStart />
      </main>
    </Layout>
  );
}
