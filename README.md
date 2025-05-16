# ShopEasy E-commerce Mobile App

A cross-platform e-commerce application built with React Native and Expo that works seamlessly on Web, iOS, and Android.

## Features

### User Features
- Browse products with advanced filtering options
- User authentication and profile management
- Profile image upload (works on all platforms)
- Shopping cart with full functionality
- Secure checkout process with payment integration
- Order history and tracking

### Admin Features
- Restricted access to admin panel (only for authorized emails)
- Dashboard with real-time analytics
  - Sales performance
  - User connection metrics
  - Profit visualization
- Product management
  - Add, edit, and delete products
  - Upload product images
  - Set prices and descriptions
- Real-time updates to product catalog

## Technology Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router
- **State Management**: React Context API
- **UI Components**: Custom React Native components
- **Storage**: Local storage with mock data (can be connected to a real backend)
- **Authentication**: Email-based authentication with role management

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository
```bash
git clone https://github.com/Dream-kid-342/ShopEasy.git
cd shopeasy
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open the app
- **Web**: Open browser at http://localhost:19006
- **iOS/Android**: Scan the QR code with the Expo Go app

## Admin Access

Admin panel access is restricted to the following emails:
- admin@shopeasy.com
- manager@shopeasy.com
- support@shopeasy.com

Use these emails with any password for testing purposes.

## App Structure

- `app/` - Contains all routes and screens
- `components/` - Reusable UI components
- `contexts/` - React contexts for state management
- `data/` - Mock data for products, users, etc.
- `hooks/` - Custom React hooks
- `services/` - API and service functions
- `utils/` - Utility functions

## Customization

### Changing Admin Emails
To change the authorized admin emails, update the `ADMIN_EMAILS` array in `utils/auth.jsx`.

### Adding Custom Products
For development purposes, you can add more products by updating the `products.jsx` file in the `data/` directory.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
