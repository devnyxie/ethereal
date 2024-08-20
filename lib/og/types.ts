export interface BannerProps {
  size: { width: number; height: number };
}

export interface ArticleBannerProps {
  size: { width: number; height: number };
  title: string;
  summary: string | undefined;
  image: string | undefined;
}
