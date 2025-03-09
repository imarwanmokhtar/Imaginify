interface Window {
  gtag: (
    command: 'config' | 'event' | 'js',
    targetId: string,
    config?: {
      page_path?: string;
      send_page_view?: boolean;
      event_category?: string;
      event_label?: string;
      value?: number;
    }
  ) => void;
  dataLayer: unknown[];
} 