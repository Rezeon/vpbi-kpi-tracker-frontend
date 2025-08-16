# TailAdmin - Free Tailwind Admin Dashboard Template

TailAdmin is a high-quality, open-source, and **free Tailwind CSS admin template** that is perfect for creating data-rich backends,
powerful web applications and dashboard-admin projects.

![TailAdmin Dashboard Preview](./banner.png)

## Overview

TailAdmin provides essential UI components and layouts for building feature-rich, data-driven admin dashboards and control panels. It's built using:

- HTML
- Alpine.js
- Tailwind CSS
- and Webpack (for bundling)

### Quick Links

- [✨ Visit Website](https://tailadmin.com)
- [📄 Documentation](https://tailadmin.com/docs)
- [⬇️ Download](https://tailadmin.com/download)
- [🖌️ Figma Design File (Community Edition)](https://www.figma.com/community/file/1463141366275764364)
- [⚡ Get PRO Version](https://tailadmin.com/pricing)

### Demos

- [Free Version](https://free-demo.tailadmin.com/)
- [Pro Version](https://demo.tailadmin.com)

### Other Versions

- [Next.js Version](https://github.com/TailAdmin/free-nextjs-admin-dashboard)
- [React.js Version](https://github.com/TailAdmin/free-react-tailwind-admin-dashboard)
- [Vue.js Version](https://github.com/TailAdmin/vue-tailwind-admin-dashboard)

## Installation

### Prerequisites

To get started with TailAdmin, ensure you have the following prerequisites installed and set up:

- Node.js 18.x or later

### Cloning the Repository

Clone the repository using the following command:

```bash
git clone https://github.com/TailAdmin/tailadmin-free-tailwind-dashboard-template.git
```

> Windows Users: place the repository near the root of your drive if you face issues while cloning.

1. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

2. Start the development server:
   ```bash
   npm run start
   # or
   yarn start
   ```

## Components

TailAdmin is a pre-designed starting point for building a web-based dashboard using HTML, Alpine.js and Tailwind CSS. The template includes:

- Sophisticated and accessible sidebar
- Data visualization components
- Prebuilt profile management and 404 page
- Tables and Charts(Line and Bar)
- Authentication forms and input elements
- Alerts, Dropdowns, Modals, Buttons and more
- Can't forget Dark Mode 🕶️

## Feature Comparison

### Free Version

- 1 Unique Dashboard
- 30+ dashboard components
- 50+ UI elements
- Basic Figma design files
- Community support

### Pro Version

- 7 Unique Dashboards: Analytics, Ecommerce, Marketing, CRM, Stocks (more coming soon)
- 500+ dashboard components and UI elements
- Complete Figma design system file
- Email support

To learn more about pro version features and pricing, visit our [pricing page](https://tailadmin.com/pricing).

## Update Logs

### Version 2.0.1 - [February 27, 2025]

#### Update Overview

- Upgraded to Tailwind CSS v4 for better performance and efficiency.
- Updated class usage to match the latest syntax and features.
- Replaced deprecated class and optimized styles.

#### Next Steps

- Run npm install or yarn install to update dependencies.
- Check for any style changes or compatibility issues.
- Refer to the Tailwind CSS v4 [Migration Guide](https://tailwindcss.com/docs/upgrade-guide) on this release. if needed.
- This update keeps the project up to date with the latest Tailwind improvements. 🚀

### Version 2.0.0 - [February 2025]

Major update with comprehensive redesign and new features.

#### Major Improvements

- Complete UI redesign of all pages and components
- Enhanced user interface with new elements
- Improved responsiveness and accessibility
- New features: collapsible sidebar, chat, and calendar
- Updated data visualization components

#### New Features

- Redesigned dashboards (Ecommerce, Analytics, Marketing, CRM)
- Enhanced navigation with improved header and breadcrumbs
- Advanced table components with sorting and filtering
- New UI components (Avatar, Alert, Ribbon)
- Full-featured calendar with drag-and-drop

#### Breaking Changes

- Updated sidebar component API
- New charting library implementation
- Revised authentication system
- **Deprecations:** SimpleTable component and legacy icon set

#### Previous Versions

For detailed changelogs of previous versions (1.0.0 - 1.3.0), visit our [documentation](https://tailadmin.com/docs/update-logs/).

## License

The community edition of TailAdmin is released under the MIT License.

## Support

If you find this project helpful, please consider giving it a star on GitHub. Your support helps us continue developing and maintaining this template.

```
tailadmin-free-tailwind-dashboard-template-main
├─ .browserslistrc
├─ .prettierrc
├─ banner.png
├─ LICENSE
├─ package.json
├─ postcss.config.js
├─ README.md
├─ src
│  ├─ 404.html
│  ├─ alerts.html
│  ├─ avatars.html
│  ├─ badge.html
│  ├─ bar-chart.html
│  ├─ basic-tables.html
│  ├─ blank.html
│  ├─ buttons.html
│  ├─ calendar.html
│  ├─ css
│  │  └─ style.css
│  ├─ form-elements.html
│  ├─ images
│  │  ├─ brand
│  │  │  ├─ brand-01.svg
│  │  │  ├─ brand-02.svg
│  │  │  ├─ brand-03.svg
│  │  │  ├─ brand-04.svg
│  │  │  ├─ brand-05.svg
│  │  │  ├─ brand-06.svg
│  │  │  ├─ brand-07.svg
│  │  │  ├─ brand-08.svg
│  │  │  ├─ brand-09.svg
│  │  │  ├─ brand-10.svg
│  │  │  ├─ brand-11.svg
│  │  │  ├─ brand-12.svg
│  │  │  ├─ brand-13.svg
│  │  │  ├─ brand-14.svg
│  │  │  └─ brand-15.svg
│  │  ├─ country
│  │  │  ├─ country-01.svg
│  │  │  ├─ country-02.svg
│  │  │  ├─ country-03.svg
│  │  │  ├─ country-04.svg
│  │  │  ├─ country-05.svg
│  │  │  ├─ country-06.svg
│  │  │  ├─ country-07.svg
│  │  │  └─ country-08.svg
│  │  ├─ error
│  │  │  ├─ 404-dark.svg
│  │  │  └─ 404.svg
│  │  ├─ favicon.ico
│  │  ├─ grid-image
│  │  │  ├─ image-01.png
│  │  │  ├─ image-02.png
│  │  │  ├─ image-03.png
│  │  │  ├─ image-04.png
│  │  │  ├─ image-05.png
│  │  │  └─ image-06.png
│  │  ├─ icons
│  │  │  ├─ file-image-dark.svg
│  │  │  ├─ file-image.svg
│  │  │  ├─ file-pdf-dark.svg
│  │  │  ├─ file-pdf.svg
│  │  │  ├─ file-video-dark.svg
│  │  │  └─ file-video.svg
│  │  ├─ logo
│  │  │  ├─ auth-logo.svg
│  │  │  ├─ logo-dark.svg
│  │  │  ├─ logo-icon.svg
│  │  │  └─ logo.svg
│  │  ├─ product
│  │  │  ├─ product-01.jpg
│  │  │  ├─ product-02.jpg
│  │  │  ├─ product-03.jpg
│  │  │  ├─ product-04.jpg
│  │  │  └─ product-05.jpg
│  │  ├─ shape
│  │  │  └─ grid-01.svg
│  │  ├─ user
│  │  │  ├─ owner.jpg
│  │  │  ├─ user-01.jpg
│  │  │  ├─ user-02.jpg
│  │  │  ├─ user-03.jpg
│  │  │  ├─ user-04.jpg
│  │  │  ├─ user-05.jpg
│  │  │  ├─ user-06.jpg
│  │  │  ├─ user-07.jpg
│  │  │  ├─ user-08.jpg
│  │  │  ├─ user-09.jpg
│  │  │  ├─ user-10.jpg
│  │  │  ├─ user-11.jpg
│  │  │  ├─ user-12.jpg
│  │  │  ├─ user-13.jpg
│  │  │  ├─ user-14.jpg
│  │  │  ├─ user-15.jpg
│  │  │  ├─ user-16.jpg
│  │  │  ├─ user-17.jpg
│  │  │  ├─ user-18.jpg
│  │  │  ├─ user-19.jpg
│  │  │  ├─ user-20.jpg
│  │  │  ├─ user-21.jpg
│  │  │  ├─ user-22.jpg
│  │  │  ├─ user-23.jpg
│  │  │  ├─ user-24.jpg
│  │  │  ├─ user-25.jpg
│  │  │  ├─ user-26.jpg
│  │  │  ├─ user-27.jpg
│  │  │  ├─ user-28.jpg
│  │  │  ├─ user-29.jpg
│  │  │  ├─ user-30.jpg
│  │  │  ├─ user-31.jpg
│  │  │  ├─ user-32.jpg
│  │  │  ├─ user-33.jpg
│  │  │  ├─ user-34.jpg
│  │  │  ├─ user-35.jpg
│  │  │  ├─ user-36.jpg
│  │  │  └─ user-37.jpg
│  │  └─ video-thumb
│  │     ├─ thumb-16.png
│  │     └─ youtube-icon-84.svg
│  ├─ images.html
│  ├─ index.html
│  ├─ js
│  │  ├─ components
│  │  │  ├─ calendar-init.js
│  │  │  ├─ charts
│  │  │  │  ├─ chart-01.js
│  │  │  │  ├─ chart-02.js
│  │  │  │  └─ chart-03.js
│  │  │  ├─ image-resize.js
│  │  │  └─ map-01.js
│  │  └─ index.js
│  ├─ line-chart.html
│  ├─ partials
│  │  ├─ alert
│  │  │  ├─ alert-error.html
│  │  │  ├─ alert-info.html
│  │  │  ├─ alert-success.html
│  │  │  └─ alert-warning.html
│  │  ├─ avatar
│  │  │  ├─ avatar-01.html
│  │  │  ├─ avatar-02.html
│  │  │  ├─ avatar-03.html
│  │  │  └─ avatar-04.html
│  │  ├─ badge
│  │  │  ├─ badge-01.html
│  │  │  ├─ badge-02.html
│  │  │  ├─ badge-03.html
│  │  │  ├─ badge-04.html
│  │  │  ├─ badge-05.html
│  │  │  └─ badge-06.html
│  │  ├─ breadcrumb.html
│  │  ├─ buttons
│  │  │  ├─ button-01.html
│  │  │  ├─ button-02.html
│  │  │  ├─ button-03.html
│  │  │  ├─ button-04.html
│  │  │  ├─ button-05.html
│  │  │  └─ button-06.html
│  │  ├─ calendar-event-modal.html
│  │  ├─ chart
│  │  │  ├─ chart-01.html
│  │  │  ├─ chart-02.html
│  │  │  └─ chart-03.html
│  │  ├─ common-grid-shape.html
│  │  ├─ common-social-links.html
│  │  ├─ datepicker.html
│  │  ├─ grid-image
│  │  │  ├─ image-01.html
│  │  │  ├─ image-02.html
│  │  │  └─ image-03.html
│  │  ├─ header.html
│  │  ├─ map-01.html
│  │  ├─ media-card.html
│  │  ├─ metric-group
│  │  │  └─ metric-group-01.html
│  │  ├─ overlay.html
│  │  ├─ preloader.html
│  │  ├─ profile
│  │  │  ├─ profile-address-modal.html
│  │  │  └─ profile-info-modal.html
│  │  ├─ sidebar.html
│  │  ├─ table
│  │  │  ├─ table-01.html
│  │  │  └─ table-06.html
│  │  ├─ top-card-group.html
│  │  ├─ upcoming-schedule.html
│  │  ├─ video
│  │  │  ├─ video-01.html
│  │  │  ├─ video-02.html
│  │  │  ├─ video-03.html
│  │  │  └─ video-04.html
│  │  └─ watchlist.html
│  ├─ profile.html
│  ├─ sidebar.html
│  ├─ signin.html
│  ├─ signup.html
│  └─ videos.html
└─ webpack.config.js

```