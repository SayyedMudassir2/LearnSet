export async function POST() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const chunks = [
        'Understood. ',
        'This response ',
        'is streamed ',
        'like ChatGPT.\n\n',
        '### Explanation\n',
        'Fast. Smooth. Modern.',
      ];

      for (const chunk of chunks) {
        controller.enqueue(encoder.encode(chunk));
        await new Promise(r => setTimeout(r, 0));
      }

      controller.close();
    },
  });

  return new Response(stream);
}
