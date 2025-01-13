export const extractYouTubeURL = (input: string): string | null => {
  const youtubeRegex =
    /(https?:\/\/(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/|e\/|.*\/videoseries\?v=)([a-zA-Z0-9_-]{11}))/i;
  const match = input.match(youtubeRegex);
  return match ? match[0] : null;
};
