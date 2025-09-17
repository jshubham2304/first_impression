
import Image from 'next/image';

const galleryItems = [
  {
    type: 'video',
    src: 'https://res.cloudinary.com/dfydjfauz/video/upload/v1758109969/file00001_qfxbkg.mp4',
    hint: 'living room painting',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1758109963/file00002_fmjajv.jpg',
    hint: 'exterior wall painting',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1758109963/file00003_eq81kf.jpg',
    hint: 'bedroom wall painting',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1758109964/file00004_i9x97j.jpg',
    hint: 'modern interior design',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1758109964/file00006_bqfqkq.jpg',
    hint: 'commercial space painting',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1758109964/file00007_t5j3to.jpg',
    hint: 'kitchen cabinet painting',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1758109965/file00009_extpor.jpg',
    hint: 'detailed wood finishing',
  },
  {
      type: 'video',
      src: 'https://res.cloudinary.com/dfydjfauz/video/upload/v1758115133/file_001_qnvj9g.mp4',
      hint: 'exterior house painting',
    },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1758109962/file00011_ytuhuv.jpg',
    hint: 'textured wall finish',
  },
  {
    type: 'image',
    src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1758109963/file00012_bdlg1f.jpg',
    hint: 'living room accent wall',
  },
    {
      type: 'image',
      src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1758109966/file00013_gcnyfw.jpg',
      hint: 'exterior house painting',
    },
    
    {
      type: 'image',
      src: 'https://res.cloudinary.com/dfydjfauz/image/upload/v1758115129/file_002_c3rs35.jpg',
      hint: 'exterior house painting',
    },
    
];



export default function GalleryPage() {
  return (
    <div className="container py-12 max-w-screen-xl">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-headline font-bold">Our Work</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          A collection of our finest projects, showcasing our commitment to quality and craftsmanship.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {galleryItems.map((item, index) => (
          <div key={index} className="group relative w-full aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            {item.type === 'image' ? (
              <Image
                src={item.src}
                alt={`Gallery image ${index + 1}`}
                data-ai-hint={item.hint}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <video
                src={item.src}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={item.hint}
              >
                Your browser does not support the video tag.
              </video>
            )}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
}
