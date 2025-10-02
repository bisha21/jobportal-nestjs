/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'randomuser.me',
      'example.com',
      'res.cloudinary.com',
      'www.google.com',
    ],
  },
};

module.exports = nextConfig;
