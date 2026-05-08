import { pipeline, env } from '@xenova/transformers';

env.allowLocalModels = false;

class PipelineSingleton {
    static task = 'token-classification';
    static model = 'Xenova/bert-base-NER';
    static instance = null;

    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            this.instance = pipeline(this.task, this.model, { progress_callback });
        }
        return this.instance;
    }
}

self.addEventListener('message', async (event) => {
    let classifier = await PipelineSingleton.getInstance(x => self.postMessage(x));
    let output = await classifier(event.data.text, { aggregation_strategy: 'simple' });
    self.postMessage({ status: 'complete', output: output, text: event.data.text });
});
