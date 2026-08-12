import { NextResponse } from 'next/server';
import ImageKit from 'imagekit';

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || 'public_1D8vHOa/RwIk6EqNU2Y4ycpXXFI=',
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || 'private_rRiY6v5OyaSgONyBTeh+a8zYu7k=',
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/javed',
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload buffer to ImageKit
    const result = await imagekit.upload({
      file: buffer,
      fileName: `javed_shop_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`,
      folder: '/javed_shop_uploads',
    });

    return NextResponse.json({
      success: true,
      url: result.url,
      fileId: result.fileId,
      name: result.name,
    });
  } catch (error: any) {
    console.error('ImageKit upload error:', error);

    // Fallback: If network issue with ImageKit API, return base64 preview URL
    try {
      const formData = await request.formData();
      const file = formData.get('file') as File;
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;
      return NextResponse.json({
        success: true,
        url: base64,
      });
    } catch (e) {
      return NextResponse.json(
        { error: error?.message || 'Failed to upload image' },
        { status: 500 }
      );
    }
  }
}
