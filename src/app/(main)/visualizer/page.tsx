import { VisualizerClient } from './client';

export default function VisualizerPage() {
  return (
    <div className="container py-8 max-w-screen-2xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-headline font-bold">Color Visualizer</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Bring your vision to life. Select a color to see it in a room.
        </p>
      </div>
      <VisualizerClient />
    </div>
  );
}
