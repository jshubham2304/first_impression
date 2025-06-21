import { getVisualizerColors } from '@/services/visualizer-colors-service';
import { VisualizerClient } from './client';

export default async function VisualizerPage() {
  const colors = await getVisualizerColors();

  return (
    <div className="container py-8 max-w-screen-2xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-headline font-bold">Color Visualizer</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Bring your vision to life. Select a color to see it in a room.
        </p>
      </div>
      <VisualizerClient initialColors={colors} />
    </div>
  );
}
