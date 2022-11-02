export class JokesDto {
  category?: string;
  joke?:string;
  color?: string;
  delivery?: string;
  error?: boolean;
  flags?: {
    nsfw?: boolean;
    religious?: boolean;
    political?: boolean;
    racist?: boolean;
    sexist?: boolean;
  };
  id?: number;
  setup?: string;
  type?: string;
}
