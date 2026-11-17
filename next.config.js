// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com', // blog thumbnails only; project images live in public/assets
        pathname: '/**',
      },
    ],
  },
};
