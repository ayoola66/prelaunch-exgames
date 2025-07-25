# Excellence Games Pre-launch Website

A pre-launch website for Excellence Games, the UK's first hybrid board-game platform blending culture, chaos & connection.

## Features

- Responsive landing page with video background
- Pre-order functionality
- Secure payment processing with Stripe
- Dynamic content loading
- Google Analytics integration

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd excellence-prelaunch
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:

```bash
PORT=3000
STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
excellence-prelaunch/
├── public/
│   ├── css/
│   ├── js/
│   ├── assets/
│   │   ├── images/
│   │   └── videos/
│   └── favicon.png
├── server.js
├── config.json
├── package.json
└── README.md
```

## Scripts

- `npm start`: Start the production server
- `npm run dev`: Start the development server with hot reload
- `npm run lint`: Run ESLint
- `npm run format`: Format code with Prettier

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is proprietary and confidential. All rights reserved.

## Contact

Excellence Games - [@excellence_games](https://instagram.com/excellence_games)
