# Yukon Club Website - Architectuur Overzicht

## Project Informatie
- **Type**: React Single Page Application (SPA)
- **Build Tool**: Create React App (CRA) met CRACO voor configuratie
- **Styling**: Tailwind CSS (v2.2.17 via PostCSS7 compat) + Custom CSS
- **Routing**: React Router DOM v7.5.0
- **Deployment**: GitHub Pages (met basename `/yukon-club-website`)
- **React Version**: 18.2.0

## Project Structuur

```
yukon-club-website/
├── public/
│   ├── images/          # Statische afbeeldingen (Summum_Single.jpg, yc_2021.jpg)
│   ├── index.html
│   └── 404.html
├── src/
│   ├── components/      # ❌ NIET GESTRUCTUREERD - alle componenten in root
│   ├── pages/           # ❌ NIET GESTRUCTUREERD - alle pagina's in root
│   ├── styles/          # ❌ NIET GESTRUCTUREERD - CSS bestanden verspreid
│   ├── assets/         # Bevat alleen react.svg
│   ├── fonts/          # Custom fonts (Larsseit Light & Medium)
│   ├── images/         # Duplicaat van public/images/
│   │
│   ├── App.jsx          # Hoofdcomponent met routing
│   ├── App.css          # 176 regels - mix van oude en nieuwe CSS
│   ├── index.js         # Entry point (zonder StrictMode)
│   ├── index.css        # Tailwind imports + global styles
│   ├── fonts.css        # @font-face definities
│   │
│   ├── Navbar.jsx       # Navigatie component (92 regels)
│   ├── Footer.jsx       # Footer component
│   ├── SocialMediaIcons.jsx  # Herbruikbare social icons
│   │
│   ├── Home.jsx         # Homepage met responsive image blocks
│   ├── Imageblock.jsx   # Desktop parallax image
│   ├── ImageblockMobile.jsx  # Mobile parallax image
│   ├── Newsletter.jsx   # Newsletter subscription form (SendGrid API)
│   │
│   ├── Music.jsx        # Music pagina met Spotify embed
│   ├── Videos.jsx       # Videos pagina met YouTube embeds
│   ├── Tour.jsx         # Tour pagina met parallax image
│   ├── Tourblock.jsx    # ❌ ONGEBRUIKT component
│   ├── Contact.jsx      # Contact pagina
│   ├── Cookies.jsx      # Cookie policy pagina
│   ├── Privacy.jsx      # Privacy policy pagina
│   │
│   ├── Newsletter.css   # ❌ NIET GEÏMPORTEERD
│   └── Footer.css       # ❌ NIET GEÏMPORTEERD
```

## Component Architectuur

### App Component (`App.jsx`)
- **Rol**: Root component met routing configuratie
- **Features**:
  - React Router setup met conditionele basename voor GitHub Pages
  - Layout wrapper met flexbox (Navbar + Content + Footer)
  - 7 routes gedefinieerd
- **Issues**:
  - Geen error boundaries
  - Geen loading states
  - Hardcoded basename logica

### Layout Components

#### Navbar (`Navbar.jsx`)
- **Rol**: Hoofdnavigatie met responsive menu
- **State**: `isOpen` voor mobile menu toggle
- **Features**:
  - Fixed positioning
  - Desktop: horizontaal menu met logo links, menu rechts, social icons rechts
  - Mobile: hamburger menu met dropdown
  - Integreert SocialMediaIcons component
- **Styling**: Tailwind CSS (geen App.css import meer)
- **Issues**:
  - Menu items hardcoded in component
  - Geen active state voor huidige route
  - Geen keyboard navigation support

#### Footer (`Footer.jsx`)
- **Rol**: Site footer met copyright en policy links
- **Styling**: Tailwind CSS
- **Issues**: Geen Footer.css gebruikt (bestand bestaat wel)

#### SocialMediaIcons (`SocialMediaIcons.jsx`)
- **Rol**: Herbruikbare social media iconen
- **Dependencies**: FontAwesome (@fortawesome/react-fontawesome)
- **Data**: Hardcoded array met 6 social links
- **Styling**: Tailwind CSS
- **Issues**:
  - Data niet externalized
  - Geen prop support voor customization

### Page Components

#### Home (`Home.jsx`)
- **Rol**: Homepage
- **State**: `isMobile` voor responsive image block switching
- **Features**:
  - Conditionele rendering: Imageblock (desktop) vs ImageblockMobile (mobile)
  - Newsletter component
  - Window resize listener voor responsive switching
- **Issues**:
  - ❌ **CRITICAL**: Manual window resize listener (kan beter met CSS media queries)
  - Duplicate image components voor mobile/desktop
  - Geen lazy loading voor images

#### Imageblock (`Imageblock.jsx` & `ImageblockMobile.jsx`)
- **Rol**: Parallax image display
- **Dependencies**: react-parallax v3.5.2
- **Issues**:
  - ❌ **DUPLICATE CODE**: Twee bijna identieke componenten
  - Hardcoded image import
  - Hardcoded height values
  - Imageblock importeert App.css (niet nodig)

#### Music (`Music.jsx`)
- **Rol**: Spotify artist embed pagina
- **Features**: Spotify iframe embed
- **Styling**: Mix van Tailwind en App.css classes
- **Issues**: Hardcoded Spotify artist ID

#### Videos (`Videos.jsx`)
- **Rol**: YouTube video gallery
- **Data**: Hardcoded array met 3 video IDs
- **Features**: Dynamische iframe rendering
- **Styling**: App.css classes (video-responsive, videos-container)
- **Issues**:
  - Video data niet externalized
  - Geen error handling voor failed embeds
  - Geen loading states

#### Tour (`Tour.jsx`)
- **Rol**: Tour dates pagina
- **Features**: Parallax background image
- **Issues**: "No current tour dates" hardcoded, geen dynamische data

#### Contact (`Contact.jsx`)
- **Rol**: Contact informatie pagina
- **Content**: Hardcoded email link
- **Issues**: Geen contact formulier, alleen email link

#### Cookies & Privacy (`Cookies.jsx`, `Privacy.jsx`)
- **Rol**: Legal pages
- **Content**: Placeholder text ("overview of cookies", "privacy policy overview here")
- **Issues**: ❌ **INCOMPLETE**: Geen echte content

### Feature Components

#### Newsletter (`Newsletter.jsx`)
- **Rol**: Email subscription form
- **State**: `email`, `status`, `result`
- **API**: SendGrid API v3 (direct client-side call)
- **Features**:
  - Email validation
  - Loading/success/error states
  - Form submission handling
- **Issues**:
  - ❌ **SECURITY**: API key in environment variable (REACT_APP_SENDGRID_API_KEY) - exposed in client bundle
  - Direct API call vanuit frontend (zou via backend moeten)
  - Newsletter.css bestaat maar wordt niet geïmporteerd
  - Geen rate limiting
  - Geen GDPR compliance checks

## Styling Architectuur

### Tailwind CSS Setup
- **Config**: `tailwind.config.js` met custom fonts
- **Entry**: `index.css` met @tailwind directives
- **Build**: CRACO + PostCSS7 compat
- **Custom Classes**: Gedefinieerd in `index.css` @layer components
  - `.main-container`
  - `.content-section`
  - `.nav-link`
  - `.social-icons` (niet gebruikt)
  - `.social-icon` (niet gebruikt)

### CSS Bestanden
1. **index.css** (83 regels)
   - Tailwind imports
   - Global base styles
   - Component layer definitions
   - Root CSS variables

2. **App.css** (176 regels)
   - ❌ **LEGACY CODE**: Oude nav classes verwijderd maar nog veel legacy CSS
   - Component-specifieke styles (spotify-embed, video-responsive, parallax-tour)
   - Media queries voor responsive design
   - Mix van Tailwind @apply en custom CSS

3. **fonts.css** (13 regels)
   - @font-face definities voor Larsseit fonts

4. **Newsletter.css** (48 regels)
   - ❌ **NIET GEÏMPORTEERD**: Bestand bestaat maar wordt niet gebruikt

5. **Footer.css** (32 regels)
   - ❌ **NIET GEÏMPORTEERD**: Bestand bestaat maar wordt niet gebruikt

### Styling Issues
- ❌ **INCONSISTENT**: Mix van Tailwind utility classes en custom CSS
- ❌ **DUPLICATE**: Images in zowel `src/images/` als `public/images/`
- ❌ **UNUSED**: Newsletter.css en Footer.css niet geïmporteerd
- ❌ **LEGACY**: App.css bevat nog oude CSS patterns
- Geen CSS modules of styled-components
- Geen design system / design tokens

## State Management
- **Pattern**: Local component state met useState hooks
- **No Global State**: Geen Redux, Context API, of andere state management
- **State Locations**:
  - Navbar: `isOpen` (menu toggle)
  - Home: `isMobile` (responsive detection)
  - Newsletter: `email`, `status`, `result` (form state)

### State Management Issues
- ❌ **ANTI-PATTERN**: Home component gebruikt window resize listener i.p.v. CSS
- Geen shared state tussen componenten
- Geen state persistence
- Geen error state management

## Routing
- **Library**: React Router DOM v7.5.0
- **Pattern**: Declarative routing in App.jsx
- **Routes**:
  - `/` → Home
  - `/music` → Music
  - `/videos` → Videos
  - `/tour` → Tour
  - `/contact` → Contact
  - `/cookie-policy` → Cookies
  - `/privacy-policy` → Privacy

### Routing Issues
- Geen route guards
- Geen 404 handling (wel 404.html in public maar niet geïntegreerd)
- Geen lazy loading voor routes
- Geen route-based code splitting
- Basename logica in component (zou in config kunnen)

## Dependencies

### Production Dependencies
- **react** ^18.2.0
- **react-dom** ^18.2.0
- **react-router-dom** ^7.5.0
- **react-parallax** ^3.5.2
- **react-icons** ^5.5.0
- **@fortawesome/react-fontawesome** ^0.2.2
- **@fortawesome/free-brands-svg-icons** ^6.7.2
- **axios** ^1.8.4 (alleen voor Newsletter)
- **web-vitals** ^2.1.4

### Development Dependencies
- **@craco/craco** ^7.1.0
- **tailwindcss** (PostCSS7 compat) ^2.2.17
- **autoprefixer** ^9.8.8
- **postcss** ^7.0.39
- **gh-pages** ^6.3.0

### Dependency Issues
- ❌ **OUTDATED**: Tailwind PostCSS7 compat (oude versie)
- ❌ **SECURITY**: Axios alleen voor één API call (overkill)
- Geen TypeScript
- Geen testing libraries gebruikt (wel geïnstalleerd)
- Geen linting configuratie (alleen CRA defaults)

## Data Management
- **Pattern**: Hardcoded data in components
- **No API Layer**: Direct API calls in components (Newsletter)
- **No Data Fetching Library**: Geen React Query, SWR, etc.

### Data Locations
- Video IDs: Hardcoded in Videos.jsx
- Social Links: Hardcoded in SocialMediaIcons.jsx
- Menu Items: Hardcoded in Navbar.jsx
- Email: Hardcoded in Contact.jsx

### Data Management Issues
- ❌ **NO SEPARATION**: Data mixed met component logic
- Geen data fetching patterns
- Geen caching
- Geen error handling voor data
- Geen loading states

## Performance Considerations
- ❌ **NO CODE SPLITTING**: Alle code in één bundle
- ❌ **NO LAZY LOADING**: Alle routes direct geladen
- ❌ **NO IMAGE OPTIMIZATION**: Geen lazy loading, geen WebP, geen sizes
- ❌ **NO MEMOIZATION**: Geen React.memo, useMemo, useCallback
- ❌ **DUPLICATE IMAGES**: Images in src/ en public/
- Geen service worker (PWA features niet gebruikt)
- reportWebVitals geïnstalleerd maar niet geconfigureerd

## Security Issues
- ❌ **CRITICAL**: SendGrid API key in REACT_APP_* (exposed in client bundle)
- Geen input sanitization
- Geen CSRF protection
- Geen rate limiting
- Direct API calls vanuit frontend

## Accessibility Issues
- Geen ARIA labels op alle interactieve elementen
- Geen skip links
- Geen focus management
- Geen keyboard navigation support
- Geen screen reader testing
- Color contrast mogelijk issues (niet gecontroleerd)

## Testing
- **Libraries Installed**: @testing-library/react, @testing-library/jest-dom
- **Status**: ❌ **NO TESTS**: Geen test bestanden gevonden
- **Coverage**: 0%

## Build & Deployment
- **Build Tool**: CRACO + Create React App
- **Deployment**: GitHub Pages via gh-pages
- **Build Script**: `npm run build` → `gh-pages -d build`
- **Basename**: Conditioneel voor production (`/yukon-club-website`)

## Code Quality Issues

### Structure
- ❌ Geen folder structuur (alles in src/ root)
- ❌ Geen component organization
- ❌ Geen separation of concerns
- ❌ Duplicate components (Imageblock vs ImageblockMobile)

### Code Patterns
- ❌ Inconsistent import styles
- ❌ Mix van function declarations en arrow functions
- ❌ Geen prop-types of TypeScript
- ❌ Geen error boundaries
- ❌ Geen loading states
- ❌ Hardcoded values everywhere

### Best Practices
- ❌ Geen environment configuratie
- ❌ Geen constants file
- ❌ Geen utilities folder
- ❌ Geen hooks folder
- ❌ Geen types/interfaces

## Refactoring Prioriteiten

### 🔴 Critical (Security & Performance)
1. **SendGrid API**: Verplaats naar backend API
2. **Code Splitting**: Implementeer lazy loading voor routes
3. **Image Optimization**: Lazy loading, WebP, responsive images
4. **Remove Duplicates**: Imageblock components, image files

### 🟠 High Priority (Architecture)
1. **Folder Structure**: Organiseer in components/, pages/, hooks/, utils/, constants/
2. **State Management**: Overweeg Context API voor shared state
3. **Data Layer**: Externalize hardcoded data naar config/constants
4. **Component Refactoring**: 
   - Merge Imageblock en ImageblockMobile
   - Extract reusable components
   - Add prop-types of TypeScript

### 🟡 Medium Priority (Code Quality)
1. **Styling Consistency**: Kies één approach (Tailwind OF CSS modules)
2. **Remove Unused Files**: Newsletter.css, Footer.css, Tourblock.jsx
3. **Error Handling**: Add error boundaries en error states
4. **Loading States**: Add loading indicators
5. **Accessibility**: Add ARIA labels, keyboard navigation

### 🟢 Low Priority (Nice to Have)
1. **TypeScript Migration**: Type safety
2. **Testing**: Unit tests voor components
3. **Documentation**: Component docs, README updates
4. **Performance Monitoring**: Configureer reportWebVitals
5. **SEO**: Meta tags, structured data

## Aanbevolen Refactoring Structuur

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Navbar.test.jsx
│   │   │   └── index.js
│   │   ├── Footer/
│   │   └── Layout.jsx
│   ├── common/
│   │   ├── SocialMediaIcons/
│   │   ├── ImageBlock/  (merged desktop/mobile)
│   │   └── Newsletter/
│   └── ui/  (buttons, inputs, etc.)
├── pages/
│   ├── Home/
│   ├── Music/
│   ├── Videos/
│   ├── Tour/
│   ├── Contact/
│   ├── Cookies/
│   └── Privacy/
├── hooks/
│   ├── useResponsive.js
│   └── useNewsletter.js
├── utils/
│   ├── api.js
│   └── constants.js
├── config/
│   ├── routes.js
│   └── socialLinks.js
├── styles/
│   ├── globals.css
│   └── components.css
└── App.jsx
```

## Conclusie

De website is functioneel maar heeft significante architectuur- en codekwaliteitsproblemen. De belangrijkste issues zijn:
- Geen folder structuur
- Security issues (exposed API keys)
- Performance issues (geen code splitting, lazy loading)
- Code duplication
- Inconsistente styling approach
- Geen testing
- Hardcoded data everywhere

Een grondige refactoring zou de maintainability, performance, en security aanzienlijk verbeteren.

