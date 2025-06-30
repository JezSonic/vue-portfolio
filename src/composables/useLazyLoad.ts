import { onMounted, onUnmounted, ref } from 'vue';

interface LazyLoadOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export function useLazyLoad(
  elementRef: ref<HTMLImageElement | HTMLPictureElement | null>,
  options?: LazyLoadOptions
) {
  const isLoaded = ref(false);
  let observer: IntersectionObserver | null = null;

  const loadImage = () => {
    const element = elementRef.value;
    if (!element) return;

    if (element.tagName === 'IMG') {
      const imgElement = element as HTMLImageElement;
      if (imgElement.dataset.src) {
        imgElement.src = imgElement.dataset.src;
      }
      if (imgElement.dataset.srcset) {
        imgElement.srcset = imgElement.dataset.srcset;
      }
    } else if (element.tagName === 'PICTURE') {
      const pictureElement = element as HTMLPictureElement;
      const sources = Array.from(pictureElement.querySelectorAll<HTMLSourceElement>('source[data-srcset]'));
      const img = pictureElement.querySelector<HTMLImageElement>('img');

      sources.forEach(source => {
        if (source.dataset.srcset) {
          source.srcset = source.dataset.srcset;
        }
      });

      if (img && img.dataset.src) {
        img.src = img.dataset.src;
      }
      // If the img also has a data-srcset (e.g. for non-picture supporting browsers, though less common with picture as fallback)
      if (img && img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
      }
    }

    isLoaded.value = true;
  };

  onMounted(() => {
    if (!elementRef.value) {
      return;
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadImage();
          // Once the image is processed, we don't need to observe it anymore
          if (observer && elementRef.value) {
            observer.unobserve(elementRef.value);
            observer = null; // Clean up observer
          }
        }
      },
      {
        root: options?.root === undefined ? null : options.root,
        rootMargin: options?.rootMargin || '0px 0px 200px 0px',
        threshold: options?.threshold || 0.01,
        ...options,
      }
    );

    observer.observe(elementRef.value);
  });

  onUnmounted(() => {
    if (observer && elementRef.value) {
      observer.unobserve(elementRef.value);
    }
    observer = null;
  });

  return {
    isLoaded, // Renamed from isIntersecting to better reflect its purpose
  };
}
