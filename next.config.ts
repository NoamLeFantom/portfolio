import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['https://NoamLeFantom.github.io/portfolio'], // Autoriser des domaines spécifiques pour les images
  },
};

export default nextConfig;
