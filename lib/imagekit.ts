export const IMAGEKIT_CONFIG = {
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/javed',
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || 'public_1D8vHOa/RwIk6EqNU2Y4ycpXXFI=',
};

export function getImageKitUrl(path: string, transformations?: string) {
  if (!path) return '/placeholder.png';
  if (path.startsWith('http')) return path;
  
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const base = IMAGEKIT_CONFIG.urlEndpoint;
  if (transformations) {
    return `${base}/tr:${transformations}${cleanPath}`;
  }
  return `${base}${cleanPath}`;
}
