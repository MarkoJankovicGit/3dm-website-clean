import https from 'https';
import fs from 'fs';
import path from 'path';

const url = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wO4RWhUl4qALZ4CUNSZOM_JT51REFy-jnFzdKICITifkt6TMxLs2p7B8nRN6m.png';
const dest = path.join(process.cwd(), 'public/img/marquee/marquee-kotlin-01.png');

// Ensure directory exists
const dir = path.dirname(dest);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

https.get(url, (response) => {
  const fileStream = fs.createWriteStream(dest);
  response.pipe(fileStream);
  fileStream.on('finish', () => {
    fileStream.close();
    console.log('Image saved successfully to', dest);
  });
}).on('error', (err) => {
  fs.unlink(dest, () => {});
  console.error('Error downloading image:', err);
});
