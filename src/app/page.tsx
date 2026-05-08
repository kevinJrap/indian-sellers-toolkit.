import VolumetricOptimizer from "@/components/VolumetricOptimizer";
import PrivateOrderParser from "@/components/PrivateOrderParser";

export default function Home() {
  return (
    <div className="space-y-8">
      <section>
        <VolumetricOptimizer />
      </section>
      <section>
        <PrivateOrderParser />
      </section>
    </div>
  );
}
